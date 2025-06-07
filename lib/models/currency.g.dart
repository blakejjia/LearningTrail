// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'currency.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Currency _$CurrencyFromJson(Map<String, dynamic> json) => Currency(
  type: $enumDecode(_$CurrencyTypeEnumMap, json['type']),
  balance: (json['balance'] as num).toInt(),
);

Map<String, dynamic> _$CurrencyToJson(Currency instance) => <String, dynamic>{
  'type': _$CurrencyTypeEnumMap[instance.type]!,
  'balance': instance.balance,
};

const _$CurrencyTypeEnumMap = {
  CurrencyType.diamond: 'diamond',
  CurrencyType.coin: 'coin',
};
