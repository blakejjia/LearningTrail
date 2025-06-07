import 'package:flutter/material.dart';
import 'package:learningtrail/components/themed_text.dart';

class ThemedColumn extends StatelessWidget {
  const ThemedColumn({super.key, required this.children, this.title});
  final List<Widget> children;
  final String? title;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (title != null && title!.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: ThemedText(text: title!, type: ThemedTextType.primary),
          ),
        Container(
          width: double.infinity,
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: _borderColor(context), width: 2),
          ),
          child: Column(children: _buildChildrenWithDividers(context)),
        ),
      ],
    );
  }

  List<Widget> _buildChildrenWithDividers(BuildContext context) {
    List<Widget> widgets = [];

    for (int i = 0; i < children.length; i++) {
      widgets.add(
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          child: children[i],
        ),
      );

      if (i < children.length - 1) {
        widgets.add(
          Divider(height: 2, thickness: 2, color: _borderColor(context)),
        );
      }
    }
    return widgets;
  }
}

Color _borderColor(BuildContext context) {
  return Theme.of(context).colorScheme.onTertiaryContainer.withAlpha(50);
}
