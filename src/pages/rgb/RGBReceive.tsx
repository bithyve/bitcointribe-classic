import BottomSheet from '@gorhom/bottom-sheet'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { AccountType, NetworkType } from 'src/bitcoin/utilities/Interface'
import ErrorModalContents from 'src/components/ErrorModalContents'
import Toast from 'src/components/Toast'
import ModalContainer from 'src/components/home/ModalContainer'
import RGBServices from 'src/services/RGBServices'
import { setReceiveData } from 'src/store/actions/rgb'
import useAccountsState from 'src/utils/hooks/state-selectors/accounts/UseAccountsState'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'
import NavStyles from '../../common/Styles/NavStyles'
import CommonStyles from '../../common/Styles/Styles'
import { translations } from '../../common/content/LocContext'
import BottomInfoBox from '../../components/BottomInfoBox'
import CopyThisText from '../../components/CopyThisText'
import QRCode from '../../components/QRCode'

export default function RGBReceive( props ) {
  const common = translations[ 'common' ]
  const dispatch = useDispatch()
  const { isError, message, data } = useSelector( state => state.rgb.receiveAssets )
  const { averageTxFees, accounts } = useSelector( state => state.accounts )
  const [loading, setLoading] = useState(true)
  const [ requesting, setRequesting ] = useState( true )
  const [failedModal, setFailedModal] = useState(false);
  const [ErrorBottomSheet] = useState(React.createRef<BottomSheet>());
  const accountsState = useAccountsState()

  useEffect( () => {
    setTimeout(() => {
      init()
    }, 500);
  }, [] )

  const init= async ()=>{
    try {
      setLoading(true)
      const invoiceData = await RGBServices.receiveAsset()
      if (invoiceData.error) {
        if(invoiceData.error==='Insufficient sats for RGB'){
          setTimeout(()=>{
            setFailedModal(true);
           },2000)
        } else{
          Toast( invoiceData.error )
        } 
      } else {
      setLoading(false)
        dispatch(setReceiveData({
            message: '',
            loading: false,
            isError: false,
            data: invoiceData,
          }));
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleCreateUtxos = async () => {
    try {
      setLoading(true)
      let accountId = ''
      const accountType = RGBServices.NETWORK === NetworkType.TESTNET ? AccountType.TEST_ACCOUNT : AccountType.CHECKING_ACCOUNT_NATIVE_SEGWIT
      for (const id in accounts) {
        const account = accounts[id];
        if (account.type === accountType) {
          accountId = id;
          break;
        }
      }
      const account = accounts[accountId];
      const response = await RGBServices.createUtxos(account, averageTxFees[RGBServices.NETWORK])
      if(response.created) {
        init()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      props.navigation.goBack()
      Toast( `${error.message}` )
    }
  }

  const handleReceiveBitcoin=()=>{
    let accId = '';
    accountsState.accountShells.forEach(el=>{
      if(el && el.primarySubAccount.type === 'TEST_ACCOUNT'){
        accId = el.primarySubAccount.accountShellID
      }
    })
    if(accId){
      props.navigation.replace('AccountSettings',{
        accountShellID: accId
  } )
    }           
  }

  return (
    <View style={{
      flex: 1, backgroundColor: Colors.backgroundColor
    }}>
      <SafeAreaView style={{
        flex: 0
      }} />
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={() => { }}>
        <KeyboardAvoidingView
          style={{
            flex: 1
          }}
          behavior={Platform.OS == 'ios' ? 'padding' : ''}
          enabled
        >
          <View style={NavStyles.modalContainer}>
            <View style={CommonStyles.headerContainer}>
              <TouchableOpacity
                style={CommonStyles.headerLeftIconContainer}
                onPress={() => {
                  props.navigation.goBack()
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
            <Text style={styles.headerTitleText}>Receive</Text>
            {
              loading ? <ActivityIndicator style={{
                height: '70%'
              }} size="large" /> :
                <ScrollView>
                  <View style={styles.QRView}>
                    <QRCode title={'RGB Invoice'} value={data.invoice} size={hp( '27%' )} />
                  </View>

                  <CopyThisText
                    backgroundColor={Colors.white}
                    text={data.invoice}
                    toastText='Address Copied Successfully'
                  />

                </ScrollView>
            }
            <View style={{
              marginBottom: hp( '2.5%' )
            }}>
              <BottomInfoBox
                backgroundColor={Colors.white}
                title={common.note}
                infoText={'Blinded UTXO in this invoice will expire after 24 hours '}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <ModalContainer
        onBackground={() => setFailedModal(false)}
        visible={failedModal}
        closeBottomSheet={() => {}}
      >
        <ErrorModalContents
          modalRef={ErrorBottomSheet}
          title={'Insufficient Bitcoins'}
          info={
            'We encountered an issue: Insufficient Bitcoins This means Your wallet’s Bitcoin balance is too low. Please deposit more Bitcoins or modify your transaction.'
          }
          note={'Note:'}
          noteNextLine={'Your total asset balance is too low for this action. Please add more Bitcoin to your account.'}
          proceedButtonText={'Create UTXOs'}
          isIgnoreButton={true}
          cancelButtonText={'Cancel'}
          onPressIgnore={() => {
            setFailedModal(false);
            props.navigation.goBack()
          }}
          onPressProceed={() => {
            setFailedModal(false);
            setTimeout(()=>{
              handleCreateUtxos()
            },100)
          }}
          isBottomImage={true}
          bottomImage={require('../../assets/images/icons/errorImage.png')}
          type={'small'}
        />
      </ModalContainer>
    </View>
  )
}

const styles = StyleSheet.create( {
  textBoxView: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    height: 50,
    marginBottom: hp( '1%' ),
  },
  textBoxImage: {
    width: wp( '6%' ),
    height: wp( '6%' ),
    resizeMode: 'contain',
  },
  amountInputImage: {
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.borderColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textBox: {
    flex: 1,
    paddingLeft: 20,
    color: Colors.textColorGrey,
    fontFamily: Fonts.Medium,
    fontSize: RFValue( 13 ),
  },
  QRView: {
    height: hp( '30%' ),
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    marginTop: hp( '3%' )
  },
  titleText: {
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Regular,
    color: Colors.textColorGrey,
  },
  text: {
    justifyContent: 'center', marginRight: 10, marginLeft: 10, flex: 1
  },
  knowMoreTouchable: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 12 ),
    marginLeft: 'auto',
  },
  selectedView: {
    marginLeft: wp( '5%' ),
    marginRight: wp( '5%' ),
    marginBottom: hp( 4 ),
    marginTop: hp( 2 ),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  forwardIcon: {
    marginLeft: wp( '3%' ),
    marginRight: wp( '3%' ),
    alignSelf: 'center',
  },
  text1: {
    marginLeft: wp( '5%' ),
    marginRight: wp( '5%' ),
    marginBottom: wp( '5%' )
  },
  headerTitleText: {
    color: Colors.blue,
    fontSize: RFValue( 20 ),
    marginLeft: 20,
    // marginTop: hp( '10%' ),
    fontFamily: Fonts.Regular,
  },
  headerInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 12 ),
    marginLeft: 20,
    fontFamily: Fonts.Regular,
  },
} )
