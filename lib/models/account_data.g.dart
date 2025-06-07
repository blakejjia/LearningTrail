// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'account_data.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AccountData _$AccountDataFromJson(Map<String, dynamic> json) => AccountData(
  parent: MyUser.fromJson(json['parent'] as Map<String, dynamic>),
  currency: Currency.fromJson(json['currency'] as Map<String, dynamic>),
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
      'currency': instance.currency,
      'prizes': instance.prizes,
      'tasks': instance.tasks,
    };
