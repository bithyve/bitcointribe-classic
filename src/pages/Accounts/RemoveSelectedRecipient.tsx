import React, { useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import { REGULAR_ACCOUNT, SECURE_ACCOUNT, TEST_ACCOUNT } from '../../common/constants/wallet-service-types'
import { RecipientDescribing } from '../../common/data/models/interfaces/RecipientDescribing'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import { makeAccountRecipientDescriptionFromUnknownData, makeContactRecipientDescription } from '../../utils/sending/RecipientFactories'
import RecipientComponent from './RecipientComponent'

export default function RemoveSelectedRecipient( props ) {
  const [ SelectedContactId, setSelectedContactId ] = useState( 0 )

  const recipient = useMemo( () => {
    const selectedContactData = props.selectedContact.selectedContact
    const newItem = {
      ...selectedContactData,
      bitcoinAmount: props.prefersBitcoin
        ? props.selectedContact.bitcoinAmount
          ? props.selectedContact.bitcoinAmount
          : 0
        : props.selectedContact.currencyAmount
          ? props.selectedContact.currencyAmount
          : 0,
    }
    // TODO: This should already be computed
    // ahead of time in the data passed to this screen.
    let recipient: RecipientDescribing

    // 🔑 This seems to be the way the backend is defining the "account kind".
    // This should be refactored to leverage the new accounts structure
    // in https://github.com/bithyve/hexa/tree/feature/account-management
    const accountKind = {
      'Checking Account': REGULAR_ACCOUNT,
      'Savings Account': SECURE_ACCOUNT,
      'Test Account': TEST_ACCOUNT,
    }[ selectedContactData.account_name || 'Checking Account' ]

    if ( selectedContactData.account_name != null ) {
      recipient = makeAccountRecipientDescriptionFromUnknownData(
        selectedContactData,
        accountKind,
      )
    } else {
      recipient = makeContactRecipientDescription( newItem )
    }

    return recipient
  }, [ props.selectedContact ] )

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
          This will remove the recipient from Send
        </Text>
      </View>

      {props.selectedContact && (
        <ScrollView>
          <RecipientComponent
            recipient={recipient}
            onPressElement={() => {
              if ( props.selectedContact.note ) {
                if ( SelectedContactId == props.selectedContact.id )
                  setSelectedContactId( 0 )
                else setSelectedContactId( props.selectedContact.id )
              }
            }}
            selectedContactId={String( SelectedContactId )}
            accountKind={props.accountKind}
          />
        </ScrollView>

      )}

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
