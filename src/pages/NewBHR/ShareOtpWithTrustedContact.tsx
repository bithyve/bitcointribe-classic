import React from 'react'
import { Clipboard, StyleSheet, Text, View } from 'react-native'
import CountDown from 'react-native-countdown-component'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../common/Colors'
import { translations } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import Toast from '../../components/Toast'

export default function ShareOtpWithTrustedContact( props ) {
  const OTP = props.OTP
  const index = props.index
  const common  = translations[ 'common' ]

  const writeToClipboard = () => {
    Clipboard.setString( OTP )
    Toast( common.copied )
  }
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeaderTitleView}>
        <View style={{
          flexDirection: 'row', flex: 1, marginTop: hp( 2 )
        }}>
          <View>
            <Text style={styles.modalHeaderTitleText}>
              Send OTP to contact
            </Text>
            <Text numberOfLines={2} style={styles.modalHeaderInfoText}>
              Please provide this OTP to your contact in order for them
              to send you the recovery key
            </Text>
            <Text numberOfLines={2} style={styles.modalHeaderInfoText}>
              Please make sure you use a different to channel to send the OTP
            </Text>
          </View>
        </View>
      </View>
      <View style={{
        marginLeft: 30, marginRight: 30
      }}>
        <AppBottomSheetTouchableWrapper
          onPress={() => writeToClipboard()}
          style={styles.otpView}
        >
          <View style={styles.otpTextView}>
            <Text style={styles.otpText}>{OTP[ 0 ]}</Text>
          </View>
          <View style={styles.otpTextView}>
            <Text style={styles.otpText}>{OTP[ 1 ]}</Text>
          </View>
          <View style={styles.otpTextView}>
            <Text style={styles.otpText}>{OTP[ 2 ]}</Text>
          </View>
          <View style={styles.otpTextView}>
            <Text style={styles.otpText}>{OTP[ 3 ]}</Text>
          </View>
          <View style={styles.otpTextView}>
            <Text style={styles.otpText}>{OTP[ 4 ]}</Text>
          </View>
          <View style={styles.otpTextView}>
            <Text style={styles.otpText}>{OTP[ 5 ]}</Text>
          </View>
        </AppBottomSheetTouchableWrapper>
        <Text
          numberOfLines={2}
          style={{
            ...styles.modalHeaderInfoText, marginBottom: hp( '5%' )
          }}
        >
          Tap on OTP to copy
        </Text>
        <Text numberOfLines={2} style={styles.modalHeaderInfoText}>
          This OTP is only valid for 10 minutes, if the OTP{'\n'}expires you
          will be asked to create a new one
        </Text>
        <View style={styles.separator} />
        <View style={styles.bottomView}>
          <View style={styles.bottomInnerView}>
            <Ionicons color={Colors.blue} size={17} name={'md-time'} />
            {props.renderTimer ?
              <CountDown
                size={15}
                until={600}
                digitStyle={{
                  backgroundColor: '#FFF',
                  borderWidth: 0,
                  borderColor: '#FFF',
                  margin: -10,

                }}
                digitTxtStyle={{
                  color: Colors.blue, fontSize: RFValue( 19 ),
                  fontFamily: Fonts.Regular,
                }}
                separatorStyle={{
                  color: Colors.blue,
                }}
                timeToShow={[ 'M', 'S' ]}
                timeLabels={{
                  m: null, s: null
                }}
                showSeparator
              /> : null}
            {/* <Text style={styles.timerText}>09 : 12</Text> */}
          </View>

          <AppBottomSheetTouchableWrapper
            onPress={() => props.onPressOk( index )}
            style={{
              backgroundColor: Colors.blue,
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
              Yes, I have shared
            </Text>
          </AppBottomSheetTouchableWrapper>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create( {
  modalContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: '100%',
  },
  modalHeaderTitleView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    paddingBottom: hp( '3%' ),
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  modalHeaderTitleText: {
    color: Colors.blue,
    fontSize: RFValue( 18 ),
    fontFamily: Fonts.Medium,
  },
  modalHeaderInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Regular,
    marginTop: hp( '0.7%' ),
    marginRight: 20,
    flexWrap: 'wrap',
  },
  otpText: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 23 ),
  },
  otpTextView: {
    height: wp( '12%' ),
    width: wp( '12%' ),
    backgroundColor: Colors.backgroundColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp( '5%' ),
  },
  separator: {
    height: 1,
    backgroundColor: Colors.borderColor,
    marginTop: hp( '5%' ),
    marginBottom: hp( '3%' ),
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timerText: {
    color: Colors.blue,
    fontSize: RFValue( 19 ),
    fontFamily: Fonts.Regular,
    marginLeft: 10,
  },
} )
