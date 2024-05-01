import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ContinueButton from "../../../components/Onboarding/ContinueButton";
import DropDownLocation from "../../../components/Onboarding/DropDownLocation";
import OnboardingTitle from "../../../components/Onboarding/OnboardingTitle";
import TopBar from "../../../components/Onboarding/TopBar";
import scaleStyleSheet from "../../../scaleStyles";
import { setLocation } from "../../../state/formSlice";
import { useAppDispatch } from "../../../state/hooks";
import onboardingStyles from "../../../styles/Onboarding/styles";

const aboutLocationPicture = require("../../../assets/aboutlocation.png");

function AboutLocation() {
  const dispatch = useAppDispatch();
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const handleLocationChange = (location: string) => {
    setIsLocationSelected(!!location);
  };
  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: ""
    }
  });
  const onSubmit = (data: { location: string }) => {
    dispatch(setLocation(data.location));
    router.push("/Onboarding/Education&Career/Education");
  };
  return (
    <SafeAreaView style={scaledStyles.container}>
      <View style={scaledStyles.TopUiContainer}>
        <TopBar
          onBackPress={() => {
            router.back();
          }}
          text="About Me"
          selectedCount={1}
        />
      </View>
      <View style={scaledStyles.mainContainer}>
        <View>
          <Image source={aboutLocationPicture} />
          <OnboardingTitle text="I live in..." />
          <View style={scaledStyles.inputWrapper}>
            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, value } }) => (
                <DropDownLocation
                  onLocationChange={(location: string) => {
                    onChange(location);
                    handleLocationChange(location);
                  }}
                  selectedLocation={value}
                />
              )}
            />
          </View>
        </View>

        <View>
          <ContinueButton
            title="Continue"
            isDisabled={!isLocationSelected}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AboutLocation;

const scaledStyles = scaleStyleSheet(onboardingStyles);
