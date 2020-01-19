
import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    TouchableOpacity, Alert
} from "react-native";
import {Block, Text, theme, Icon, Button} from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";
import fakeDB from "./fakeDB";

class ClothesInMachine extends React.Component {


    handleLeftPress = () => {
        const { navigation } = this.props;
        return navigation.navigate(fakeDB.washingOption);
    };


    startWashing = () => {
        const {navigation} = this.props;
        Alert.alert(
            'Θέλετε σίγουρα να ξεκινήσετε την πλύση;',
            'Βεβαιωθείτε ότι έχετε κλείσει την πόρτα του πλυντηρίου και ότι είναι όλα έτοιμα για εκκίνηση!',
            [
                {text: 'Όχι', onPress: () => {}, style: 'cancel'},
                {text: 'Ναι', onPress: () => {
                        fakeDB.isWashing = true;
                        return navigation.navigate("WashingStarted");
                    }}],
            {cancelable: true},
        );
    };


    render() {

        return (

            <Block flex style={styles.container}>
                <StatusBar hidden />
                <Block flex center>
                    <ImageBackground source={Images.Onboarding} style={{ height, width, zIndex: 1 }}/>
                </Block>
                <TouchableOpacity onPress={this.handleLeftPress} style={styles.backBtn}>
                    <Icon name='arrow-left' family="feather" size={17} color='#242424' style={{fontWeight: '700'}}><Text size={17} style={{fontWeight: '700'}}>ΡΥΘΜΙΣΕΙΣ</Text></Icon>
                </TouchableOpacity>

                <Block flex style={styles.padded}>
                    <Block>
                        <Image source={Images.putClothesIn} style={styles.putClothesInImage}/>
                    </Block>
                    <Text bold size={16} style={styles.title} center>ΤΟΠΟΘΕΤΗΣΤΕ ΤΑ ΡΟΥΧΑ ΣΑΣ ΣΤΟ ΠΛΥΝΤΗΡΙΟ ΚΑΙ ΣΤΗ ΣΥΝΕΧΕΙΑ ΠΑΤΗΣΤΕ ΕΚΚΙΝΗΣΗ ΠΛΥΣΗΣ</Text>

                    <Button style={[styles.button, {marginTop: 30}]} color="primary" onPress={this.startWashing}>
                        <Block row>
                            <Icon name="speaker" family="feather" size={20} style={{paddingRight: 5}} color="#fff"/>
                            <Text size={17} color="#fff">ΕΚΚΙΝΗΣΗ ΠΛΥΣΗΣ </Text>
                        </Block>
                    </Button>
                </Block>



            </Block>

        );
    }
}

const styles = StyleSheet.create({
    putClothesInImage: {
        maxWidth: 120,
        maxHeight: 120,
        alignSelf: 'center',
        marginTop: '-50%'
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
        marginTop: '-20%'
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
});

export default ClothesInMachine;
