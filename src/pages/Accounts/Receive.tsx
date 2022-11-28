import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFValue } from 'react-native-responsive-fontsize'
import NavStyles from '../../common/Styles/NavStyles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BottomInfoBox from '../../components/BottomInfoBox'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import BottomSheet from 'reanimated-bottom-sheet'
import { hp as hp1, wp as wp1 } from '../../common/data/responsiveness/responsive'
import {
  setReceiveHelper,
  setSavingWarning,
} from '../../store/actions/preferences'
import { getAccountIconByShell, getAccountTitleByShell } from './Send/utils'
import KnowMoreButton from '../../components/KnowMoreButton'
import QRCode from '../../components/QRCode'
import CopyThisText from '../../components/CopyThisText'
import ReceiveAmountContent from '../../components/home/ReceiveAmountContent'
import defaultBottomSheetConfigs from '../../common/configs/BottomSheetConfigs'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { SATOSHIS_IN_BTC } from '../../common/constants/Bitcoin'
import SmallHeaderModal from '../../components/SmallHeaderModal'
import ReceiveHelpContents from '../../components/Helper/ReceiveHelpContents'
import idx from 'idx'
import TwoFASetupWarningModal from './TwoFASetupWarningModal'
import DeviceInfo from 'react-native-device-info'
import AccountShell from '../../common/data/models/AccountShell'
import { Account, AccountType, LevelData, LevelHealthInterface } from '../../bitcoin/utilities/Interface'
import AccountUtilities from '../../bitcoin/utilities/accounts/AccountUtilities'
import useAccountByAccountShell from '../../utils/hooks/state-selectors/accounts/UseAccountByAccountShell'
import ModalContainer from '../../components/home/ModalContainer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getNextFreeAddress } from '../../store/sagas/accounts'
import { translations } from '../../common/content/LocContext'
import ErrorModalContents from '../../components/ErrorModalContents'
import { onPressKeeper } from '../../store/actions/BHR'
import NewSwitch from '../../components/NewSwitch'
import CurrencyKind from '../../common/data/enums/CurrencyKind'
import { UsNumberFormat } from '../../common/utilities'
import { AccountsState } from '../../store/reducers/accounts'
import useCurrencyCode from '../../utils/hooks/state-selectors/UseCurrencyCode'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconBitcoin from  '../../assets/images/svgs/icon_bitcoin1.svg'
import useActiveAccountShells from '../../utils/hooks/state-selectors/accounts/UseActiveAccountShells'
import getAvatarForSubAccount from '../../utils/accounts/GetAvatarForSubAccountKind'

