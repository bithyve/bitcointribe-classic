import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import AccountComponent from './AccountComponent'

export default function RemoveSelectedAccount( props ) {
  const [ SelectedContactId, setSelectedContactId ] = useState( 0 )
  const accountInfo = props.selectedAccount ? props.selectedAccount : {
  }
  return (
    <View style={{
      ...styles.modalContentContainer, height: '100%'
    }}>
      <View
        style={{
          ...styles.successModalHeaderView,
          marginRight: wp( '6%' ),
          marginLeft: wp( '6%' ),
        }}
      >
        <Text style={styles.modalTitleText}>Remove Recipient</Text>
        <Text style={{
          ...styles.modalInfoText, marginTop: wp( '1.5%' )
        }}>
          This will remove the recipient form Send
        </Text>
      </View>
      <ScrollView>
        <AccountComponent
          item={accountInfo}

          SelectedContactId={SelectedContactId}
        />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 'auto',
          alignItems: 'center',
          marginBottom: hp( '2%' ),
        }}
      >
        <AppBottomSheetTouchableWrapper
          disabled={props.loading}
          onPress={() => {
            props.onPressDone()
          }}
          style={{
            ...styles.successModalButtonView
          }}
        >
          {props.loading && props.loading == true ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.proceedButtonText}>Remove</Text>
          )}
        </AppBottomSheetTouchableWrapper>
        <AppBottomSheetTouchableWrapper
          disabled={props.loading}
          onPress={() => props.onPressBack()}
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
              Back
          </Text>
        </AppBottomSheetTouchableWrapper>
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  modalContentContainer: {
    height: '100%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: '100%',
  },
  successModalHeaderView: {
    marginTop: hp( '2%' ),
    marginBottom: hp( '3%' ),
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
    elevation: 10,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 1,
    shadowOffset: {
      width: 15, height: 15
    },
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
