import 'package:flutter/material.dart';
import 'package:learningtrail/components/themed_button.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:learningtrail/app/bloc/system_cubit.dart';
import 'package:learningtrail/app/tabs/components/currency_bar.dart';
import 'package:learningtrail/app/tabs/components/prize_tile.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:learningtrail/app/subpages/connect_account.dart';

class StorePage extends StatefulWidget {
  const StorePage({super.key});

  @override
  State<StorePage> createState() => _StorePageState();
}

class _StorePageState extends State<StorePage> {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SystemCubit, SystemState>(
      builder: (context, state) {
        if (state is SystemAccountConnected) {
          return Scaffold(
            appBar: AppBar(
              title: CurrencyBar(currency: state.accountData.currencies),
            ),
            body: SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: ListView(
                  children: [
                    ...state.accountData.prizes.map(
                      (prize) => PrizeTile(prize: prize),
                    ),
                  ],
                ),
              ),
            ),
          );
        } else {
          return const _NotLoggedIn();
        }
      },
    );
  }
}

class _NotLoggedIn extends StatelessWidget {
  const _NotLoggedIn();

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
              text: "Connect to your student account to redeem!",
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
