import 'package:flutter/material.dart';

class ThemedTextInput extends StatelessWidget {
  const ThemedTextInput({
    super.key,
    this.controller,
    this.hint,
    this.height,
    this.obscureText = false,
  });

  final String? hint;
  final double? height;
  final TextEditingController? controller;
  final bool obscureText;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.tertiaryContainer,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: Theme.of(
            context,
          ).colorScheme.onTertiaryContainer.withAlpha(50),
          width: 2,
        ),
      ),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        decoration: InputDecoration(
          border: InputBorder.none,
          labelText: hint,
          labelStyle: TextStyle(
            color: Theme.of(context).colorScheme.onTertiaryContainer,
            fontWeight: FontWeight.w500,
          ),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 12,
          ),
        ),
      ),
    );
  }
}
