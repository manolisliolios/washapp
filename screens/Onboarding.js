import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions, BackHandler
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import fakeDB from "./fakeDB";

class Onboarding extends React.Component {

  state = {
    isWashing: fakeDB.isWashing
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({isWashing: fakeDB.isWashing});
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  continuePress = () => {

    const {navigation} = this.props;
    if(this.state.isWashing) return navigation.navigate("WashingStarted");
    return navigation.navigate("Home")
  };

  render() {

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground source={Images.Onboarding} style={{ height, width, zIndex: 1 }}/>
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block style={styles.subTitle}>
                  <Text color="black" size={20} style={styles.text}>
                    Η εύκολη διαχείριση του πλυντηρίου σας!
                  </Text>
                </Block>
              </Block>
              <Block center>
                <Button style={styles.button} color={argonTheme.COLORS.SECONDARY} onPress={this.continuePress} textStyle={{ color: argonTheme.COLORS.BLACK }}>
                  Συνέχεια
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  },
  text: {
    textAlign: 'center'
  }
});

export default Onboarding;
