import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import { nameToInitials } from '../../common/CommonFunctions'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'

const setPhoneNumber = ( selectedContact ) => {
  const phoneNumber = selectedContact.phoneNumbers[ 0 ].number
  let number = phoneNumber.replace( /[^0-9]/g, '' ) // removing non-numeric characters
  number = number.slice( number.length - 10 ) // last 10 digits only
  return number
}

const UpgradingKeeperContact = ( {
  selectedContactArray,
  title,
  subText,
  info,
  proceedButtonText,
  onPressProceed,
} ) => {
  return (
    <View style={{
      ...styles.modalContentContainer, height: '100%'
    }}>
      <View style={{
        height: '100%'
      }}>
        <View style={styles.successModalHeaderView}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.modalInfoText}>{subText}</Text>
        </View>
        {selectedContactArray.length && (
          <ScrollView style={{
            flex: 1
          }}>
            {selectedContactArray.map( ( selectedContact, index ) => {
              return (
                <View key={index} style={styles.contactProfileView}>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center'
                  }}>
                    <View style={styles.selectedContactView}>
                      {selectedContact && selectedContact.imageAvailable ? (
                        <View style={styles.selectedContactImageView}>
                          <Image
                            source={selectedContact && selectedContact.image}
                            style={{
                              ...styles.contactProfileImage
                            }}
                          />
                        </View>
                      ) : (
                        <View style={styles.selectedContactInitialsView}>
                          <Text style={styles.selectedContactInitialsText}>
                            {nameToInitials(
                              selectedContact &&
                                selectedContact.firstName &&
                                selectedContact.lastName
                                ? selectedContact.firstName +
                                    ' ' +
                                    selectedContact.lastName
                                : selectedContact &&
                                  selectedContact.firstName &&
                                  !selectedContact.lastName
                                  ? selectedContact.firstName
                                  : selectedContact &&
                                  !selectedContact.firstName &&
                                  selectedContact.lastName
                                    ? selectedContact.lastName
                                    : '',
                            )}
                          </Text>
                        </View>
                      )}
                      <View>
                        <Text style={styles.addingAsContactText}>
                          Upgrading Key from
                        </Text>
                        <Text style={styles.contactNameText}>
                          {selectedContact &&
                          selectedContact.firstName &&
                          selectedContact.lastName
                            ? selectedContact.firstName +
                              ' ' +
                              selectedContact.lastName
                            : selectedContact &&
                              selectedContact.firstName &&
                              !selectedContact.lastName
                              ? selectedContact.firstName
                              : selectedContact &&
                              !selectedContact.firstName &&
                              selectedContact.lastName
                                ? selectedContact.lastName
                                : ''}
                        </Text>
                        {selectedContact &&
                        selectedContact.phoneNumbers &&
                        selectedContact.phoneNumbers.length ? (
                            <Text style={styles.selectedContactPhoneNumber}>
                              {setPhoneNumber( selectedContact )}
                              {/* {selectedContact.phoneNumbers[0].digits} */}
                            </Text>
                          ) : selectedContact &&
                          selectedContact.emails &&
                          selectedContact.emails.length ? (
                              <Text style={styles.selectedContactEmail}>
                                {selectedContact && selectedContact.emails[ 0 ].email}
                              </Text>
                            ) : null}
                      </View>
                      <Image
                        source={require( '../../assets/images/icons/icon_phonebook.png' )}
                        style={{
                          ...styles.addressBook
                        }}
                      />
                    </View>
                  </View>
                </View>
              )
            } )}
          </ScrollView>
        )}

        <View
          style={{
            ...styles.successModalHeaderView,
            marginTop: 'auto',
            marginBottom: hp( '1%' ),
          }}
        >
          {info ? <Text style={styles.modalInfoText}>{info}</Text> : null}
        </View>
        <View style={styles.bottomButtonsView}>
          <AppBottomSheetTouchableWrapper
            onPress={() => onPressProceed()}
            style={styles.successModalButtonView}
          >
            <Text
              style={{
                ...styles.proceedButtonText,
                color: Colors.white,
              }}
            >
              {proceedButtonText}
            </Text>
          </AppBottomSheetTouchableWrapper>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  modalContentContainer: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  successModalHeaderView: {
    marginRight: wp( '8%' ),
    marginLeft: wp( '8%' ),
    marginTop: wp( '5%' ),
  },
  modalInfoText: {
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Regular,
    marginTop: wp( '1.5%' ),
    color: Colors.lightTextColor,
  },
  headerText: {
    color: Colors.blue,
    fontSize: RFValue( 18 ),
    fontFamily: Fonts.Medium,
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
  contactProfileView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp( '2%' ),
  },
  selectedContactView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.backgroundColor1,
    height: 90,
    marginRight: wp( '6%' ),
    marginLeft: wp( '6%' ),
    borderRadius: 10,
  },
  selectedContactImageView: {
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 2, height: 2
    },
  },
  selectedContactInitialsView: {
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 1,
    shadowOffset: {
      width: 2, height: 2
    },
  },
  selectedContactInitialsText: {
    textAlign: 'center',
    fontSize: RFValue( 20 ),
    lineHeight: RFValue( 20 ), //... One for top and one for bottom alignment
  },
  addingAsContactText: {
    color: Colors.textColorGrey,
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 11 ),
    marginLeft: 5,
    paddingTop: 5,
    paddingBottom: 3,
  },
  selectedContactPhoneNumber: {
    color: Colors.textColorGrey,
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 10 ),
    marginLeft: 5,
    paddingTop: 3,
  },
  selectedContactEmail: {
    color: Colors.textColorGrey,
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 10 ),
    marginLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
  },
  contactProfileImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 70 / 2,
  },
  contactNameText: {
    color: Colors.black,
    fontSize: RFValue( 20 ),
    fontFamily: Fonts.Regular,
    marginLeft: 5,
  },
  bottomButtonsView: {
    height: hp( '15%' ),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressBook: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    marginLeft: 'auto',
    marginRight: 10,
  },
} )
export default memo( UpgradingKeeperContact )
