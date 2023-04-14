import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen'
import Colors from '../common/Colors'
import Fonts from '../common/Fonts'
import CommonStyles from '../common/Styles/Styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { RFValue } from 'react-native-responsive-fontsize'
import { LocalizationContext } from '../common/content/LocContext'
import HeaderTitle1 from '../components/HeaderTitle1'
import CoveredQRCodeScanner from '../components/qr-code-scanning/CoveredQRCodeScanner'
import BottomInfoBox from '../components/BottomInfoBox'
import LndConnectUtils from '../utils/ln/LndConnectUtils'
import Toast from '../components/Toast'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { recoverWalletUsingMnemonic } from '../store/actions/BHR'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import * as bip39 from 'bip39'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { completedWalletSetup } from '../store/actions/setupAndAuth'
import { setVersion } from '../store/actions/versionHistory'
import { Wallet } from '../bitcoin/utilities/Interface'

const styles = StyleSheet.create( {
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.LIGHT_BACKGROUND,
  },
  buttonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
  buttonView: {
    height: wp( '12%' ),
    paddingHorizontal: wp( 2 ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    // shadowColor: Colors.shadowBlue,
    // shadowOpacity: 1,
    // shadowOffset: {
    //   width: 15, height: 15
    // },
    backgroundColor: Colors.blue,
    marginHorizontal: wp( 4 ),
    marginVertical: hp( '2%' ),
  },
  icArrow: {
    marginLeft: wp( '3%' ),
    marginRight: wp( '3%' ),
    alignSelf: 'center',
  },
  textValue: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 13 ),
    color: Colors.THEAM_INFO_TEXT_COLOR,
    marginLeft: wp( '3%' ),
  },
  textHelpUs: {
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue( 12 ),
    color: Colors.THEAM_TEXT_COLOR,
    marginLeft: wp( '3%' ),
  },
  textHelpUsSub: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 12 ),
    color: Colors.THEAM_INFO_TEXT_COLOR,
    marginLeft: wp( '3%' ),
    marginTop: wp( '1%' ),
  },
  addModalView: {
    backgroundColor: Colors.gray7,
    paddingVertical: 15,
    paddingHorizontal: widthPercentageToDP( 1 ),
    marginHorizontal: widthPercentageToDP( 5 ),
    // flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: heightPercentageToDP( '5' ),
    alignSelf: 'center',
    borderRadius: widthPercentageToDP( '2' ),
    marginBottom: heightPercentageToDP( '1.2' ),
    shadowOpacity: 0.05,
    // shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 10, height: 10
    },
    shadowRadius: 6,
    elevation: 6,
  },
} )


export default function CreateKeeperScreen( { navigation } ) {
  const { translations } = useContext( LocalizationContext )
  const strings = translations[ 'lightningAccount' ]
  const common = translations[ 'common' ]
  const [ knowMore, setKnowMore ] = useState( true )
  const [ showLoader, setShowLoader ] = useState( false )
  const dispatch = useDispatch()
  const restoreSeedData = useSelector( ( state ) => state.bhr.loading.restoreSeedData )
  const wallet: Wallet = useSelector( ( state: RootStateOrAny ) => state.storage.wallet )
  const [ mnemonic, setMnemonic ] = useState( null )

  useEffect( () => {
    setShowLoader( false )
    if ( wallet ) {
      dispatch( completedWalletSetup() )
      AsyncStorage.setItem( 'walletRecovered', 'true' )
      dispatch( setVersion( 'Restored' ) )
      navigation.navigate( 'HomeNav' )
    }
  }, [ wallet ] )

  useEffect( () => {
    if( restoreSeedData == 'restoreSeedDataFailed' ){
      setShowLoader( false )
      navigation.navigate( 'NewWalletName', {
        mnemonic,
      } )
    }
  }, [ restoreSeedData ] )

  async function handleBarcodeRecognized( { data: scannedData }: { data: string } ) {
    console.log( 'skkk data', scannedData )
    if( scannedData != null && scannedData.length > 0 ){
      setShowLoader( true )
      let mnemonicData = scannedData.toString()
      mnemonicData = mnemonicData.replace( /,/g, ' ' )
      setMnemonic( mnemonicData )
      setTimeout( () => {
        // const isValidMnemonic = bip39.validateMnemonic( mnemonic )
        // if ( !isValidMnemonic ) {
        //   setShowLoader( false )
        //   Toast( 'Invalid QR' )
        //   return
        // }
        setTimeout( () => {
          dispatch( recoverWalletUsingMnemonic( mnemonic ) )
        }, 500 )
      }, 1000 )
    } else {
      const {
        host,
        port,
        macaroonHex
      } = LndConnectUtils.processLndConnectUrl( scannedData )
      if( host &&  macaroonHex ) {
        navigation.navigate( 'EnterNodeConfig', {
          node: {
            host: host, port: port, macaroonHex: macaroonHex
          },
        } )
      } else {
        Toast( 'Invalid QR' )
      }
    }
  }

  return (

    <SafeAreaView style={styles.viewContainer}>
      {
        showLoader &&
        <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          <ActivityIndicator size="large" color={Colors.babyGray} />
        </View>
      }
      <StatusBar backgroundColor={Colors.backgroundColor} barStyle="dark-content" />
      <View style={[ CommonStyles.headerContainer, {
        backgroundColor: Colors.backgroundColor,
        marginRight: wp( 4 )
      } ]}>
        <TouchableOpacity
          style={CommonStyles.headerLeftIconContainer}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <View style={CommonStyles.headerLeftIconInnerContainer}>
            <FontAwesome
              name="long-arrow-left"
              color={Colors.homepageButtonColor}
              size={17}
            />
          </View>
        </TouchableOpacity>

      </View>
      <ScrollView
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'>
        <HeaderTitle1
          firstLineTitle={'Create with Keeper'}
          secondLineTitle={'Scan QR'}
          infoTextNormal={''}
          infoTextBold={''}
          infoTextNormal1={''}
          step={''}
        />

        <CoveredQRCodeScanner
          onCodeScanned={handleBarcodeRecognized}
          containerStyle={{
            marginBottom: 16
          }}
        />
        <View style={{
          flex:1
        }}/>
        <View
          style={styles.addModalView}
        >
          <Text
            style={styles.textHelpUs}
          >
            {'Note'}
          </Text>
          <Text
            style={styles.textHelpUsSub} numberOfLines={2}
          >
            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
          </Text>
        </View>
      </ScrollView>


    </SafeAreaView>
  )
}
