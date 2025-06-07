import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:learningtrail/app/bloc/system_cubit.dart';
import 'package:learningtrail/app/subpages/connect_account.dart';
import 'package:learningtrail/components/themed_button.dart';
import 'package:learningtrail/components/themed_text.dart';

class LearningPage extends StatefulWidget {
  const LearningPage({super.key});

  @override
  State<LearningPage> createState() => _LearningPageState();
}

class _LearningPageState extends State<LearningPage> {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SystemCubit, SystemState>(
      builder: (context, state) {
        if (state is SystemAccountConnected) {
          return Scaffold(body: Column(children: [Text('Learning Page')]));
        } else {
          return const _NotLoggedIn();
        }
      },
    );
  }
}

class _NotLoggedIn extends StatelessWidget {
  const _NotLoggedIn({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ThemedText(
              text: "Connect to Account",
              type: ThemedTextType.primary,
              fontSize: 24,
              textAlign: TextAlign.center,
            ),
            ThemedText(
              text: "Connect to your student account to start earning points!",
              type: ThemedTextType.secondary,
              fontSize: 16,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            ThemedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ConnectAccountPage()),
                );
              },
              title: "Connect",
              type: ThemedButtonType.secondary,
              reversed: true,
            ),
          ],
        ),
      ),
    );
  }
}
