import React from "react";
import { StyleSheet, ImageBackground, View, Platform, SafeAreaView, FlatList, TouchableOpacity, Alert, Clipboard } from "react-native";
import {
    Container,
    Item,
    Input,
    Button,
    Text,
    Icon,
    Textarea,
    Left,
    Right,
    List, ListItem,
} from "native-base";
import { SvgIcon } from "@up-shared/components";
import IconFontAwe from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from 'react-native-simple-toast';
import { RkCard } from "react-native-ui-kitten";

//TODO: Custome Pages
import Loader from "HexaWallet/src/app/custcompontes/Loader/ModelLoader";
import CustomeStatusBar from "HexaWallet/src/app/custcompontes/CustomeStatusBar/CustomeStatusBar";
import FullLinearGradientButton from "HexaWallet/src/app/custcompontes/LinearGradient/Buttons/FullLinearGradientButton";

//TODO: Custome StyleSheet Files       
import globalStyle from "HexaWallet/src/app/manager/Global/StyleSheet/Style";

//TODO: Custome Object
import { colors, images, localDB } from "HexaWallet/src/app/constants/Constants";
import renderIf from "HexaWallet/src/app/constants/validation/renderIf";
var dbOpration = require( "HexaWallet/src/app/manager/database/DBOpration" );
var utils = require( "HexaWallet/src/app/constants/Utils" );

//TODO: Common Funciton
var comFunDBRead = require( "HexaWallet/src/app/manager/CommonFunction/CommonDBReadData" );

//TODO: Bitcoin Files
import S3Service from "HexaWallet/src/bitcoin/services/sss/S3Service";

export default class MnemonicShowScreen extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
        this.state = ( {
            walletDetails: [],
            arr_AccountDetails: [],
            arr_ListItem: [ {
                title: "Backup Wallet Mnemonic"
            }
            ]
        } )
    }

    async componentWillMount() {
        let walletDetails = await comFunDBRead.readTblWallet();
        let resAccountDetails = await comFunDBRead.readTblAccount();
        console.log( { walletDetails, resAccountDetails } );
        this.setState( {
            walletDetails,
            arr_AccountDetails: resAccountDetails[ 0 ]
        } );
    }

    //TODO: list on click
    click_MenuItem( item: any ) {
        console.log( { item } );
        let title = item.title;
        if ( title == "Backup Wallet Mnemonic" ) {
            this.props.navigation.push( "BackupWalletMnemonicScreen" );
        }
    }

    render() {
        let walletDetails = this.state.walletDetails;
        let accountDetails = this.state.arr_AccountDetails;
        return (
            <Container>
                <CustomeStatusBar backgroundColor={ colors.white } flagShowStatusBar={ false } barStyle="dark-content" />
                <SafeAreaView style={ styles.container }>
                    <ImageBackground source={ images.WalletSetupScreen.WalletScreen.backgoundImage } style={ styles.container }>
                        <View style={ { marginLeft: 10 } }>
                            <Button
                                transparent
                                hitSlop={ { top: 5, bottom: 8, left: 10, right: 15 } }
                                onPress={ () =>
                                    this.props.navigation.pop() }
                            >
                                <SvgIcon name="icon_back" size={ Platform.OS == "ios" ? 25 : 20 } color="#000000" />
                                <Text style={ [ globalStyle.ffFiraSansMedium, { color: "#000000", alignSelf: "center", fontSize: Platform.OS == "ios" ? 20 : 17, marginLeft: 0 } ] }>Mnemonic</Text>
                            </Button>
                        </View>
                        <KeyboardAwareScrollView
                            enableOnAndroid
                            extraScrollHeight={ 40 }
                            contentContainerStyle={ { flexGrow: 1, } }
                        >
                            <View style={ { flex: 0.2, borderRadius: 10, margin: 8 } }>
                                <FlatList
                                    data={ this.state.arr_ListItem }
                                    showsVerticalScrollIndicator={ false }
                                    scrollEnabled={ false }
                                    renderItem={ ( { item } ) => (
                                        <TouchableOpacity
                                            onPress={ () => this.click_MenuItem( item ) }
                                        >
                                            <RkCard
                                                rkType="shadowed"
                                                style={ {
                                                    flex: 1,
                                                    borderRadius: 8,
                                                    marginLeft: 8,
                                                    marginRight: 8,
                                                    marginBottom: 4,
                                                } }
                                            >
                                                <View
                                                    rkCardHeader
                                                    style={ {
                                                        flex: 1,
                                                    } }
                                                >
                                                    <View style={ { flex: 1, flexDirection: "column" } }>
                                                        <Text
                                                            style={ [ globalStyle.ffFiraSansMedium, { fontSize: 14 } ] }
                                                        >
                                                            { item.title }
                                                        </Text>

                                                    </View>
                                                    <View style={ { flex: 0.2, justifyContent: "center", alignItems: "flex-end" } }>
                                                        <SvgIcon
                                                            name="icon_forword"
                                                            color="#BABABA"
                                                            size={ 20 }
                                                        />
                                                    </View>
                                                </View>
                                            </RkCard>
                                        </TouchableOpacity>
                                    ) }
                                    keyExtractor={ ( item, index ) => index }
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </ImageBackground>
                </SafeAreaView>
                <Loader loading={ this.state.flag_Loading } color={ colors.appColor } size={ 30 } message="Loading" />
            </Container >
        );
    }
}

const primaryColor = colors.appColor;
const darkGrey = "#bdc3c7";
const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    viewPagination: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 30,
        marginRight: 30
    },
    viewInputFiled: {
        flex: 3,
        alignItems: "center",
        margin: 10
    },
    itemInputWalletName: {
        borderWidth: 0,
        borderRadius: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        backgroundColor: '#FFFFFF'

    },
    viewProcedBtn: {
        flex: 2,
        justifyContent: "flex-end"
    },
    btnNext: {
        position: "absolute",
        bottom: 10,
        width: "100%"

    },
    //Grid View Selected
    gridSelectedList: {
        flex: 1
    },
    modal: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modal4: {
        height: 180
    }
} );
