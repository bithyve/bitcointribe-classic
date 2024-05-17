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
} )


