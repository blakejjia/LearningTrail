import 'package:flutter/material.dart';
import 'package:learningtrail/components/currency_widget.dart';
import 'package:learningtrail/models/currency.dart';

class CurrencyBar extends StatelessWidget {
  final List<Currency> currency;
  const CurrencyBar({super.key, required this.currency});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        spacing: 16,
        children: [
          // coin
          CurrencyWidget(
            currency: currency.firstWhere(
              (currency) => currency.type == CurrencyType.coin,
            ),
          ),
          // diamond
          CurrencyWidget(
            currency: currency.firstWhere(
              (currency) => currency.type == CurrencyType.diamond,
            ),
          ),
        ],
      ),
    );
  }
}
