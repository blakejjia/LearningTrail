import 'package:flutter/material.dart';

enum ThemedTextType { primary, secondary, hint, warning }

class ThemedText extends StatelessWidget {
  final String text;
  final ThemedTextType type;
  final Color? color;
  final double? fontSize;
  final TextAlign? textAlign;

  const ThemedText({
    super.key,
    required this.text,
    this.type = ThemedTextType.primary,
    this.color,
    this.fontSize,
    this.textAlign,
  });

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: textAlign ?? TextAlign.center,
      style: TextStyle(
        fontSize: fontSize ?? 24,
        height: 1.2,
        color: color ?? _textColor(context, type),
        fontWeight: FontWeight.bold,
      ),
    );
  }
}

Color _textColor(BuildContext context, ThemedTextType type) {
  switch (type) {
    case ThemedTextType.primary:
      return Theme.of(context).colorScheme.onSurface;
    case ThemedTextType.secondary:
      return Theme.of(context).colorScheme.onSurfaceVariant;
    case ThemedTextType.hint:
      return Theme.of(context).colorScheme.onSurfaceVariant.withAlpha(50);
    case ThemedTextType.warning:
      return Theme.of(context).colorScheme.error;
  }
}
