import { ThemedText } from "@/components/common/ThemedText";
import {
  Keyboard,
  Modal,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import CurrencyWidget from "@/components/common/currency";
import { Currency } from "@/store/models/currency";
import { Reward } from "@/store/other/reward";
import { useRef, useState } from "react";
import tw from "twrnc";
import ThemedButton from "../../common/ThemedButton";

export default function RewardSelector({
  reward,
  setReward,
  currencies,
}: {
  reward: Reward;
  setReward: (reward: Reward) => void;
  currencies: Currency[];
}) {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [amount, setAmount] = useState(reward.amount.toString());

  const inputRef = useRef<TextInput>(null);

  const handleAmountPress = () => {
    inputRef.current?.focus();
  };

  const handleAmountChange = (value: string) => {
    // 只允许输入数字和小数点
    let cleaned = value.replace(/[^0-9.]/g, "");

    // 去除多余的前导0（但保留"0"和"0.xxx"）
    if (
      cleaned.startsWith("0") &&
      cleaned.length > 1 &&
      !cleaned.startsWith("0.")
    ) {
      cleaned = cleaned.replace(/^0+/, "");
      if (cleaned === "" || cleaned.startsWith(".")) {
        cleaned = "0" + cleaned;
      }
    }

    setAmount(cleaned);
    const numeric = parseFloat(cleaned);
    if (!isNaN(numeric)) {
      setReward({ currency: reward.currency, amount: numeric });
    } else {
      setReward({ currency: reward.currency, amount: 0 });
    }
  };

  const selectCurrency = (currency: Currency) => {
    setReward({ currency, amount: parseFloat(amount) || 0 });
    setCurrencyOpen(false);
  };

  return (
    <>
      <View style={tw`w-full flex-row gap-2 items-center`}>
        {/* Currency Button */}
        <ThemedButton onPress={() => setCurrencyOpen(true)} style={tw`flex-1`}>
          <CurrencyWidget
            currency={reward.currency ?? currencies[0]}
            showAmount={false}
          />
        </ThemedButton>

        {/* Amount Button */}
        <ThemedButton onPress={handleAmountPress} style={tw`flex-3`}>
          <ThemedText>{amount || "0"}</ThemedText>
        </ThemedButton>

        {/* Hidden TextInput */}
        <TextInput
          ref={inputRef}
          style={tw`absolute opacity-0 w-0 h-0`}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={handleAmountChange}
          blurOnSubmit={true}
        />
      </View>

      {/* Currency Modal */}
      <Modal visible={currencyOpen} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tw`flex-1 justify-end bg-black/50`}>
            <View style={tw`bg-white rounded-t-xl p-4 max-h-[50%]`}>
              <ThemedText type="defaultSemiBold">Select Currency</ThemedText>
              <ScrollView>
                {currencies.map((currency) => (
                  <ThemedButton
                    key={currency.id}
                    onPress={() => selectCurrency(currency)}
                    style={tw`p-3 border-b border-gray-200`}
                  >
                    <CurrencyWidget currency={currency} showAmount={false} />
                  </ThemedButton>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
