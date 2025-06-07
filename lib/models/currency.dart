import 'package:json_annotation/json_annotation.dart';

part 'currency.g.dart';

enum CurrencyType { diamond, coin }

@JsonSerializable()
class Currency {
  final CurrencyType type;
  final int balance;

  Currency({required this.type, required this.balance});

  factory Currency.fromJson(Map<String, dynamic> json) =>
      _$CurrencyFromJson(json);
  Map<String, dynamic> toJson() => _$CurrencyToJson(this);
}
