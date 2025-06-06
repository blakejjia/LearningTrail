import 'package:flutter/material.dart';
import 'package:learningtrail/components/themedText.dart';

enum ThemedButtonType { primary, secondary }

class ThemedButton extends StatelessWidget {
  // Button onPressed
  final VoidCallback? onPressed;

  // Button width
  final double? width;

  // If background and foreground color reversed
  final bool? reversed;

  // Button title, if has title, children will be ignored
  final String? title;

  // Button children, if has children, title will be ignored
  final Widget? children;

  // Button type
  final ThemedButtonType type;

  const ThemedButton({
    super.key,
    required this.onPressed,
    required this.title,
    this.width,
    this.children,
    this.type = ThemedButtonType.primary,
    this.reversed = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressed,
      child: Container(
        width: width ?? double.infinity,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.0),
          color: _backgroundColor(context, reversed, type),
          border: Border.all(
            color: Theme.of(
              context,
            ).colorScheme.onTertiaryContainer.withAlpha(50),
            width: 2,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: Center(
            child: ThemedText(
              text: title?.toUpperCase() ?? '',
              type: ThemedTextType.primary,
              fontSize: 18.0,
              color: _foregroundColor(context, reversed, type),
            ),
          ),
        ),
      ),
    );
  }
}

Color _backgroundColor(
  BuildContext context,
  bool? reversed,
  ThemedButtonType type,
) {
  if (reversed == true && type == ThemedButtonType.primary) {
    return Theme.of(context).colorScheme.onPrimaryContainer;
  } else if (reversed == true && type == ThemedButtonType.secondary) {
    return Theme.of(context).colorScheme.onSecondaryContainer;
  } else if (type == ThemedButtonType.primary) {
    return Theme.of(context).colorScheme.primaryContainer;
  } else {
    return Theme.of(context).colorScheme.secondaryContainer;
  }
}

Color _foregroundColor(
  BuildContext context,
  bool? reversed,
  ThemedButtonType type,
) {
  if (reversed == true && type == ThemedButtonType.primary) {
    return Theme.of(context).colorScheme.primaryContainer;
  } else if (reversed == true && type == ThemedButtonType.secondary) {
    return Theme.of(context).colorScheme.secondaryContainer;
  } else if (type == ThemedButtonType.primary) {
    return Theme.of(context).colorScheme.onPrimaryContainer;
  } else {
    return Theme.of(context).colorScheme.onSecondaryContainer;
  }
}
