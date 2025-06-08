import 'package:flutter/material.dart';

class ThemedContainer extends StatelessWidget {
  final Widget child;
  final double? width;
  const ThemedContainer({super.key, required this.child, this.width});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: _borderColor(context), width: 2),
      ),
      child: Padding(padding: const EdgeInsets.all(16), child: child),
    );
  }
}

Color _borderColor(BuildContext context) {
  return Theme.of(context).colorScheme.onTertiaryContainer.withAlpha(50);
}
