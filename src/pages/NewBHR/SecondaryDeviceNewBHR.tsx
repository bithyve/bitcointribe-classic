import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../common/Colors'
import { translations } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'
import NavStyles from '../../common/Styles/NavStyles'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import QRCode from '../../components/QRCode'

export default function SecondaryDeviceModelContents( props ) {
  const strings  = translations[ 'bhr' ]

  return (
    <View
      style={{
        // height: '100%',
        backgroundColor: Colors.white,
        borderColor: Colors.borderColor,
        alignSelf: 'center',
        width: '100%',
      }}
    >
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between'
      }}>
        <View
          style={{
            ...NavStyles.modalHeaderTitleView,
            paddingTop: hp( '3%' ),
            alignItems: 'center',
            marginLeft: 20,
            flex: 1
          }}
        >
          <Text style={NavStyles.modalHeaderTitleText}>{strings.ScanQRCode}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.onPressBack()
          }}
          style={{
            width: wp( 7 ), height: wp( 7 ), borderRadius: wp( 7/2 ),
            backgroundColor: Colors.CLOSE_ICON_COLOR, alignItems: 'center', justifyContent: 'center',
            marginTop: wp( 3 ), marginRight: wp( 3 )
          }}
        >
          <FontAwesome name="close" color={Colors.white} size={19} style={{
          // marginTop: hp( 0.5 )
          }} />
        </TouchableOpacity>
      </View>


      <Text style={{
        color: Colors.textColorGrey,
        fontSize: RFValue( 12 ),
        letterSpacing: 0.1,
        fontFamily: Fonts.Regular,
        marginLeft: 20,
        marginRight: wp( 8 )
      }}>
        {strings.OpentheQRscanner}
      </Text>
      <View style={NavStyles.modalContentView}>
        {!props.secondaryQR ? (
          <View style={{
            height: hp( '27%' ), justifyContent: 'center',
          }}>
            <ActivityIndicator size="large" animating color={Colors.gray1}/>
          </View>
        ) : (
          <QRCode title={props.qrTitle ? props.qrTitle : 'Keeper request'} value={props.secondaryQR} size={hp( '27%' )} />
        )}
        {!props.secondaryQR?<Text style={{
          fontFamily: Fonts.Regular, fontSize: RFValue( 13 ), color: Colors.textColorGrey, marginTop: 5
        }}>{'Generating your Recovery Key. Hold on.\nDo not try to go back or close the app.'}</Text>: null}
        <AppBottomSheetTouchableWrapper
          disabled={props.secondaryQR ? false : true}
          onPress={() => props.onPressOk()}
          style={{
            backgroundColor: props.secondaryQR ? Colors.blue : Colors.lightBlue,
            borderRadius: 10,
            width: wp( '50%' ),
            height: wp( '13%' ),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp( '3%' ),
            marginBottom: hp( '3%' ),
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: RFValue( 13 ),
              fontFamily: Fonts.Medium,
            }}
          >
            {strings.Ihavescanned}
          </Text>
        </AppBottomSheetTouchableWrapper>
      </View>
    </View>
  )
}
