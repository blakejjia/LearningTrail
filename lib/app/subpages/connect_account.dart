import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:learningtrail/app/bloc/system_cubit.dart';
import 'package:learningtrail/components/themed_button.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:learningtrail/components/themed_textinput.dart';
import 'package:fluttertoast/fluttertoast.dart';

class ConnectAccountPage extends StatelessWidget {
  ConnectAccountPage({super.key});

  final TextEditingController accountIdController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            spacing: 16,
            children: [
              // information
              Column(
                children: [
                  ThemedText(
                    text: 'Connect Account',
                    type: ThemedTextType.primary,
                    fontSize: 24,
                  ),
                  Divider(
                    color: Theme.of(
                      context,
                    ).colorScheme.onTertiaryContainer.withAlpha(50),
                    thickness: 2,
                  ),
                  ThemedText(
                    text:
                        'Connect your account to record your progress and earn rewards',
                    type: ThemedTextType.primary,
                    fontSize: 16,
                  ),
                  ThemedText(
                    text: 'Ask for account ID from your parent/ teacher',
                    type: ThemedTextType.secondary,
                    fontSize: 16,
                  ),
                ],
              ),

              // text input
              ThemedTextInput(
                hint: 'Account ID',
                controller: accountIdController,
              ),
              // submit button
              ThemedButton(
                onPressed: () {
                  if (accountIdController.text.isNotEmpty) {
                    context.read<SystemCubit>().connectAccount(
                      accountIdController.text,
                    );
                  } else {
                    Fluttertoast.showToast(msg: 'Please enter an account ID');
                  }
                },
                title: 'Connect',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
