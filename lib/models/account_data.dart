import 'package:json_annotation/json_annotation.dart';
import 'package:learningtrail/models/currency.dart';
import 'package:learningtrail/models/prize.dart';
import 'package:learningtrail/models/task.dart';
import 'package:learningtrail/models/user.dart';

part 'account_data.g.dart';

@JsonSerializable()
class AccountData {
  final MyUser? parent;
  final List<Currency> currencies;
  final List<Prize> prizes;
  final List<Task> tasks;

  AccountData({
    this.parent,
    required this.currencies,
    required this.prizes,
    required this.tasks,
  });

  factory AccountData.fromJson(Map<String, dynamic> json) =>
      _$AccountDataFromJson(json);
  Map<String, dynamic> toJson() => _$AccountDataToJson(this);
}
