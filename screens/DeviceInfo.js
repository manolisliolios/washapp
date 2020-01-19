import React from "react";
import {
    ImageBackground,
    StyleSheet,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from "react-native";
import {Block, Text, theme, Icon, Button} from "galio-framework";
import * as Progress from 'react-native-progress';
const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";
import fakeDB from "./fakeDB";
import {argonTheme} from "../constants";

class DeviceInfo extends React.Component {

    state = {
        detergentLevel: fakeDB.detergentLevel/100.00,
        softenerLevel: fakeDB.softenerLevel/100.00
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({detergentLevel: parseFloat((fakeDB.detergentLevel/100.00) - 0.01) , softenerLevel: parseFloat(fakeDB.softenerLevel/100.00) - 0.01});
        });

    }

    componentWillUnmount(){
        this.focusListener.remove();
    }

    handleLeftPress = () => {
        const { navigation } = this.props;
        return navigation.navigate("Home");
    };


    render() {

        return (

            <Block flex style={styles.container}>
                <StatusBar hidden />
                <Block flex center>
                    <ImageBackground source={Images.Onboarding} style={{ height, width, zIndex: 1 }}/>
                </Block>
                <TouchableOpacity onPress={this.handleLeftPress} style={styles.backBtn}>
                    <Icon name='arrow-left' family="feather" size={17} color='#242424' style={{fontWeight: '700'}}><Text size={17} style={{fontWeight: '700'}}>ΕΠΙΣΤΡΟΦΗ</Text></Icon>
                </TouchableOpacity>

                <Block flex style={styles.padded}>
                    <Text size={14} style={styles.title} center>Ονομασία συσκευής: LG-WSHMACHINE00518</Text>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'flex-start'}}>
                        <Block style={[styles.text, styles.blockMargin, styles.item]}>
                            <Text bold size={14} style={{fontWeight: '700', marginTop: 30}} center>ΕΠΙΠΕΔΑ ΑΠΟΡΡΥΠΑΝΤΙΚΟΥ</Text>
                            <Block style={[styles.text, styles.blockMargin]}>
                                <Progress.Circle size={130} color={argonTheme.COLORS.DEFAULT} thickness={5} progress={this.state.detergentLevel} strokeCap='square' showsText={true} />
                            </Block>
                        </Block>
                        <Block style={[styles.text, styles.blockMargin, styles.item]}>
                            <Text bold size={14} style={{fontWeight: '700', marginTop: 30}} center>ΕΠΙΠΕΔΑ ΜΑΛΑΚΤΙΚΟΥ </Text>
                            <Block style={[styles.text, styles.blockMargin]}>
                                <Progress.Circle size={130} color={argonTheme.COLORS.LABEL} thickness={5} progress={this.state.softenerLevel} strokeCap='square' showsText={true} />
                            </Block>
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
    onTop:{
        zIndex:3
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: "relative",
        bottom: theme.SIZES.BASE,
        zIndex: 2,
        marginTop: '-50%'
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
        marginTop: 20
    },
    blockMargin:{
        marginTop: 30
    },
    btnBlockMargin:{
        marginTop: 15
    },
    title: {
        marginTop:'-30%',
        fontWeight: '700'
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    backBtn:{
        zIndex: 2,
        position: 'absolute',
        top: 20,
        left: 10,
        borderWidth: 0,
        padding: 10
    },
    item: {
        width: '50%'
    }
});

export default DeviceInfo;
