import React from "react";
import {
    ImageBackground,
    StyleSheet,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from "react-native";
import {Block, Button, Text, theme, Icon} from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";
import fakeDB from "./fakeDB";

class SimpleWashing extends React.Component {

    handleLeftPress = () => {
        const { navigation } = this.props;
        return navigation.navigate("Home");
    };

    handleAdvancedPress = () => {
        const {navigation} = this.props;
        return navigation.navigate("AdvancedWashing")
    };

    nextStep = () => {
        const {navigation} = this.props;
        fakeDB.washingOption = "SimpleWashing";
        fakeDB.time = 30;
        return navigation.navigate("ClothesInMachine")
    };

    render() {
        const { navigation } = this.props;

        return (

            <Block flex style={styles.container}>
                <StatusBar hidden />
                <Block flex center>
                    <ImageBackground source={Images.Onboarding} style={{ height, width, zIndex: 1 }}/>
                </Block>
                <TouchableOpacity onPress={this.handleLeftPress} style={styles.backBtn}>
                    <Icon name='arrow-left' family="feather" size={17} color='#242424' style={{fontWeight: '700'}}><Text size={17} style={{fontWeight: '700'}}>ΑΚΥΡΩΣΗ</Text></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleAdvancedPress} style={styles.advancedBtn}>
                    <Icon name='sliders' family="feather" size={17} color='#242424' style={{fontWeight: '700'}}><Text size={17} style={{fontWeight: '700'}}> ΧΕΙΡΟΚΙΝΗΤΗ ΡΥΘΜΙΣΗ</Text></Icon>
                </TouchableOpacity>

                <Block flex style={styles.padded}>
                    <Text bold size={16} style={styles.title}>ΕΠΙΛΕΞΤΕ ΜΙΑ ΛΕΙΤΟΥΡΓΙΑ</Text>

                    <Button style={[styles.button, {zIndex: 10}]} color="#f5f5f5" onPress={this.nextStep}>
                        <Block row>
                            <Icon name="skin" family="antdesign" size={17} style={{paddingTop: 4, paddingRight: 5}} color="#23232C"/>
                            <Text size={17} color="#23232C">Πλύσιμο λευκών ρούχων</Text>
                        </Block>
                    </Button>
                    <Button style={styles.button} color="primary" onPress={this.nextStep}>
                        <Block row>
                            <Icon name="skin" family="antdesign" size={15} style={{paddingTop: 4, paddingRight: 5}} color="#fff"/>
                            <Text size={17} color="#fff">Πλύσιμο χρωματιστών ρούχων</Text>
                        </Block>
                    </Button>
                    <Button style={styles.button} color="#f5f5f5" onPress={this.nextStep}>
                        <Block row>
                            <Icon name="feather" family="feather" size={17} style={{paddingTop: 4, paddingRight: 5}} color="#23232C"/>
                            <Text size={17} color="#23232C">Πλύσιμο βαμβακερών ρούχων</Text>
                        </Block>
                    </Button>
                    <Button style={styles.button} color="primary" onPress={this.nextStep}>
                        <Block row>
                            <Icon name="clockcircleo" family="antdesign" size={17} style={{paddingTop: 4, paddingRight: 5}} color="#fff"/>
                            <Text size={17} color="#fff">Ταχεία πλύση</Text>
                        </Block>
                    </Button>
                    <Button style={styles.button} color="#f5f5f5" onPress={this.nextStep}>
                        <Block row>
                            <Icon name="feather" family="feather" size={17} style={{paddingTop: 4, paddingRight: 5}} color="#23232C"/>
                            <Text size={17} color="#23232C">Πλύσιμο μάλλινων</Text>
                        </Block>
                    </Button>
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
        marginTop: '-60%'
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
        fontWeight: '700',
        fontSize: 22,
    },
    text: {
        textAlign: 'center'
    },
    backBtn:{
        zIndex: 2,
        position: 'absolute',
        top: 20,
        left: 10,
        borderWidth: 0,
        padding: 10
    },
    advancedBtn:{
        zIndex: 5,
        position: 'absolute',
        bottom: 30,
        right: 10,
        borderWidth: 0,
        padding: 10
    }
});

export default SimpleWashing;
