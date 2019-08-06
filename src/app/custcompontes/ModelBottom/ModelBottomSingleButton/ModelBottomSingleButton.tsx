import React, { Component } from 'react';
import { TouchableHighlight, View, Alert, StyleSheet, TextInput } from 'react-native';
import { Button, Icon, Text, Textarea, Form } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from 'react-native-modalbox';
import ImageSVG from 'react-native-remote-svg';

import FullLinearGradientButton from "HexaWallet/src/app/custcompontes/LinearGradient/Buttons/FullLinearGradientButton";
import { SvgIcon } from "@up-shared/components";

//TODO: Custome Alert 
import AlertSimple from "HexaWallet/src/app/custcompontes/Alert/AlertSimple";
let alert = new AlertSimple();

//TODO: Custome StyleSheet Files       
import globalStyle from "HexaWallet/src/app/manager/Global/StyleSheet/Style";
import renderIf from "HexaWallet/src/app/constants/validation/renderIf";

//TODO: Custome Object
import {
    colors,
    localDB,
    svgIcon
} from "HexaWallet/src/app/constants/Constants";
var utils = require( "HexaWallet/src/app/constants/Utils" );
var dbOpration = require( "HexaWallet/src/app/manager/database/DBOpration" );


interface Props {
    data: [];
    closeModal: Function;
    click_Done: Function;
    pop: Function;
}


//TODO: Custome Pages
import Loader from "HexaWallet/src/app/custcompontes/Loader/ModelLoader";

//TODO: Common Funciton
var comAppHealth = require( "HexaWallet/src/app/manager/CommonFunction/CommonAppHealth" );

//Bitcoin Files
var bitcoinClassState = require( "HexaWallet/src/app/manager/ClassState/BitcoinClassState" );
import SecureAccount from "HexaWallet/src/bitcoin/services/accounts/SecureAccount";

export default class ModelBottomSingleButton extends Component<Props, any> {

    constructor ( props: any ) {
        super( props );
        this.state = ( {
            data: []
        } )
    }


    componentWillReceiveProps = ( nextProps: any ) => {
        let data = nextProps.data;
        console.log( { data } );
        if ( data != undefined ) {
            this.setState( {
                data: data[ 0 ]
            } )
        }
    }


    click_Clsoe = () => {
        this.setState( {
            data: []
        } )
    }


    render() {
        let { data } = this.state;
        return (
            <Modal style={ [ styles.modal, styles.modal4 ] } position={ "bottom" } isOpen={ data != undefined ? data.modalVisible : false } onClosed={ () => this.click_Clsoe() }>
                <View>
                    <View style={ { flexDirection: 'column', alignItems: "center", marginTop: 10, paddingBottom: 10, borderBottomColor: "#EFEFEF", borderBottomWidth: 1 } }>
                        <Text style={ { fontSize: 16 } }>{ data != undefined ? data.title : "" }</Text>
                        <Text note style={ { fontSize: 14 } }>{ data != undefined ? data.subTitle : "" }</Text>
                    </View>
                    <View>
                        <View style={ { flexDirection: "row", justifyContent: "center", backgroundColor: colors.appColor, height: 80, margin: 20, borderRadius: 10 } }>
                            <Button
                                transparent
                                style={ { alignSelf: "center", marginBottom: -10 } }
                                onPress={ () => this.props.click_Done() }>
                                <View style={ { alignSelf: "center", justifyContent: "center", alignItems: "center" } }>
                                    <ImageSVG
                                        style={ { width: 55, height: 55 } }
                                        source={
                                            svgIcon.bottomModel[ data != undefined ? data.svgIcon : "recreate" ]
                                        }
                                    />
                                    <Text style={ [ globalStyle.ffFiraSansBold, { fontSize: 12, color: "#ffffff" } ] }>{ data != undefined ? data.btnTitle : "" }</Text>
                                </View>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal >
        );
    }
}

const styles = StyleSheet.create( {
    //botom model
    modal: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modal4: {
        height: 180
    }
} );