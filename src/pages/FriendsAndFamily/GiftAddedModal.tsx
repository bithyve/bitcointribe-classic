import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Illustration from '../../assets/images/svgs/illustration.svg'
import Colors from '../../common/Colors'
import AccountShell from '../../common/data/models/AccountShell'
import Fonts from '../../common/Fonts'
import BottomInfoBox from '../../components/BottomInfoBox'
import getAvatarForSubAccount from '../../utils/accounts/GetAvatarForSubAccountKind'
import useAccountShellForID from '../../utils/hooks/state-selectors/accounts/UseAccountShellForID'


export type Props = {
  sourcePrimarySubAccount: any;
  sourceAccountHeadlineText: any;
  renderButton: ( text ) => void;
  getTheme: () => void;
  spendableBalance: number;
  formattedUnitText: string;
  onCancel: () => void;
  navigation: any;
  accountShellID: any;
};


export default function GiftAddedModal( { onCancel, formattedUnitText, renderButton, spendableBalance, sourcePrimarySubAccount, sourceAccountHeadlineText, navigation, accountShellID }: Props ) {
  const accountShell = useAccountShellForID( accountShellID )

  return (
    <>
      <View style={{
        marginTop: 'auto', right: 0, bottom: 0, position: 'absolute', marginLeft: 'auto'
      }}>
        <Illustration />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          onCancel()
          navigation.goBack()
        }}
        style={{
          width: wp( 7 ), height: wp( 7 ), borderRadius: wp( 7 / 2 ),
          alignSelf: 'flex-end',
          backgroundColor: Colors.CLOSE_ICON_COLOR, alignItems: 'center', justifyContent: 'center',
          marginTop: wp( 3 ), marginRight: wp( 3 )
        }}
      >
        <FontAwesome name="close" color={Colors.white} size={19} />
      </TouchableOpacity>
      <View style={{
        marginLeft: wp( 6 ), marginBottom: hp( 2 )
      }}>
        <Text style={styles.modalTitleText}>Gift Sats Added to Account</Text>
      </View>
      <View
        style={{
          width: '90%',
          backgroundColor: Colors.white,
          alignSelf: 'center',
          borderRadius: wp( 2 ),
          marginVertical: hp( 2 ),
          paddingVertical: hp( 2 ),
          paddingHorizontal: wp( 4 ),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        {getAvatarForSubAccount( sourcePrimarySubAccount, false, true )}
        <View style={{
          marginHorizontal: wp( 3 )
        }}>
          <Text style={{
            color: Colors.gray4,
            fontSize: RFValue( 10 ),
            fontFamily: Fonts.Regular,
          }}>
            Bitcoin will be transferred to
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: RFValue( 14 ),
              fontFamily: Fonts.Regular,
              marginVertical: hp( 0.3 )
            }}
          >
            {sourceAccountHeadlineText}
          </Text>
          <Text style={styles.availableToSpendText}>
            Balance
            <Text style={styles.balanceText}> {AccountShell.getSpendableBalance( accountShell )} {formattedUnitText}</Text>
          </Text>
        </View>
      </View>

      <BottomInfoBox
        containerStyle={{
        }}
        infoText={'This may take a while to reflect in your account'}
      />
      <View style={{
        marginHorizontal: wp( 6 )
      }}>
        {renderButton( 'View Account' )}
      </View>
    </>
  )
}

const styles = StyleSheet.create( {
  statusIndicatorView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginHorizontal: wp( '1%' ),
  },
  statusIndicatorActiveView: {
    height: 5,
    width: 25,
    backgroundColor: Colors.blue,
    borderRadius: 10,
    marginLeft: 5,
  },
  statusIndicatorInactiveView: {
    width: 5,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    marginLeft: 5,
  },
  box: {
    flex: 1,
    height: 60,
    backgroundColor: Colors.shadowBlue,
    marginTop: hp( '3%' ),
    marginLeft: wp( '4%' ),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
  },
  successModalHeaderView: {
    flex: 1,
    marginTop: hp( '3%' ),
    marginBottom: hp( '3%' ),
    marginLeft: wp( '8%' ),
  },
  successModalButtonView: {
    height: wp( '13%' ),
    width: wp( '35%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 10,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 1,
    shadowOffset: {
      width: 15, height: 15
    },
    alignSelf: 'center',
    marginLeft: wp( '8%' ),
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
  successModalAmountImage: {
    width: wp( '10%' ),
    height: wp( '10%' ),
    marginRight: 10,
    marginLeft: 10,
    // marginBottom: wp('1%'),
    resizeMode: 'contain',
  },
  phoneNumberInfoText: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 11 ),
    color: Colors.textColorGrey,
    marginBottom: wp( '5%' ),
  },
  inputErrorText: {
    fontFamily: Fonts.MediumItalic,
    fontSize: RFValue( 10 ),
    color: Colors.red,
    marginTop: wp( '2%' ),
    marginBottom: wp( '3%' ),
    marginLeft: 'auto',
  },
  textboxView: {
    flexDirection: 'row',
    paddingLeft: 15,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.borderColor,
    marginBottom: wp( '5%' ),
    alignItems: 'center',
  },
  countryCodeText: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 13 ),
    paddingRight: 15,
  },
  separatorView: {
    marginRight: 15,
    height: 25,
    width: 2,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  textBoxStyles: {
    borderWidth: 0.5,
    height: wp( '12%' ),
    width: wp( '12%' ),
    borderRadius: 7,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginLeft: 8,
    color: Colors.black,
    fontSize: RFValue( 13 ),
    textAlign: 'center',
    lineHeight: 18,
  },
  textBoxActive: {
    borderWidth: 0.5,
    height: wp( '12%' ),
    width: wp( '12%' ),
    borderRadius: 7,
    elevation: 10,
    shadowColor: Colors.borderColor,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0, height: 3
    },
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginLeft: 8,
    color: Colors.black,
    fontSize: RFValue( 13 ),
    textAlign: 'center',
    lineHeight: 18,
  },
  textStyles: {
    color: Colors.black,
    fontSize: RFValue( 13 ),
    textAlign: 'center',
    lineHeight: 18,
  },
  textFocused: {
    color: Colors.black,
    fontSize: RFValue( 13 ),
    textAlign: 'center',
    lineHeight: 18,
  },




  buttonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
  buttonView: {
    height: wp( '14%' ),
    width: wp( '35%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 1,
    shadowOffset: {
      width: 15, height: 15
    },
    backgroundColor: Colors.blue,
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
  modalTitleText: {
    color: Colors.blue,
    fontSize: RFValue( 18 ),
    fontFamily: Fonts.Regular,
  },
  modalInfoText: {
    // marginTop: hp( '3%' ),
    marginTop: hp( 0.5 ),
    color: Colors.textColorGrey,
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Regular,
    marginRight: wp( 12 ),
    letterSpacing: 0.6
  },
  modalContentContainer: {
    // height: '100%',
    backgroundColor: Colors.bgColor,
    paddingBottom: hp( 4 ),
  },
  rootContainer: {
    flex: 1
  },
  viewSectionContainer: {
    marginBottom: 16,
  },
  infoHeaderSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  floatingActionButtonContainer: {
    bottom: hp( 1.5 ),
    right: 0,
    marginLeft: 'auto',
    padding: hp( 1.5 ),
  },
} )

// export default AcceptGift


