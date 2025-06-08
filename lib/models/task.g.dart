// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Task _$TaskFromJson(Map<String, dynamic> json) => Task(
  id: json['id'] as String,
  name: json['name'] as String,
  description: json['description'] as String,
  type: json['type'] as String,
  creationDate: Task._dateTimeFromJson(json['creationDate']),
  status: $enumDecode(_$TaskStatusEnumMap, json['status']),
  reward: Currency.fromJson(json['reward'] as Map<String, dynamic>),
);

Map<String, dynamic> _$TaskToJson(Task instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'description': instance.description,
  'type': instance.type,
  'status': _$TaskStatusEnumMap[instance.status]!,
  'reward': instance.reward,
  'creationDate': Task._dateTimeToJson(instance.creationDate),
};

const _$TaskStatusEnumMap = {
  TaskStatus.notStarted: 'notStarted',
  TaskStatus.pending: 'pending',
  TaskStatus.completed: 'completed',
};
