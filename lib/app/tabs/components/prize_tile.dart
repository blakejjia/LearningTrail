import 'package:flutter/material.dart';
import 'package:learningtrail/components/currency_widget.dart';
import 'package:learningtrail/components/themed_button.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:learningtrail/models/prize.dart';

class PrizeTile extends StatelessWidget {
  final Prize prize;
  const PrizeTile({super.key, required this.prize});

  @override
  Widget build(BuildContext context) {
    return Row(
      spacing: 16,
      children: [
        SizedBox(width: 100, height: 100, child: Image.network(prize.imageUrl)),
        Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          spacing: 4,
          children: [
            ThemedText(
              text: prize.name,
              type: ThemedTextType.primary,
              fontSize: 20,
            ),
            ThemedText(
              text: prize.description,
              type: ThemedTextType.secondary,
              fontSize: 12,
            ),
            ThemedButton(
              onPressed: () {},
              reversed: true,
              type: ThemedButtonType.secondary,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    ThemedText(text: "Get for: ", fontSize: 18),
                    CurrencyWidget(
                      currency: prize.cost,
                      size: 23,
                      fontSize: 18,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
