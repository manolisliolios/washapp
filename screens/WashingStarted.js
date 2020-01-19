
import React from "react";
import {
    ImageBackground,
    StyleSheet,
    StatusBar,
    Dimensions,
    BackHandler,
    Alert
} from "react-native";
import {Block, Text, theme, Icon, Button} from "galio-framework";
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";
import fakeDB from "./fakeDB";
import {argonTheme} from "../constants";

class WashingStarted extends React.Component {

    state = {
        duration: fakeDB.time,
        remainingDuration: fakeDB.time,
        progress: 0,
        isPaused: false

    };
    componentDidMount() {
        const { navigation } = this.props;
        BackHandler.addEventListener('hardwareBackPress', this.backPress);
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({duration: fakeDB.time});
            if(fakeDB.wasCancelled){
                this.setState({remainingDuration: fakeDB.time, progress: 0, isPaused: false});
                fakeDB.wasCancelled = false;
            }
        });

        let refreshTimeRemaining = setInterval( () => {

            if(this.state.remainingDuration <= 0){
               return clearInterval(refreshTimeRemaining);
            }
            if(!this.state.isPaused){
                this.setState({
                    remainingDuration: this.state.remainingDuration - 1,
                    progress: (this.state.duration - this.state.remainingDuration +1 ) / this.state.duration
                });
            }
        }, 1000);

    }

    pauseTimer = () => {
        this.setState({isPaused: !this.state.isPaused});
    };

    componentWillUnmount(){
        // Remove the event listener
        this.focusListener.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.backPress);
    }

    backPress = () => true;

    _renderPause(){
        if(!this.state.isPaused){
            return (
                <Button style={styles.button} color="warning" onPress={this.pauseTimer}>
                    <Block row>
                        <Icon name="pause-circle" family="feather" size={17} style={{paddingTop: 4, paddingRight: 5}} color="#fff"/>
                        <Text size={17} color="#fff">Παύση λειτουργίας</Text>
                    </Block>
                </Button>
            )
        }else{
            return null;
        }
    };

    _renderContinue(){
        if(this.state.isPaused){
            return (
                <Button style={styles.button} color="primary" onPress={this.pauseTimer}>
                    <Block row>
                        <Icon name="play-circle" family="feather" size={17} style={{paddingTop: 4, paddingRight: 5}} color="#fff"/>
                        <Text size={17} color="#fff">Συνέχιση λειτουργίας</Text>
                    </Block>
                </Button>
            )
        }else{
            return null;
        }
    };

    cancelWashing(){
        const {navigation} = this.props;
        Alert.alert(
            'Θέλετε σίγουρα να τερματίσετε την πλύση;',
            'Η πλύση θα σταματήσει ολοκληρωτικά και δεν θα μπορέσετε να την επαναφέρετε στο σημείο που βρισκόταν.',
            [
            {text: 'Άκυρο', onPress: () => {}, style: 'cancel'},
            {text: 'Τερματισμός', onPress: () => {
                fakeDB.isWashing = false;
                fakeDB.wasCancelled = true;
                return navigation.navigate("Home");
            }}],
            {cancelable: true},
        );
    }

    render() {

        return (

            <Block flex style={styles.container}>
                <StatusBar hidden />
                <Block flex center>
                    <ImageBackground source={Images.Onboarding} style={{ height, width, zIndex: 1 }}/>
                </Block>

                <Block flex style={styles.padded}>
                    <Text bold size={16} style={styles.title} center>Η ΠΛΥΣΗ ΤΩΝ ΡΟΥΧΩΝ ΕΧΕΙ ΞΕΚΙΝΗΣΕΙ</Text>
                    <Text style={styles.text}>Συνολική διάρκεια: {this.state.duration} λεπτά</Text>
                    <Text style={styles.text}>Χρόνος που απομένει: {this.state.remainingDuration} λεπτά</Text>
                    <Block style={[styles.text, styles.blockMargin]}>
                        <Progress.Circle size={130} color={argonTheme.COLORS.DEFAULT} thickness={5} progress={this.state.progress} strokeCap='square' showsText={true} />
                    </Block>
                    <Block style={[styles.blockMargin]}>
                        {this._renderPause()}
                        {this._renderContinue()}

                        <Button style={styles.button} color="error" onPress={() => {this.cancelWashing()}}>
                            <Block row>
                                <Icon name="warning" family="antdesign" size={17} style={{paddingRight: 5}} color="#fff"/>
                                <Text size={13} color="#fff">Υποχρεωτικός τερματισμός λειτουργίας</Text>
                            </Block>
                        </Button>
                    </Block>

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
        marginTop: '-40%'
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
});

export default WashingStarted;