export default function Receive( props ) {
  const dispatch = useDispatch()
  const [ receiveHelper, showReceiveHelper ] = useState( false )
  const [ receiveModal, setReceiveModal ] = useState( false )
  const [ backupReminder, setBackupReminder ] = useState( false )
  const [ isReceiveHelperDone, setIsReceiveHelperDone ] = useState( true )
  const isReceiveHelperDoneValue = useSelector( ( state ) =>
    idx( state, ( _ ) => _.preferences.isReceiveHelperDoneValue ),
  )
  const savingWarning = useSelector( ( state ) =>
    idx( state, ( _ ) => _.preferences.savingWarning ),
  )
  const strings = translations[ 'accounts' ]
  const common = translations[ 'common' ]
  const [ SecureReceiveWarningBottomSheet ] = useState( React.createRef() )
  const [ amount, setAmount ] = useState( '' )
  const [ accountShell, setAccountShell ] = useState<AccountShell>( props.navigation.getParam( 'accountShell' ) )
  const account: Account = useAccountByAccountShell( accountShell )
  const [ receivingAddress, setReceivingAddress ] = useState( null )
  const [ paymentURI, setPaymentURI ] = useState( null )
  const levelData: LevelData[] = useSelector( ( state ) => state.bhr.levelData )
  const levelHealth: LevelHealthInterface[] = useSelector( ( state ) => state.bhr.levelHealth )
  const navigationObj: any = useSelector( ( state ) => state.bhr.navigationObj )
  const [ onKeeperButtonClick, setOnKeeperButtonClick ] = useState( false )

  const defaultKeeperObj: {
    shareType: string
    updatedAt: number;
    status: string
    shareId: string
    reshareVersion: number;
    name?: string
    data?: any;
    channelKey?: string
  } = {
    shareType: '',
    updatedAt: 0,
    status: 'notAccessible',
    shareId: '',
    reshareVersion: 0,
    name: '',
    data: {
    },
    channelKey: ''
  }
  const [ selectedKeeper, setSelectedKeeper ]: [{
    shareType: string;
    updatedAt: number;
    status: string;
    shareId: string;
    reshareVersion: number;
    name?: string;
    data?: any;
    channelKey?: string;
  }, any] = useState( defaultKeeperObj )

  useEffect( () => {
    if ( navigationObj.selectedKeeper && onKeeperButtonClick ) {
      setSelectedKeeper( navigationObj.selectedKeeper )
      const navigationParams = {
        selectedTitle: navigationObj.selectedKeeper.name,
        SelectedRecoveryKeyNumber: 1,
        selectedKeeper: navigationObj.selectedKeeper,
        selectedLevelId: levelData[ 0 ].id
      }
      props.navigation.navigate( 'SeedBackupHistory', navigationParams )
    }
  }, [ navigationObj ] )

  const {
    present: presentBottomSheet,
    dismiss: dismissBottomSheet,
  } = useBottomSheetModal()

  const onPressTouchableWrapper = () => {
    showReceiveHelper( false )
  }

  const onPressBack = () => {
    props.navigation.goBack()
  }

  const onPressKnowMore = () => {
    dispatch( setReceiveHelper( true ) )
    showReceiveHelper( true )
  }

  const checkNShowHelperModal = async () => {
    const isReceiveHelperDone1 = isReceiveHelperDoneValue
    if ( !isReceiveHelperDone1 ) {
      await AsyncStorage.getItem( 'isReceiveHelperDone' )
    }
    if ( !isReceiveHelperDone1 && accountShell.primarySubAccount.type == AccountType.TEST_ACCOUNT ) {
      dispatch( setReceiveHelper( true ) )
      //await AsyncStorage.setItem('isReceiveHelperDone', 'true');
      setTimeout( () => {
        setIsReceiveHelperDone( true )
      }, 10 )
      setTimeout( () => {
        showReceiveHelper( true )
      }, 1000 )
    } else {
      setTimeout( () => {
        setIsReceiveHelperDone( false )
      }, 10 )
    }
  }

  useEffect( () => {
    checkNShowHelperModal()
    //(async () => {
    if ( accountShell.primarySubAccount.type == AccountType.SAVINGS_ACCOUNT ) {
      if ( !savingWarning ) {
        //await AsyncStorage.getItem('savingsWarning')
        // TODO: integrate w/ any of the PDF's health (if it's good then we don't require the warning modal)
        if ( SecureReceiveWarningBottomSheet.current )
          ( SecureReceiveWarningBottomSheet as any ).current.snapTo( 1 )
        dispatch( setSavingWarning( true ) )
        //await AsyncStorage.setItem('savingsWarning', 'true');
      }
    }

    if ( ( levelData[ 0 ].keeper1.status === 'notSetup' ) ||
      ( levelData[ 0 ].keeper1ButtonText?.toLowerCase() != 'seed' &&
        levelData[ 0 ].keeper1ButtonText?.toLowerCase() != 'write down seed-words' ) ) {
      setTimeout( () => {
        setBackupReminder( true )
      }, 500 )
    }
    //})();
  }, [] )

  const onPressOkOf2FASetupWarning = () => {
    if ( SecureReceiveWarningBottomSheet.current )
      ( SecureReceiveWarningBottomSheet as any ).current.snapTo( 0 )
  }

  useEffect( () => {
    return () => {
      dismissBottomSheet()
    }
  }, [ props.navigation ] )

  const showReceiveAmountBottomSheet = useCallback( () => {
    return (

      <ReceiveAmountContent
        title={'Enter Amount'}
        message={'to receive sats into the selected account'}
        onPressConfirm={( amount ) => {
          setAmount( amount )
          setReceiveModal( false )
        }}
        selectedAmount={amount}
        onPressBack={() => {
          setReceiveModal( false )
        }
        }
      />
    )
  }, [ amount ] )


  useEffect( () => {
    const receivingAddress = getNextFreeAddress( dispatch, account )
    setReceivingAddress( receivingAddress )
  }, [] )

  useEffect( () => {
    if ( amount ) {
      const newPaymentURI = AccountUtilities.generatePaymentURI( receivingAddress, {
        amount: parseInt( amount ) / SATOSHIS_IN_BTC,
      } ).paymentURI
      setPaymentURI( newPaymentURI )
    } else if ( paymentURI ) setPaymentURI( null )
  }, [ amount ] )

  const accountsState: AccountsState = useSelector( ( state ) => state.accounts )

  const currencyCode = useSelector( ( state ) => state.preferences.currencyCode )

  const currencyKind: CurrencyKind = useSelector(
    ( state ) => state.preferences.giftCurrencyKind || CurrencyKind.BITCOIN
  )

  const prefersBitcoin = useMemo( () => {
    return currencyKind === CurrencyKind.BITCOIN
  }, [ currencyKind ] )

  const fiatCurrencyCode = useCurrencyCode()

  const [ accountListModal, setAccountListModal ] = useState( false )

  const activeAccounts = useActiveAccountShells().filter(
    ( shell ) => shell?.primarySubAccount.type !== AccountType.LIGHTNING_ACCOUNT
  )

  const renderAccountList = () => {
    return (
      <ScrollView
        style={{
          height: 'auto',
        }}
      >
        {activeAccounts.map( ( item, index ) => {
          if (
            [ AccountType.TEST_ACCOUNT, AccountType.SWAN_ACCOUNT ].includes(
              item.primarySubAccount.type
            ) ||
            !item.primarySubAccount.isUsable ||
            item.primarySubAccount.isTFAEnabled
          )
            return
          return (
            <View
              key={index}
              style={{
                backgroundColor: Colors.white,
              }}
            >
              {accountElement( item, () => {
                setAccountShell( item )
                setAccountListModal( false )
              } )}
            </View>
          )
        } )}
      </ScrollView>
    )
  }

  const accountElement = (
    item,
    onPressCallBack,
    activeOpacity = 0,
    width = '90%',
  ) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.accountSelectionView,
          width: width,
        }}
        onPress={() => onPressCallBack()}
        activeOpacity={activeOpacity}
      >
        <View
          style={{
            borderRadius: wp( 2 ),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: hp1( 10 ),
              paddingHorizontal: wp1( 2 ),
              alignItems: 'center',
              backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                width: wp1( 38 ),
                height: '100%',
                marginTop: hp1( 30 ),
                marginRight: wp1( 11 ),
              }}
            >
              {getAvatarForSubAccount( item.primarySubAccount, false, true )}
            </View>
            <View
              style={{
                marginHorizontal: wp1( 3 ),
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: RFValue( 14 ),
                  fontFamily: Fonts.RobotoSlabRegular,
                }}
              >
                To {item.primarySubAccount.customDisplayName ??
                  item.primarySubAccount.defaultTitle}
              </Text>
              <Text style={styles.availableToSpendText}>
                {'Available '}
                <Text style={styles.balanceText}>
                  {prefersBitcoin
                    ? UsNumberFormat(
                      item.primarySubAccount?.balances?.confirmed
                    )
                    : accountsState.exchangeRates &&
                      accountsState.exchangeRates[ currencyCode ]
                      ? (
                        ( item.primarySubAccount?.balances?.confirmed /
                          SATOSHIS_IN_BTC ) *
                        accountsState.exchangeRates[ currencyCode ].last
                      ).toFixed( 2 )
                      : 0}
                </Text>
                <Text>{prefersBitcoin ? ' sats' : ` ${fiatCurrencyCode}`}</Text>
              </Text>
            </View>
            {activeOpacity === 0 && (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="gray"
                style={{
                  alignSelf: 'center',
                }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{
      flex: 1
    }}>
      <SafeAreaView style={{
        backgroundColor:Colors.blue
      }} />
      <StatusBar backgroundColor={Colors.blue} barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={() => onPressTouchableWrapper()}>
        <KeyboardAvoidingView
          style={{
            flex: 1
          }}
          behavior={Platform.OS == 'ios' ? 'padding' : ''}
          enabled
        >
          <View style={NavStyles.modalContainer}>
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: Colors.blue,
              borderBottomLeftRadius: wp1( 25 ),
              paddingHorizontal: wp1( 30 ),
              height: hp1( 100 )
            }}>
              <View
                style={{
                  flexDirection: 'row', alignItems: 'stretch',
                }}
              >
                <TouchableOpacity
                  onPress={() => onPressBack()}
                  style={{
                    marginRight: wp1( 31 ),
                    justifyContent: 'center', alignItems:'center'
                  }}
                >
                  <FontAwesome
                    name="chevron-left"
                    color={Colors.white}
                    size={17}
                  />
                </TouchableOpacity>
                <View style={{
                  marginLeft: wp( '2.5%' ),
                  justifyContent: 'center',
                  flex: 1
                }}>
                  <Text style={{
                    ...NavStyles.modalHeaderTitleText, color: Colors.white
                  }}>{common.receive}</Text>
                </View>
                <NewSwitch />
              </View>
            </View>
            <ScrollView>
              {accountElement( accountShell, () =>
                setAccountListModal( !accountListModal )
              )}

              <View style={styles.QRView}>
                <QRCode title={getAccountTitleByShell( accountShell ) === 'Test Account' ? 'Testnet address' : 'Bitcoin address'} value={paymentURI ? paymentURI : receivingAddress ? receivingAddress : 'null'} size={hp1( 230 )} />
              </View>

              <CopyThisText
                backgroundColor={Colors.white}
                text={paymentURI ? paymentURI : receivingAddress}
              />

              <AppBottomSheetTouchableWrapper
                onPress={() => { setReceiveModal( true ) }}
                style={styles.selectedView}
              >
                <View style={{
                  backgroundColor: '#FABC05',
                  width: wp1( 38 ),
                  height: wp1( 38 ),
                  borderRadius: wp1( 19 ),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <IconBitcoin />
                </View>
                <View
                  style={styles.text}
                >
                  <Text style={styles.titleText}>{amount ? amount : strings.Enteramount}</Text>
                  <Text style={styles.subText}>Enter amount to receive</Text>
                </View>

                <View style={{
                  marginLeft: 'auto'
                }}>
                  <Ionicons
                    name="chevron-forward"
                    color={'#C4C4C4'}
                    size={15}
                    style={styles.forwardIcon}
                  />
                </View>
              </AppBottomSheetTouchableWrapper>

              <View style={{
                marginBottom: hp1( 76 )
              }}>
                <BottomInfoBox
                  title={common.note}
                  infoText={strings.Itwouldtake}
                  backgroundColor={'transparent'}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <ModalContainer
        onBackground={() => setAccountListModal( false )}
        visible={accountListModal}
        closeBottomSheet={() => setAccountListModal( false )}
      >
        {renderAccountList()}
      </ModalContainer>

      <ModalContainer onBackground={() => showReceiveHelper( false )} visible={receiveHelper} closeBottomSheet={() => { showReceiveHelper( false ) }} >
        <ReceiveHelpContents
          titleClicked={() => {
            showReceiveHelper( false )
          }}
        />
      </ModalContainer>
      <ModalContainer onBackground={() => setReceiveModal( false )} visible={receiveModal} closeBottomSheet={() => { setReceiveModal( false ) }} >
        {showReceiveAmountBottomSheet()}
      </ModalContainer>
      <BottomSheet
        enabledInnerScrolling={true}
        enabledGestureInteraction={false}
        ref={SecureReceiveWarningBottomSheet as any}
        snapPoints={[
          -50,
          Platform.OS == 'ios' && DeviceInfo.hasNotch() ? hp( '35%' ) : hp( '40%' ),
        ]}
        renderContent={() => (
          <TwoFASetupWarningModal
            onPressOk={() => onPressOkOf2FASetupWarning()}
          //onPressManageBackup={() => props.navigation.replace('ManageBackup')}
          />
        )}
        renderHeader={() => (
          <SmallHeaderModal
            borderColor={Colors.borderColor}
            backgroundColor={Colors.white}
          // onPressHeader={() => {
          //   if (SecureReceiveWarningBottomSheet.current)
          //     (SecureReceiveWarningBottomSheet as any).current.snapTo(0);
          // }}
          />
        )}
      />
      <ModalContainer onBackground={() => setBackupReminder( false )} visible={backupReminder} closeBottomSheet={() => setBackupReminder( false )}>
        <ErrorModalContents
          title={'Wallet is not Backed-up'}
          info={'Backup your wallet to ensure security and easy wallet retrieval'}
          // note={errorMsg}
          onPressProceed={() => {
            setBackupReminder( false )
            // props.navigation.navigate( 'WalletBackupAlert' )
            if( levelData[ 0 ].keeper1ButtonText?.toLowerCase() == 'seed'||
              levelData[ 0 ].keeper1ButtonText?.toLowerCase() == 'write down seed-words' ){
              if ( ( levelHealth.length == 0 ) || ( levelHealth.length && levelHealth[ 0 ].levelInfo.length && levelHealth[ 0 ].levelInfo[ 0 ].status == 'notSetup' ) ) {
                const navigationParams = {
                  selectedTitle: navigationObj?.selectedKeeper?.name,
                  SelectedRecoveryKeyNumber: 1,
                  selectedKeeper: navigationObj?.selectedKeeper,
                  selectedLevelId: levelData[ 0 ].id
                }
                props.navigation.navigate( 'SeedBackupHistory', navigationParams )
              } else {
                setSelectedKeeper( levelData[ 0 ].keeper1 )
                dispatch( onPressKeeper( levelData[ 0 ], 1 ) )
                setOnKeeperButtonClick( true )
              }
            } else props.navigation.navigate( 'WalletBackupAlert' )
          }}
          onPressIgnore={() => setTimeout( () => { setBackupReminder( false ) }, 500 )}
          proceedButtonText={'Backup now'}
          cancelButtonText={'Later'}
          isIgnoreButton={true}
          isBottomImage={false}
          isBottomImageStyle={{
            width: wp( '35%' ),
            height: wp( '27%' ),
            marginLeft: 'auto',
            resizeMode: 'stretch',
            marginBottom: hp( '-3%' ),
          }}
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
    fontFamily: Fonts.FiraSansMedium,
    fontSize: RFValue( 13 ),
  },
  QRView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.RobotoSlabRegular,
    color: Colors.textColorGrey,
    lineHeight: RFValue( 16 ),
    letterSpacing: RFValue( 0.6 )
  },
  text: {
    justifyContent: 'center', marginRight: 10, marginLeft: 10, flex: 1
  },
  subText: {
    fontFamily: Fonts.RobotoSlabLight,
    fontSize: RFValue( 11 ),
    letterSpacing: RFValue( 0.22 ),
    lineHeight: RFValue( 13 ),
    paddingTop: hp1( 2 )
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
  accountSelectionView: {
    width: '90%',
    // shadowOpacity: 0.06,
    // shadowOffset: {
    //   width: 10, height: 10
    // },
    // shadowRadius: 10,
    // elevation: 2,
    alignSelf: 'center',
    marginTop: hp1( 33 ),
    marginBottom: hp1( 20 ),
  },
  availableToSpendText: {
    color: '#505050',
    fontSize: RFValue( 10 ),
    fontFamily: Fonts.RobotoSlabLight,
    lineHeight: 15,
  },
  balanceText: {
    color: '#505050',
    fontSize: RFValue( 10 ),
    fontFamily: Fonts.RobotoSlabLight,
    lineHeight: 15,
  },
} )
