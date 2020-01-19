import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme, Icon } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";
import fakeDB from "./fakeDB";

class Home extends React.Component {

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({duration: fakeDB.time})
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }


  render() {
    const { navigation } = this.props;

    return (
        <Block flex style={styles.container}>
          <StatusBar hidden />
          <Block flex center>
            <ImageBackground source={Images.Onboarding} style={{ height, width, zIndex: 1 }}/>
          </Block>
          <Block center>
            <Image source={Images.LogoOnboarding} style={styles.logo} />
          </Block>
          <Block flex style={styles.padded}>
            <Text bold size={16} style={styles.title}>Επιλέξτε τι θέλετε να κάνετε:</Text>
            <Block>
              <Block style={styles.btnBlockMargin}>
                <Button color="primary" style={[styles.button, styles.homeBtn]}  textStyle={{ fontSize: 22 }}  onPress={() => navigation.navigate("SimpleWashing")}>
                  <Block row>
                    <Icon name="speaker" family="feather" size={20} style={{paddingTop: 4, paddingRight: 5}} color="#fff"/>
                  <Text size={20} color="#fff">Πλύσιμο ρούχων </Text>
                  </Block>
                </Button>
              </Block>
              <Block style={styles.btnBlockMargin}>
                <Button style={styles.button} color="#f5f5f5" onPress={() => navigation.navigate("DeviceInfo")}>
                  <Block row>
                    <Icon name="settings" family="feather" size={20} style={{paddingTop: 4, paddingRight: 5}} color="#23232C"/>
                    <Text size={20} color="#23232C">Πληροφορίες συσκευής</Text>
                  </Block>
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
    marginTop: '-20%'
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  blockMargin:{
    marginTop: 30
  },
  btnBlockMargin:{
    marginTop: 15
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-70%'
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

export default Home;
