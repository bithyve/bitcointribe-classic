import React, { Component } from "react";
import {
    StyleSheet,
    View,
    AsyncStorage,
    Platform,
    Dimensions,
    Image,
    Keyboard,
    StatusBar,
    Linking,
    Alert,
    ImageBackground,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { RkCard } from "react-native-ui-kitten";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { StackActions, NavigationActions } from "react-navigation";
import IconFontAwe from "react-native-vector-icons/FontAwesome";
import Permissions from 'react-native-permissions'
import { SvgIcon } from "@up-shared/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
var converter = require( 'number-to-words' );

//TODO: Custome Compontes
import CustomeStatusBar from "HexaWallet/src/app/custcompontes/CustomeStatusBar/CustomeStatusBar";
import ModelHealthCheckMnemonicFirstWord from "HexaWallet/src/app/custcompontes/Model/ModelHealthCheckMnemonic/ModelHealthCheckMnemonicFirstWord";
import ModelHealthCheckMnemonicSecoundWord from "HexaWallet/src/app/custcompontes/Model/ModelHealthCheckMnemonic/ModelHealthCheckMnemonicSecoundWord";
import ModelHealthCheckMnemonicThirdWord from "HexaWallet/src/app/custcompontes/Model/ModelHealthCheckMnemonic/ModelHealthCheckMnemonicThirdWord";
import ModelHeackCheckMnemonicSucessBackedUp from "HexaWallet/src/app/custcompontes/Model/ModelHealthCheckMnemonic/ModelHeackCheckMnemonicSucessBackedUp";


//TODO: Custome StyleSheet Files       
import globalStyle from "HexaWallet/src/app/manager/Global/StyleSheet/Style";

//TODO: Custome Object
import {
    colors,
    images,
    localDB,
    asyncStorageKeys
} from "HexaWallet/src/app/constants/Constants";
import utils from "HexaWallet/src/app/constants/Utils";
import Singleton from "HexaWallet/src/app/constants/Singleton";
var dbOpration = require( "HexaWallet/src/app/manager/database/DBOpration" );
import renderIf from "HexaWallet/src/app/constants/validation/renderIf";

//localization       
import { localization } from "HexaWallet/src/app/manager/Localization/i18n";





//TODO: Common Funciton
var comFunDBRead = require( "HexaWallet/src/app/manager/CommonFunction/CommonDBReadData" );

export default class HealthCheckMnemonicScreen extends Component {
    constructor ( props: any ) {
        super( props );
        this.state = {
            data: [],
            arr_ModelHealthCheckMnemonicFirstWord: [],
            arr_ModelHealthCheckMnemonicSecoundWord: [],
            arr_ModelHealthCheckMnemonicThirdWord: [],
            arr_ModelHeackCheckMnemonicSucessBackedUp: []
        };
    }

    componentWillMount() {
        let data = this.props.navigation.getParam( "data" );
        setTimeout( () => {
            this.setState( {
                data,
                arr_ModelHealthCheckMnemonicFirstWord: [ {
                    modalVisible: true,
                    number: data[ 0 ][ 0 ],
                    word: data[ 1 ][ 0 ]
                } ]
            } )
        }, 100 );
    }

    render() {
        let { arr_ModelHealthCheckMnemonicFirstWord, arr_ModelHealthCheckMnemonicSecoundWord, arr_ModelHealthCheckMnemonicThirdWord, arr_ModelHeackCheckMnemonicSucessBackedUp, data } = this.state;
        return (
            <View style={ styles.container }>
                <SafeAreaView style={ styles.container }>
                    <CustomeStatusBar backgroundColor={ colors.white } flagShowStatusBar={ false } barStyle="dark-content" />
                    <ImageBackground source={ images.WalletSetupScreen.WalletScreen.backgoundImage } style={ styles.container }>
                        <KeyboardAwareScrollView
                            enableAutomaticScroll
                            automaticallyAdjustContentInsets={ true }
                            keyboardOpeningTime={ 0 }
                            enableOnAndroid={ true }
                            contentContainerStyle={ { flexGrow: 1 } }
                        >
                            <ModelHealthCheckMnemonicFirstWord data={ arr_ModelHealthCheckMnemonicFirstWord }
                                click_Next={ () => {
                                    this.setState( {
                                        arr_ModelHealthCheckMnemonicFirstWord: [ {
                                            modalVisible: false,
                                        } ],
                                        arr_ModelHealthCheckMnemonicSecoundWord: [ {
                                            modalVisible: true,
                                            number: data[ 0 ][ 1 ],
                                            word: data[ 1 ][ 1 ]
                                        } ]
                                    } )
                                } }
                                pop={ () => {
                                    this.setState( {
                                        arr_ModelHealthCheckMnemonicFirstWord: [ {
                                            modalVisible: false,
                                        } ]
                                    } )
                                    this.props.navigation.pop()
                                } }
                            />
                            <ModelHealthCheckMnemonicSecoundWord data={ arr_ModelHealthCheckMnemonicSecoundWord }
                                click_Next={ () => {
                                    this.setState( {
                                        arr_ModelHealthCheckMnemonicSecoundWord: [ {
                                            modalVisible: false,
                                        } ],
                                        arr_ModelHealthCheckMnemonicThirdWord: [ {
                                            modalVisible: true,
                                            number: data[ 0 ][ 2 ],
                                            word: data[ 1 ][ 2 ]
                                        } ]
                                    } )
                                } }
                                pop={ () => {
                                    this.setState( {
                                        arr_ModelHealthCheckMnemonicSecoundWord: [ {
                                            modalVisible: false,
                                        } ]
                                    } )
                                    this.props.navigation.pop()
                                } }
                            />
                            <ModelHealthCheckMnemonicThirdWord data={ arr_ModelHealthCheckMnemonicThirdWord }
                                click_Next={ () => {
                                    this.setState( {
                                        arr_ModelHealthCheckMnemonicThirdWord: [ {
                                            modalVisible: false,
                                        } ],
                                        arr_ModelHeackCheckMnemonicSucessBackedUp: [ {
                                            modalVisible: true,
                                        } ]
                                    } )
                                } }
                                pop={ () => {
                                    this.setState( {
                                        arr_ModelHealthCheckMnemonicThirdWord: [ {
                                            modalVisible: false,
                                        } ]
                                    } )
                                    this.props.navigation.pop()
                                } }
                            />
                            <ModelHeackCheckMnemonicSucessBackedUp data={ arr_ModelHeackCheckMnemonicSucessBackedUp }
                                click_GoToWallet={ () => {
                                    this.setState( {
                                        arr_ModelHeackCheckMnemonicSucessBackedUp: [
                                            {
                                                modalVisible: false
                                            }
                                        ]
                                    } )
                                    this.props.navigation.pop();
                                } }
                            />
                        </KeyboardAwareScrollView>
                    </ImageBackground>
                </SafeAreaView>
            </View >
        );
    }
}

let styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "#1F8BCD"
    },
    viewSetupWallet: {
        flex: 4,
        margin: 10
    },
    viewAppLogo: {
        marginTop: 20,
        flex: 1,
        alignItems: "center",
    },
    imgAppLogo: {
        height: 70,
        width: 70
    },
    txtWhiteColor: {
        color: "#ffffff"
    }
} );
