import 'package:flutter/material.dart';
import 'package:learningtrail/app/tabs/learningPage.dart';
import 'package:learningtrail/app/tabs/StorePage.dart';
import 'package:learningtrail/app/tabs/settingPage.dart';
import 'package:learningtrail/components/themed_button.dart';
import 'package:lottie/lottie.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final pages = [
      const LearningPage(),
      const StorePage(),
      const SettingsPage(),
    ];
    return Scaffold(
      body: pages[_selectedIndex],
      bottomNavigationBar: LottieBottomNavBar(
        onTabSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        selectedIndex: _selectedIndex,
      ),
    );
  }
}

class LottieBottomNavBar extends StatefulWidget {
  final Function(int) onTabSelected;
  final int selectedIndex;

  const LottieBottomNavBar({
    super.key,
    required this.onTabSelected,
    required this.selectedIndex,
  });

  @override
  State<LottieBottomNavBar> createState() => _LottieBottomNavBarState();
}

class _LottieBottomNavBarState extends State<LottieBottomNavBar>
    with TickerProviderStateMixin {
  final List<String> lottieFiles = [
    'assets/anim/exercise.json',
    'assets/anim/store.json',
    'assets/anim/settings.json',
  ];

  late List<AnimationController> _controllers;

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(
      lottieFiles.length,
      (index) => AnimationController(vsync: this),
    );
  }

  @override
  void dispose() {
    for (var controller in _controllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: List.generate(lottieFiles.length, (index) {
          return ThemedButton(
            width: 80,
            height: 80,
            backgroundColor: (index == widget.selectedIndex)
                ? Theme.of(context).colorScheme.secondaryContainer.withAlpha(50)
                : null,
            borderColor: (index == widget.selectedIndex)
                ? Theme.of(
                    context,
                  ).colorScheme.secondaryContainer.withAlpha(200)
                : null,
            type: ThemedButtonType.blank,
            reversed: true,
            onPressed: () {
              _controllers[index]
                ..reset()
                ..forward();
              widget.onTabSelected(index);
            },
            child: Lottie.asset(
              lottieFiles[index],
              controller: _controllers[index],
              repeat: false,
              onLoaded: (composition) {
                _controllers[index].duration = composition.duration;
                if (index == widget.selectedIndex) {
                  _controllers[index].forward();
                }
              },
            ),
          );
        }),
      ),
    );
  }
}
