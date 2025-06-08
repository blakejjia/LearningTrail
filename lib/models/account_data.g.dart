// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'account_data.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AccountData _$AccountDataFromJson(Map<String, dynamic> json) => AccountData(
  parent: json['parent'] == null
      ? null
      : MyUser.fromJson(json['parent'] as Map<String, dynamic>),
  currencies: (json['currencies'] as List<dynamic>)
      .map((e) => Currency.fromJson(e as Map<String, dynamic>))
      .toList(),
  prizes: (json['prizes'] as List<dynamic>)
      .map((e) => Prize.fromJson(e as Map<String, dynamic>))
      .toList(),
  tasks: (json['tasks'] as List<dynamic>)
      .map((e) => Task.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$AccountDataToJson(AccountData instance) =>
    <String, dynamic>{
      'parent': instance.parent,
      'currencies': instance.currencies,
      'prizes': instance.prizes,
      'tasks': instance.tasks,
    };
