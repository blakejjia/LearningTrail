import 'package:json_annotation/json_annotation.dart';

part 'prize.g.dart';

@JsonSerializable()
class Prize {
  final String id;
  final String name;
  final String description;
  final String imageUrl;
  final int cost;

  Prize({
    required this.id,
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.cost,
  });

  factory Prize.fromJson(Map<String, dynamic> json) => _$PrizeFromJson(json);
  Map<String, dynamic> toJson() => _$PrizeToJson(this);
}
