import 'package:json_annotation/json_annotation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:learningtrail/models/currency.dart';

part 'task.g.dart';

enum TaskStatus { notStarted, pending, completed }

@JsonSerializable()
class Task {
  final String id;
  final String name;
  final String description;
  final String type;
  final TaskStatus status;
  final Currency reward;

  @JsonKey(fromJson: _dateTimeFromJson, toJson: _dateTimeToJson)
  final DateTime creationDate;

  Task({
    required this.id,
    required this.name,
    required this.description,
    required this.type,
    required this.creationDate,
    required this.status,
    required this.reward,
  });

  factory Task.fromJson(Map<String, dynamic> json) => _$TaskFromJson(json);
  Map<String, dynamic> toJson() => _$TaskToJson(this);

  static DateTime _dateTimeFromJson(dynamic value) {
    if (value is Timestamp) {
      return value.toDate();
    } else if (value is String) {
      return DateTime.parse(value);
    } else if (value is DateTime) {
      return value;
    } else {
      throw Exception('Invalid type for creationDate: ${value.runtimeType}');
    }
  }

  static dynamic _dateTimeToJson(DateTime date) => date.toIso8601String();
}
