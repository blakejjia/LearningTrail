import 'package:flutter/material.dart';

enum ThemedTextType { primary, secondary, hint }

class ThemedText extends StatelessWidget {
  final String text;
  final ThemedTextType type;
  final Color? color;
  final double? fontSize;

  const ThemedText({
    super.key,
    required this.text,
    this.type = ThemedTextType.primary,
    this.color,
    this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
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
  }
}
