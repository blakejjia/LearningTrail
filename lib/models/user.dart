import 'package:json_annotation/json_annotation.dart';
import 'package:learningtrail/services/db_service.dart';

part 'user.g.dart';

@JsonSerializable()
class MyUser {
  final String uid;
  final String email;
  final DateTime createdAt;
  String? customId;
  String? connectedAccount;
  String? name;
  String? avatarUrl;

  MyUser({
    required this.uid,
    required this.email,
    required this.createdAt,
    this.name,
    this.avatarUrl,
    this.connectedAccount,
    this.customId,
  });

  void connectAccount(String accountId) {
    connectedAccount = accountId;
    DbService().updateUser(this);
  }

  void disconnectAccount() {
    connectedAccount = null;
    DbService().updateUser(this);
  }

  void setCustomId(String customId) {
    this.customId = customId;
    DbService().updateUser(this);
  }

  void setName(String? name) {
    this.name = name;
    DbService().updateUser(this);
  }

  void setAvatarUrl(String? avatarUrl) {
    this.avatarUrl = avatarUrl;
    DbService().updateUser(this);
  }

  factory MyUser.fromJson(Map<String, dynamic> json) => _$MyUserFromJson(json);
  Map<String, dynamic> toJson() => _$MyUserToJson(this);
}
