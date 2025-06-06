import 'package:flutter/material.dart';
import 'package:learningtrail/components/themedText.dart';
import 'package:flutter/services.dart';

enum ThemedButtonType { primary, secondary }

class ThemedButton extends StatefulWidget {
  // Button onPressed
  final VoidCallback? onPressed;

  // Button width
  final double? width;

  // If background and foreground color reversed
  final bool? reversed;

  // Button title, if has title, children will be ignored
  final String? title;

  // Button child, if has child, title will be ignored
  final Widget? child;

  // Button type
  final ThemedButtonType type;

  const ThemedButton({
    super.key,
    required this.onPressed,
    required this.title,
    this.width,
    this.child,
    this.type = ThemedButtonType.primary,
    this.reversed = false,
  });

  @override
  State<ThemedButton> createState() => _ThemedButtonState();
}

class _ThemedButtonState extends State<ThemedButton> {
  bool _pressed = false;

  void _setPressed(bool value) {
    setState(() {
      _pressed = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onPressed,
      onTapDown: (_) {
        _setPressed(true);
        HapticFeedback.lightImpact();
      },
      onTapUp: (_) => _setPressed(false),
      onTapCancel: () => _setPressed(false),
      child: AnimatedScale(
        scale: _pressed ? 0.98 : 1.0,
        duration: const Duration(milliseconds: 100),
        child: Container(
          width: widget.width ?? double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16.0),
            color: _backgroundColor(context, widget.reversed, widget.type),
            border: Border.all(
              color: Theme.of(
                context,
              ).colorScheme.onTertiaryContainer.withAlpha(50),
              width: 2,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 14.0),
            child: Center(
              child:
                  widget.child ??
                  ThemedText(
                    text: widget.title?.toUpperCase() ?? '',
                    type: ThemedTextType.primary,
                    fontSize: 18.0,
                    color: _foregroundColor(
                      context,
                      widget.reversed,
                      widget.type,
                    ),
                  ),
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
