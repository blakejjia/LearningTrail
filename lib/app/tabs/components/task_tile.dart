import 'package:flutter/material.dart';
import 'package:learningtrail/components/currency_widget.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:learningtrail/models/task.dart';

class TaskTile extends StatelessWidget {
  final Task task;
  const TaskTile({super.key, required this.task});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: ThemedText(
        text: task.name,
        type: ThemedTextType.primary,
        fontSize: 20,
        textAlign: TextAlign.left,
      ),
      subtitle: ThemedText(
        text: task.description,
        type: ThemedTextType.primary,
        fontSize: 16,
        textAlign: TextAlign.left,
      ),
      // reward
      trailing: CurrencyWidget(currency: task.reward),
    );
  }
}
