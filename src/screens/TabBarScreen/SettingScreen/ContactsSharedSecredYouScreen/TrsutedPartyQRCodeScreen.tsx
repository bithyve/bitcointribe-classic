import React from "react";
import { StyleSheet, ImageBackground, View, ScrollView, Platform, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Item,
    Input,
    Button,
    Left,
    Right,
    Body,
    Text,
    Icon,
    List,
    ListItem,
    Thumbnail
} from "native-base";
import { SvgIcon } from "@up-shared/components";
import IconFontAwe from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Contacts from 'react-native-contacts';
import { Avatar, SearchBar } from 'react-native-elements';
// import QRCode from "react-native-qrcode";
import QRCode from 'react-native-qrcode-svg';

//TODO: Custome Pages
import CustomeStatusBar from "HexaWallet/src/app/custcompontes/CustomeStatusBar/CustomeStatusBar";


//TODO: Custome StyleSheet Files       
import globalStyle from "HexaWallet/src/app/manager/Global/StyleSheet/Style";

//TODO: Custome Object
import { colors, images, localDB } from "HexaWallet/src/app/constants/Constants";
import renderIf from "HexaWallet/src/app/constants/validation/renderIf";
var utils = require( "HexaWallet/src/app/constants/Utils" );

//TODO: Bitcoin Files
import S3Service from "HexaWallet/src/bitcoin/services/sss/S3Service";

export default class TrsutedPartyQRCodeScreen extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
        this.state = ( {
            data: [],
            flag_Loading: false,
            msg_Loading: "Loading"
        } )
    }


    async componentWillMount() {
        let data = this.props.navigation.getParam( "data" );
        console.log( { data } );
        let walletDetails = utils.getWalletDetails();
        let qrCodeData = {};
        qrCodeData.type = "SSS Restore QR";
        qrCodeData.wn = walletDetails.walletType;
        qrCodeData.data = data.key;
        console.log( { qrCodeData } );
        this.setState( {
            data: JSON.stringify( qrCodeData ).toString()
        } )
    }





    goBack() {
        const { navigation } = this.props;
        navigation.pop();
        //  navigation.state.params.onSelect( { selected: true } );
    }





    render() {
        return (
            <Container>
                <CustomeStatusBar backgroundColor={ colors.white } flagShowStatusBar={ false } barStyle="dark-content" />
                <SafeAreaView style={ styles.container }>
                    <ImageBackground source={ images.WalletSetupScreen.WalletScreen.backgoundImage } style={ styles.container }>
                        <View style={ { marginLeft: 10 } }>
                            <Button
                                transparent
                                hitSlop={{top: 5, bottom: 8, left: 10, right: 15}}
                                onPress={ () => this.goBack() }
                            >
                                <SvgIcon name="icon_back" size={ Platform.OS == "ios" ? 25 : 20 } color="#000000" />
                                <Text style={ [ globalStyle.ffFiraSansMedium, { color: "#000000", alignSelf: "center", fontSize: Platform.OS == "ios" ? 25 : 20, marginLeft: 0 } ] }>Share via QR</Text>
                            </Button>
                        </View>
                        <KeyboardAwareScrollView
                            enableOnAndroid
                            extraScrollHeight={ 40 }
                        >
                            <View style={ { flex: 0.1, margin: 20 } }>
                                <Text note style={ [ globalStyle.ffFiraSansMedium, { textAlign: "center" } ] }>Present this QR code to contact that trusted you, this will help that contact to restore wallet. </Text>
                            </View>
                            <View style={ { flex: 1, alignItems: "center" } }>
                                <QRCode
                                    value={ this.state.data }
                                    size={ Dimensions.get( 'screen' ).width - 50 }
                                />
                            </View>
                            <View style={ { flex: 0.5, alignItems: "center" } }>
                                <Text note style={ [ globalStyle.ffFiraSansMedium, { textAlign: "center", margin: 10 } ] }>Do not share this QR code with anyone other than that contact, whom you want to share the secret with</Text>
                            </View>
                        </KeyboardAwareScrollView>

                    </ImageBackground>
                </SafeAreaView>
            </Container >
        );
    }
}

const primaryColor = colors.appColor;
const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    }
} );
