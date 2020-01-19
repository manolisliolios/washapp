import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import argonTheme from '../constants/Theme';
import fakeDB from "../screens/fakeDB";

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);


class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    const { routeName } = navigation.state;

    switch (routeName) {
      case 'SimpleWashing':
        return navigation.navigate("Home");
      case 'AdvancedWashing':
        return navigation.navigate("SimpleWashing");
      case 'ClothesInMachine':
        return navigation.navigate(fakeDB.washingOption);
      default:
        return navigation.openDrawer();
    }

  };
  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;
  };

  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(routeName);
    const headerStyles = [!noShadow ? styles.shadow : null, transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block style={headerStyles}>
        <NavBar back={back} title={title} style={navbarStyles} transparent={transparent} rightStyle={{ alignItems: 'center' }}
                left={
            <Icon name={back ? 'nav-left' : "menu-8"} family="ArgonExtra" size={14} onPress={this.handleLeftPress} color={iconColor || argonTheme.COLORS.ICON}/>}
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[styles.title, { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] }, titleColor && { color: titleColor }]}
          {...props}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});

export default withNavigation(Header);
