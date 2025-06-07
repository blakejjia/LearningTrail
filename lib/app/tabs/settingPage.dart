import 'package:flutter/material.dart';
import 'package:learningtrail/components/themed_button.dart';
import 'package:learningtrail/components/themed_column.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:learningtrail/app/bloc/system_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SystemCubit, SystemState>(
      builder: (context, state) {
        if (state is SystemLoggedIn) {
          final user = state.user;
          return SafeArea(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                // title
                const SizedBox(height: 16),
                ThemedText(
                  text: 'Profile',
                  type: ThemedTextType.secondary,
                  fontSize: 24,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  child: Divider(
                    height: 2,
                    thickness: 2,
                    color: Theme.of(
                      context,
                    ).colorScheme.onTertiaryContainer.withAlpha(50),
                  ),
                ),
                // photo
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(100),
                  ),
                  child: Image.network(
                    user.avatarUrl ?? '',
                    width: 100,
                    height: 100,
                  ),
                ),
                const SizedBox(height: 24),
                // basic informations
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 8,
                  children: [
                    ThemedText(
                      text: user.name ?? '',
                      type: ThemedTextType.primary,
                      fontSize: 24,
                      textAlign: TextAlign.left,
                    ),
                    ThemedText(
                      text: user.email,
                      type: ThemedTextType.secondary,
                      fontSize: 16,
                      textAlign: TextAlign.left,
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ThemedText(
                          text:
                              "Joined on ${user.createdAt.toLocal().toString().split(' ')[0]}",
                          type: ThemedTextType.secondary,
                          fontSize: 16,
                          textAlign: TextAlign.left,
                        ),
                        ThemedText(
                          text: 'ID: ${user.uid}',
                          type: ThemedTextType.secondary,
                          fontSize: 16,
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Divider(
                  height: 2,
                  thickness: 2,
                  color: Theme.of(
                    context,
                  ).colorScheme.onTertiaryContainer.withAlpha(50),
                ),
                const SizedBox(height: 24),
                // Account
                ThemedColumn(
                  title: 'Account',
                  children: [
                    ThemedText(
                      text: "More...",
                      type: ThemedTextType.primary,
                      fontSize: 16,
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                ThemedButton(
                  type: ThemedButtonType.secondary,
                  reversed: true,
                  height: 50,
                  onPressed: () {
                    SystemCubit().logout();
                  },
                  title: 'Log Out',
                ),
              ],
            ),
          );
        }
        return const Center(child: CircularProgressIndicator());
      },
    );
  }
}
