import 'package:json_annotation/json_annotation.dart';

part 'task.g.dart';

enum TaskStatus { notStarted, pending, completed }

@JsonSerializable()
class Task {
  final String id;
  final String name;
  final String description;
  final String type;
  final TaskStatus status;

  Task({
    required this.id,
    required this.name,
    required this.description,
    required this.type,
    this.status = TaskStatus.notStarted,
  });

  factory Task.fromJson(Map<String, dynamic> json) => _$TaskFromJson(json);
  Map<String, dynamic> toJson() => _$TaskToJson(this);
}
