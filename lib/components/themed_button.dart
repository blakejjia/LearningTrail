import 'package:flutter/material.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:flutter/services.dart';

enum ThemedButtonType { primary, secondary, blank }

class ThemedButton extends StatefulWidget {
  // Button onPressed
  final VoidCallback? onPressed;

  // Button width
  final double? width;
  final double? height;

  // If background and foreground color reversed
  final bool? reversed;

  // Button title, if has title, children will be ignored
  final String? title;

  // Button child, if has child, title will be ignored
  final Widget? child;

  // Button type
  final ThemedButtonType type;

  final Color? backgroundColor;
  final Color? foregroundColor;
  final Color? borderColor;

  const ThemedButton({
    super.key,
    required this.onPressed,
    this.title,
    this.width,
    this.height,
    this.child,
    this.type = ThemedButtonType.primary,
    this.reversed = false,
    this.backgroundColor,
    this.foregroundColor,
    this.borderColor,
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
          height: widget.height ?? 50,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16.0),
            color:
                widget.backgroundColor ??
                _backgroundColor(context, widget.reversed, widget.type),
            border: Border.all(
              color:
                  widget.borderColor ??
                  _borderColor(context, widget.reversed, widget.type),
              width: 2,
            ),
          ),
          child:
              widget.child ??
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 14.0),
                child: Center(
                  child: ThemedText(
                    text: widget.title?.toUpperCase() ?? '',
                    type: ThemedTextType.primary,
                    fontSize: 18.0,
                    color:
                        widget.foregroundColor ??
                        _foregroundColor(context, widget.reversed, widget.type),
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
  if (type == ThemedButtonType.blank) {
    return Colors.transparent;
  }
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
  if (type == ThemedButtonType.blank) {
    return Colors.transparent;
  }
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

Color _borderColor(
  BuildContext context,
  bool? reversed,
  ThemedButtonType type,
) {
  if (type == ThemedButtonType.blank) {
    return Colors.transparent;
  }
  return Theme.of(context).colorScheme.onTertiaryContainer.withAlpha(50);
}
