import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import SimpleWashing from "../screens/SimpleWashing";
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import AdvancedWashing from "../screens/AdvancedWashing";
import ClothesInMachine from "../screens/ClothesInMachine";
import WashingStarted from "../screens/WashingStarted";
import DeviceInfo from "../screens/DeviceInfo";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: Home,
      navigationOptions: navOpt => ({
        drawerLabel: () => {}
        // drawerLabel: ({ focused }) => (
        //   <DrawerItem focused={focused} screen="Home" title="Home" />
        // )
      })
    },
    SimpleWashing: {
      screen: SimpleWashing,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    AdvancedWashing: {
      screen: AdvancedWashing,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    ClothesInMachine: {
      screen: ClothesInMachine,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    WashingStarted: {
      screen: WashingStarted,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    DeviceInfo: {
      screen: DeviceInfo,
      navigationOptions: {
        drawerLabel: () => {}
      }
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
