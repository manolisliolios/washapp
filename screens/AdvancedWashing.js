import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Switch,
    AppState
} from "react-native";
import {Block, Text, theme, Icon, Slider, Button} from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";
import fakeDB from "./fakeDB";

class AdvancedWashing extends React.Component {


    handleLeftPress = () => {
        const { navigation } = this.props;
        return navigation.navigate("SimpleWashing");
    };

    nextStep = () => {

        const {navigation} = this.props;
        fakeDB.temperature = this.state.temperature;
        fakeDB.time = this.state.minutes;
        fakeDB.dryWash = this.state.drySwitch;
        fakeDB.washingOption = "AdvancedWashing";
        return navigation.navigate("ClothesInMachine")

    };

    state = {
        temperature: fakeDB.temperature,
        minutes: fakeDB.time,
        drySwitch: fakeDB.dryWash
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

                <Block flex style={styles.padded}>
                    <Text bold size={16} style={styles.title}>ΡΥΘΜΙΣΤΕ ΤΗΝ ΠΛΥΣΗ ΣΑΣ</Text>

                    <Text bold size={14} style={styles.blockMargin}>ΘΕΡΜΟΚΡΑΣΙΑ: {this.state.temperature} °C</Text>
                    <Slider
                        maximumValue={90}
                        minimumValue={10}
                        step = {10}
                        value={this.state.temperature}
                        style={styles.onTop}
                        onValueChange={value => this.setState({temperature: value })}
                    />

                    <Text bold size={14} style={styles.btnBlockMargin}>ΔΙΑΡΚΕΙΑ ΣΕ ΛΕΠΤΑ: {this.state.minutes} λεπτά</Text>
                    <Slider
                        maximumValue={120}
                        minimumValue={5}
                        step = {5}
                        value={this.state.minutes}
                        style={styles.onTop}
                        onValueChange={value => this.setState({ minutes: value })}
                    />
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'flex-start'}}>
                    <Text bold size={14} style={[styles.btnBlockMargin, styles.halfWidth]}>ΣΤΕΓΝΩΜΑ: </Text>

                    <Switch
                        style={[styles.halfWidth, {marginTop: 12}]}
                        color = "primary"
                        value={this.state.drySwitch}
                        onValueChange={() => this.setState({drySwitch: !this.state.drySwitch})}
                    />
                    </Block>

                    <Button style={[styles.button, {marginTop: 30}]} color="primary" onPress={this.nextStep}>
                        <Block row>
                            <Text size={17} color="#fff">Επόμενο βήμα </Text>
                            <Icon name="arrowright" family="antdesign" size={15} style={{paddingTop: 4, paddingRight: 5}} color="#fff"/>
                        </Block>
                    </Button>
                </Block>



            </Block>

        );
    }
}

const styles = StyleSheet.create({
    halfWidth:{
        alignSelf: 'flex-start',
    },

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
    subTitle: {
        marginTop: 20
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
});

export default AdvancedWashing;
