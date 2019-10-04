import React from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import {
    Container
} from "native-base";


//TODO: Custome Pages
import { CustomeStatusBar } from "hexaCustStatusBar";
import { ViewBackupWalletMnemonicScrolling } from "hexaCustView";
import { HeaderTitle } from "hexaCustHeader";


import BackupWalletMnemonic6Screen from "./BackupWalletMnemonic6Screen";
import BackupWalletMnemonic7to12Screen from "./BackupWalletMnemonic7to12Screen";
import BackupWalletMnemonic13to18Screen from "./BackupWalletMnemonic13to18Screen";
import BackupWalletMnemonic19to24Screen from "./BackupWalletMnemonic19to24Screen";

//TODO: Custome Object  
import { colors, images } from "hexaConstants";

//TODO: Common Funciton
var comFunDBRead = require( "hexaCommonDBReadData" );

export default class BackupWalletMnemonic extends React.Component<any, any> {

    constructor ( props: any ) {
        super( props );
        this.state = ( {
            arr_BackupWalletMnemonic6Screen: [],
            arr_BackupWalletMnemonic7to12Screen: [],
            arr_BackupWalletMnemonic13to18Screen: [],
            arr_BackupWalletMnemonic19to24Screen: []
        } )
    }

    async componentWillMount() {
        var resultWallet = await comFunDBRead.readTblWallet();
        let mnemonic = resultWallet.mnemonic;
        let arrMnemonic = mnemonic.split( ' ' );
        // let mnemonicLength = mnemonic.match( /\w+/g ).length;
        let words1to6 = [];
        let words7to12 = [];
        let words13to18 = [];
        let words19to24 = [];
        for ( let i = 0; i < arrMnemonic.length; i++ ) {
            let data = arrMnemonic[ i ];
            if ( i < 6 ) {
                words1to6.push( { index: i + 1, title: data } )
            } else if ( i >= 6 && i < 12 ) {
                words7to12.push( { index: i + 1, title: data } )
            } else if ( i >= 12 && i < 18 ) {
                words13to18.push( { index: i + 1, title: data } )
            } else {
                words19to24.push( { index: i + 1, title: data } )
            }
        }
        this.setState( {
            arr_BackupWalletMnemonic6Screen: words1to6,
            arr_BackupWalletMnemonic7to12Screen: words7to12,
            arr_BackupWalletMnemonic13to18Screen: words13to18,
            arr_BackupWalletMnemonic19to24Screen: words19to24
        } );
    }


    click_Next() {
        this.props.navigation.push( "BackupWalletMnemonicConfirmMnemonicScreen" );
    }

    render() {
        return (
            <Container>
                <ImageBackground source={ images.WalletSetupScreen.WalletScreen.backgoundImage } style={ styles.container }>
                    <HeaderTitle title="Backup Wallet Mnemonic"
                        pop={ () => this.props.navigation.pop() }
                    />
                    <SafeAreaView style={ [ styles.container, { backgroundColor: 'transparent' } ] }>
                        <ViewBackupWalletMnemonicScrolling  >
                            {/* First screen */ }
                            <BackupWalletMnemonic6Screen data={ this.state.arr_BackupWalletMnemonic6Screen } />
                            {/* Second screen */ }
                            <BackupWalletMnemonic7to12Screen data={ this.state.arr_BackupWalletMnemonic7to12Screen } />
                            {/* Third screen */ }
                            <BackupWalletMnemonic13to18Screen data={ this.state.arr_BackupWalletMnemonic13to18Screen } />
                            {/* Fourth screen */ }
                            <BackupWalletMnemonic19to24Screen data={ this.state.arr_BackupWalletMnemonic19to24Screen } click_Next={ () => this.click_Next() } />
                        </ViewBackupWalletMnemonicScrolling>
                    </SafeAreaView>
                </ImageBackground>
                <CustomeStatusBar backgroundColor={ colors.white } hidden={ false } barStyle="dark-content" />
            </Container >
        );
    }
}

const styles = StyleSheet.create( {
    container: {
        flex: 1
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
    }
} );
