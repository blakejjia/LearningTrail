import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:learningtrail/models/currency.dart';

class CurrencyWidget extends StatelessWidget {
  final Currency currency;
  final double? size;
  final double? fontSize;
  const CurrencyWidget({
    super.key,
    required this.currency,
    this.size,
    this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      spacing: 4,
      children: [
        SvgPicture.network(
          currency.type == CurrencyType.coin
              ? 'https://api.jia-yx.com/learning-trail/learning-coin.svg'
              : 'https://api.jia-yx.com/learning-trail/diamond.svg',
          width: size ?? 30,
          height: size ?? 30,
        ),
        ThemedText(
          text: currency.balance.toString(),
          type: ThemedTextType.primary,
          fontSize: fontSize ?? 24,
        ),
      ],
    );
  }
}
