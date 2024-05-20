import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import { RecipientDescribing } from '../../common/data/models/interfaces/RecipientDescribing'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import RecipientComponent from './RecipientComponent'

export default function SendConfirmationContent( props ) {
  const renderRecipientItem = ( recipient: RecipientDescribing ) => {
    return (
      <RecipientComponent
        key={recipient.id}
        recipient={recipient}
        selectedContactId={'0'}
        accountKind={props.accountKind}
      />
    )
  }

  return (
    <View style={{
      backgroundColor: Colors.white
    }}>
      <View
        style={{
          ...styles.successModalHeaderView,
          marginRight: wp( '8%' ),
          marginLeft: wp( '8%' ),
          marginTop: hp( 3 )
        }}
      >
        <Text style={styles.modalTitleText}>{props.title}</Text>
        <Text style={{
          ...styles.modalInfoText, marginTop: wp( '1%' )
        }}>
          {props.info}
        </Text>
      </View>

      {
        props.recipients && (
          <ScrollView style={{
            marginTop: hp( '1.5%' ), marginBottom: hp( '1%' )
          }}>
            {props.recipients.map( ( item ) => renderRecipientItem( item ) )}
          </ScrollView>
        )
      }


      {props.infoText && (
        <View
          style={{
            marginTop: hp( '1%' ),
            marginBottom: hp( '1%' ),
            marginRight: wp( '8%' ),
            marginLeft: wp( '8%' ),
          }}
        >
          <Text style={{
            ...styles.modalInfoText
          }}>
            {props.infoText ? props.infoText : ''}
          </Text>
        </View>
      )}
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          marginTop: hp( 9 ),
          alignItems: 'center',
          // backgroundColor: 'red'
        }}
      >
        <AppBottomSheetTouchableWrapper
          onPress={() => props.onPressOk()}
        >
          <LinearGradient colors={[ Colors.blue, Colors.darkBlue ]}
            start={{
              x: 0, y: 0
            }} end={{
              x: 1, y: 0
            }}
            locations={[ 0.2, 1 ]}
            style={{
              ...styles.successModalButtonView
            }}
          >
            <Text style={styles.proceedButtonText}>{props.okButtonText}</Text>
          </LinearGradient>
        </AppBottomSheetTouchableWrapper>
        {props.isCancel && (
          <AppBottomSheetTouchableWrapper
            onPress={() => props.onPressCancel()}
            style={{
              height: wp( '13%' ),
              width: wp( '35%' ),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{
              ...styles.proceedButtonText, color: Colors.blue
            }}>
              {props.cancelButtonText}
            </Text>
          </AppBottomSheetTouchableWrapper>
        )}
        {( props.isSuccess || props.isUnSuccess ) && (
          <Image
            style={{
              width: wp( '25%' ),
              height: hp( '10%' ),
              resizeMode: 'cover',
              marginLeft: 'auto',
              // backgroundColor: 'green'
              // marginBottom: props.recipients.length === 0 ? 'auto' : 0,
            }}
            source={
              props.isSuccess
                ? require( '../../assets/images/icons/sendSuccess.png' )
                : require( '../../assets/images/icons/sendError.png' )
            }
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  successModalHeaderView: {
    marginBottom: hp( '1%' ),
    marginTop: hp( '1%' ),
  },
  modalTitleText: {
    color: Colors.blue,
    fontSize: RFValue( 18 ),
    fontFamily: Fonts.Medium,
  },
  modalInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Regular,
  },
  successModalButtonView: {
    height: wp( '13%' ),
    width: wp( '35%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginLeft: wp( '8%' ),
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
} )
