// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'prize.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Prize _$PrizeFromJson(Map<String, dynamic> json) => Prize(
  id: json['id'] as String,
  name: json['name'] as String,
  description: json['description'] as String,
  imageUrl: json['imageUrl'] as String,
  cost: Currency.fromJson(json['cost'] as Map<String, dynamic>),
);

Map<String, dynamic> _$PrizeToJson(Prize instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'description': instance.description,
  'imageUrl': instance.imageUrl,
  'cost': instance.cost,
};
