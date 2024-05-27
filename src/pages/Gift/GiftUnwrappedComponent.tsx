import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { Shadow } from 'react-native-shadow-2'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import Colors from '../../common/Colors'
import { SATOSHIS_IN_BTC } from '../../common/constants/Bitcoin'
import { LocalizationContext } from '../../common/content/LocContext'
import CurrencyKind from '../../common/data/enums/CurrencyKind'
import Fonts from '../../common/Fonts'
import { UsNumberFormat } from '../../common/utilities'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import { AccountsState } from '../../store/reducers/accounts'
import getAvatarForSubAccount from '../../utils/accounts/GetAvatarForSubAccountKind'
import useCurrencyCode from '../../utils/hooks/state-selectors/UseCurrencyCode'

export default function GiftUnwrappedComponent( props ) {
  const { translations } = useContext( LocalizationContext )
  const common = translations[ 'common' ]
  const fiatCurrencyCode = useCurrencyCode()
  const accountsState: AccountsState = useSelector( state => state.accounts )
  const currencyCode = useSelector( state => state.preferences.currencyCode )

  const accountElement = (
    item,
    activeOpacity = 1,
    width = '90%',
    message = `${props.currencyKind === CurrencyKind.BITCOIN ? 'Sats' : 'Money'} transferred to`,
  ) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.accountSelectionView, width: width,
        }}
        // onPress={() => onPressCallBack()}
        activeOpacity={activeOpacity}
      >
        <View style={{
          borderRadius: wp( 2 ),
        }}>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            paddingVertical: hp( 2 ),
            paddingHorizontal: wp( 2 ),
            alignItems: 'center'
          }}>
            <View style={{
              width: wp( 13 ),
              height: '100%',
              marginTop: hp( 0.5 ),
            }} >
              {getAvatarForSubAccount( item.primarySubAccount, false, true )}
            </View>
            <View style={{
              marginHorizontal: wp( 3 ),
              flex: 1
            }}>
              <Text style={{
                color: Colors.gray4,
                fontSize: RFValue( 10 ),
                fontFamily: Fonts.Regular,
              }}>
                {message}
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: RFValue( 14 ),
                  fontFamily: Fonts.Regular,
                  marginVertical: RFValue( 4 )
                }}
              >
                {item.primarySubAccount.customDisplayName ?? item.primarySubAccount.defaultTitle}
              </Text>
              <Text style={styles.availableToSpendText}>
                <Text style={styles.balanceText}>
                  {props?.prefersBitcoin
                    ? UsNumberFormat( item.primarySubAccount?.balances?.confirmed )
                    : accountsState.exchangeRates && accountsState.exchangeRates[ currencyCode ]
                      ? (
                        ( item.primarySubAccount?.balances?.confirmed / SATOSHIS_IN_BTC ) *
                        accountsState.exchangeRates[ currencyCode ].last
                      ).toFixed( 2 )
                      : 0}
                </Text>
                <Text>
                  {props?.prefersBitcoin ? ' sats' : ` ${fiatCurrencyCode}`}
                </Text>
              </Text>
            </View>
            {activeOpacity === 0 && <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="gray"
              style={{
                alignSelf: 'center'
              }}
            />}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{
      ...styles.modalContentContainer,
    }}>
      <View style={{
        height: props.small ? hp( 74 ) : 'auto'
      }}>
        {props.closeModal &&
          <AppBottomSheetTouchableWrapper
            onPress={props.onCloseClick}
            style={{
              marginTop: wp( '4%' ),
              marginRight: wp( '4%' ),
              width: wp( 7 ), height: wp( 7 ), borderRadius: wp( 7 / 2 ),
              alignSelf: 'flex-end',
              backgroundColor: Colors.CLOSE_ICON_COLOR, alignItems: 'center', justifyContent: 'center',
              // marginTop: wp( 3 )
            }}
          >
            <FontAwesome name="close" color={Colors.white} size={19} style={{
              // marginTop: hp( 0.5 )
            }} />
          </AppBottomSheetTouchableWrapper>
        }
        <View style={[ styles.successModalHeaderView, {
          // marginTop: RFValue( 18 )
        } ]}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between'
          }}>
            <Text
              style={{
                color: props.headerTextColor
                  ? props.headerTextColor
                  : Colors.blue,
                fontSize: RFValue( 18 ),
                fontFamily: Fonts.Regular,
                letterSpacing: 0.01,
              }}
            >
              {props.title}
            </Text>
          </View>
          {props.info ? (
            <Text
              style={{
                ...styles.modalInfoText,
                marginTop: RFValue( 12 ),
              }}
            >
              {props.info}
              <Text style={{
                color:Colors.blue
              }}>{props.infoSelected}</Text>
            </Text>
          ) : null}
          {props.info ? (
            <Text
              style={{
                ...styles.modalInfoText,
                marginTop: RFValue( 12 ),
              }}
            >
              {props.info2}
              <Text style={{
                color:Colors.blue,
                fontFamily: Fonts.SemiBold,
                fontStyle: 'italic'
              }}>{props.info2Selected}</Text>
            </Text>
          ) : null}
        </View>
        {
          props.showAccountDetail &&
            accountElement( props.selectedAccount )
        }
        <View
          style={{
            height: hp( '18%' ),
            flexDirection: 'row',
            marginTop: 'auto',
            alignItems: 'flex-end',
          }}
        >
          <Shadow viewStyle={{
            ...styles.successModalButtonView,
            backgroundColor: props.buttonColor
              ? props.buttonColor
              : Colors.blue,
          }} distance={2}
          startColor={props.buttonShadowColor
            ? props.buttonShadowColor
            : Colors.shadowBlue }
          offset={[ 42, 14 ]}>
            <AppBottomSheetTouchableWrapper
              onPress={() => props.onPressProceed()}
              style={{
                // ...styles.successModalButtonView,
                shadowColor: props.buttonShadowColor
                  ? props.buttonShadowColor
                  : Colors.shadowBlue,

              }}
              delayPressIn={0}
            >
              <Text
                style={{
                  ...styles.proceedButtonText,
                  color: props.buttonTextColor
                    ? props.buttonTextColor
                    : Colors.white,
                }}
              >
                {props.proceedButtonText}
              </Text>
            </AppBottomSheetTouchableWrapper>
          </Shadow>

          {props.isIgnoreButton && (
            <AppBottomSheetTouchableWrapper
              onPress={() => props.onPressIgnore()}
              style={{
                height: wp( '12%' ),
                width: wp( '27%' ),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: wp( '5%' ),
              }}
              delayPressIn={0}
            >
              <Text
                style={{
                  ...styles.proceedButtonText,
                  color: props.buttonTextColor
                    ? props.buttonTextColor
                    : Colors.blue,
                }}
              >
                {props.cancelButtonText ? props.cancelButtonText : common.ignore}
              </Text>
            </AppBottomSheetTouchableWrapper>
          )}

          {props.isBottomImage && (
            <Image
              source={
                props.bottomImage
                  ? props.bottomImage
                  : require( '../../assets/images/icons/success.png' )
              }
              style={props.isBottomImageStyle ? props.isBottomImageStyle : styles.successModalImage}
            />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  modalContentContainer: {
    // height: '100%',
    backgroundColor: Colors.white,
  },
  successModalHeaderView: {
    marginRight: wp( '8%' ),
    marginLeft: wp( '8%' ),
    // backgroundColor:'red'
    // marginTop: wp( '1%' ),
  },
  modalInfoText: {
    color: Colors.lightTextColor,
    // opacity: 1,
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Regular,
    letterSpacing: 0.6
  },
  successModalButtonView: {
    height: wp( '12%' ),
    minWidth: wp( '22%' ),
    paddingLeft: wp( '5%' ),
    paddingRight: wp( '5%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginLeft: wp( '8%' ),
    marginBottom:hp ( '5%' ),
  },
  successModalImage: {
    width: wp( '30%' ),
    height: wp( '35%' ),
    marginLeft: 'auto',
    resizeMode: 'stretch',
    marginRight: -5,
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
  accountSelectionView: {
    width: '90%',
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10, height: 10
    },
    shadowRadius: 10,
    elevation: 2,
    alignSelf: 'center',
    marginTop: hp( 2 ),
    marginBottom: hp( 2 ),
    backgroundColor:Colors.white,
    borderRadius:10
  },
  availableToSpendText: {
    color: Colors.blue,
    fontSize: RFValue( 10 ),
    fontFamily: Fonts.Italic,
    lineHeight: 15,
  },
  balanceText: {
    color: Colors.blue,
    fontSize: RFValue( 10 ),
    fontFamily: Fonts.Italic,
  },
} )
