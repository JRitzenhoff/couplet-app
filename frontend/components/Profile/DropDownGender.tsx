/* eslint-disable */
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import scaleStyleSheet from "../../scaleStyles";
import genders from "../../utils/genders";

interface DropDownGenderProps {
  onGenderChange: (local: string) => void;
  selectedPronoun: string;
}

export default function DropDownGender({ onGenderChange, selectedPronoun }: DropDownGenderProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedPronoun);
  const items = genders.map((neighborhood) => ({
    label: neighborhood,
    value: neighborhood
  }));

  useEffect(() => {
    onGenderChange(value);
  }, [value]);

  return (
    <View style={scaledStyles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="Select preferred gender"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const scaledStyles = scaleStyleSheet(styles);
