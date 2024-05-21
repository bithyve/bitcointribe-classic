import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CountDown from 'react-native-countdown-component'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Config from '../../bitcoin/HexaConfig'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import UserDetails from '../../components/UserDetails'

export default function TimerModalContents( props ) {
  const [ contactName, setContactName ] = useState( '' )
  const [ type, setType ] = useState( 'their phone number' )
  const contact = props.contact
  const [ Contact, setContact ] = useState( props.contact ? props.contact : {
  } )

  useEffect( () => {
    if ( contact ) {
      setContact( props.contact )
      getNumberOrEmail()
    }
  }, [ contact ] )

  useEffect( () => {
    const contactName =
      Contact && Contact.firstName && Contact.lastName
        ? Contact.firstName + ' ' + Contact.lastName
        : Contact && Contact.firstName && !Contact.lastName
          ? Contact.firstName
          : Contact && !Contact.firstName && Contact.lastName
            ? Contact.lastName
            : ''
    setContactName( contactName )
  }, [ Contact ] )

  const TC_REQUEST_EXPIRY = Config.TC_REQUEST_EXPIRY / 1000

  const getNumberOrEmail = () => {
    if ( Contact &&
      Contact.phoneNumbers &&
      Contact.phoneNumbers.length ) {
      setType( 'their phone number' )
    } else if ( Contact &&
      Contact.emails &&
      Contact.emails.length ) {
      setType( 'their email' )
    }
  }
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeaderTitleView}>
        <View>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between'
          }}>
            <Text style={styles.modalHeaderTitleText}>
              Contact to confirm{'\n'}
              {type}
            </Text>
            <AppBottomSheetTouchableWrapper
              onPress={() => {
                props.onPressContinue()
              }}
              style={{
                height: wp( '9%' ),
                width: wp( '18%' ),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.lightBlue,
                justifyContent: 'center',
                borderRadius: 8,
                alignSelf: 'center',
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: RFValue( 14 ),
                  fontFamily: Fonts.Regular,
                }}
              >
                Close
              </Text>
              <Ionicons color={Colors.white} size={20} name={'close-outline'} />
            </AppBottomSheetTouchableWrapper>
          </View>
          <Text numberOfLines={2} style={styles.modalHeaderInfoText}>
            Your contact will be prompted to enter {type} to accept the request
          </Text>
        </View>
      </View>
      <View style={{
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: props.isFromReceive ? 0 : hp( '1.7%' ),
        marginBottom: props.isFromReceive ? 0 : hp( '1.7%' ),
      }}>
        <UserDetails
          fromScreen={'TimerModalContents'}
          titleStyle={styles.titleStyle}
          contactName={contactName}
          contactText={props.contactText}
          Contact={Contact} />
      </View>
      <Text numberOfLines={2} style={[ styles.modalHeaderInfoText, {
        marginHorizontal: 20
      } ]}>
        This request will expire in 24 hours. Make sure that your contact accepts the request before that time
      </Text>
      <View style={styles.seperator} />
      <View style={{
        flex: 1, marginHorizontal: 20
      }}>
        <View style={styles.bottomView}>
          <View style={styles.bottomInnerView}>
            <Ionicons color={Colors.blue} size={18} name={'time-outline'} />
            {props.renderTimer ? (
              <CountDown
                size={15}
                until={TC_REQUEST_EXPIRY}
                onFinish={() => props.onPressContinue()}
                digitStyle={{
                  backgroundColor: '#FFF',
                  borderWidth: 0,
                  borderColor: '#FFF',
                }}
                digitTxtStyle={{
                  color: Colors.blue,
                  fontSize: RFValue( 19 ),
                  fontFamily: Fonts.Regular,
                }}
                separatorStyle={{
                  color: Colors.blue
                }}
                timeToShow={[ 'H', 'M' ]}
                timeLabels={{
                  h: null, m: null, s: null
                }}
                showSeparator
              />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create( {
  seperator: {
    width: 306,
    height: 1,
    backgroundColor: Colors.borderColor,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 12
  },
  titleStyle: {
    color: Colors.blue,
    fontSize: RFValue( 20 ),
    fontFamily: Fonts.Regular,
    marginLeft: 25,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: '100%',
  },
  modalHeaderTitleView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    marginTop: 15,
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
} )
