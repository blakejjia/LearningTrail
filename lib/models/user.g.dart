// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MyUser _$MyUserFromJson(Map<String, dynamic> json) => MyUser(
  uid: json['uid'] as String,
  email: json['email'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  name: json['name'] as String?,
  avatarUrl: json['avatarUrl'] as String?,
  connectedAccount: json['connectedAccount'] as String?,
  customId: json['customId'] as String?,
);

Map<String, dynamic> _$MyUserToJson(MyUser instance) => <String, dynamic>{
  'uid': instance.uid,
  'email': instance.email,
  'createdAt': instance.createdAt.toIso8601String(),
  'customId': instance.customId,
  'connectedAccount': instance.connectedAccount,
  'name': instance.name,
  'avatarUrl': instance.avatarUrl,
};
