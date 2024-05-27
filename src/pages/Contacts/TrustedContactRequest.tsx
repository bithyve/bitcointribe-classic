import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator, Image, Keyboard, KeyboardAvoidingView,
  Platform, StyleSheet, Text, TextInput, View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { DeepLinkEncryptionType } from '../../bitcoin/utilities/Interface'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import PassCodeTextBox from '../../components/PassCodeTextBox'

export default function TrustedContactRequest( props ) {
  const [ WrongInputError, setWrongInputError ] = useState( '' )
  const [ isDisabled, setIsDisabled ] = useState( true )
  const [ PhoneNumber, setPhoneNumber ] = useState( '' )
  const [ EmailId, setEmailId ] = useState( '' )
  const [ onBlurFocus, setOnBlurFocus ] = useState( false )
  const [ passcode, setPasscode ] = useState( '' )
  const [ passcodeArray, setPasscodeArray ] = useState( [] )


  function onPressNumber( text, i ) {
    const tempPasscode = passcodeArray
    tempPasscode[ i ] = text
    setTimeout( () => {
      setPasscodeArray( tempPasscode )
    }, 2 )
    if ( passcodeArray.join( '' ).length == 6 ) {
      setPasscode( tempPasscode.join( '' ) )
    }
  }

  useEffect( () => {
    if ( !props.inputType || props.inputType === DeepLinkEncryptionType.DEFAULT ) setIsDisabled( false )
    else setIsDisabled( true )
  }, [ props.inputType ] )

  const getStyle = ( i ) => {
    if ( i == 0 ) {
      return this.textInput && this.textInput.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles
    }
    if ( i == 1 ) {
      return this.textInput2 && this.textInput2.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles
    }
    if ( i == 2 ) {
      return this.textInput3 && this.textInput3.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles
    }
    if ( i == 3 ) {
      return this.textInput4 && this.textInput4.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles
    }
    if ( i == 4 ) {
      return this.textInput5 && this.textInput5.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles
    }
    if ( i == 5 ) {
      return this.textInput6 && this.textInput6.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles
    }
  }
  const getInputBox = () => {
    if ( props.inputType == DeepLinkEncryptionType.EMAIL ) {
      return (
        <View style={styles.textboxView}>
          <TextInput
            autoCapitalize={'none'}
            returnKeyLabel="Done"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            keyboardType={'email-address'}
            placeholderTextColor={Colors.borderColor}
            placeholder={`${props.hint.charAt( 0 )}XXXX@XXX${props.hint.substring(
              1,
            )}`}
            onChangeText={( text ) => {
              setEmailId( text )
            }}
            style={{
              flex: 1, fontSize: RFValue( 13 )
            }}
            onFocus={() => {
              if ( Platform.OS === 'ios' ) {
                setOnBlurFocus( true )
                props.bottomSheetRef.current?.expand()
              }
            }}
            onBlur={() => {
              checkForValidation( EmailId )
              setOnBlurFocus( false )
              props.bottomSheetRef.current?.snapTo( 1 )
            }}
            value={EmailId}
            autoCorrect={false}
            autoCompleteType="off"
          />
        </View>
      )
    } else if ( props.inputType == DeepLinkEncryptionType.NUMBER ) {
      return (
        <View style={styles.textboxView}>
          <View style={styles.separatorView} />
          <TextInput
            keyboardType={'numeric'}
            returnKeyLabel="Done"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            placeholderTextColor={Colors.borderColor}
            placeholder={`${props.hint?.charAt(
              0,
            )}XXX XXX X${props.hint?.substring( 1 )}`}
            onChangeText={( text ) => {
              setPhoneNumber( text )
              if ( text.length === 10 ) checkForValidation( text )
            }}
            style={{
              flex: 1
            }}
            onFocus={() => {
              if ( Platform.OS === 'ios' ) {
                setOnBlurFocus( true )
                props.bottomSheetRef.current?.expand()
              }
            }}
            onBlur={() => {
              checkForValidation( PhoneNumber )
              setOnBlurFocus( false )
              props.bottomSheetRef.current?.snapTo( 1 )
            }}
            value={PhoneNumber}
            autoCorrect={false}
            autoCompleteType="off"
          />
        </View>
      )
    } else if ( props.inputType === DeepLinkEncryptionType.OTP ){
      return (
        <PassCodeTextBox passcode={passcode} setPasscode={setPasscode} setDisabled={setIsDisabled} />
      )
    }
  }

  const checkForValidation = ( text ) => {
    if ( props.inputType == DeepLinkEncryptionType.NUMBER ) {
      if ( text.length == 0 ) {
        setWrongInputError( '' )
        setIsDisabled( true )
      } else if ( text.length != 0 && text.length < 10 ) {
        setWrongInputError( 'Incorrect Phone Number, try again' )
        setIsDisabled( true )
      } else if ( !text.match( /^[0-9]+$/ ) ) {
        setWrongInputError( 'Incorrect Phone Number, try again' )
        setIsDisabled( true )
      } else if (
        text.length >= 3 &&
        text.charAt( 0 ) + text.substring( 8 ) != props.hint
      ) {
        setWrongInputError( 'Incorrect Phone Number, try again' )
        setIsDisabled( true )
      } else {
        setWrongInputError( '' )
        setIsDisabled( false )
      }
    }
    if ( props.inputType == DeepLinkEncryptionType.EMAIL ) {
      if ( text.length == 0 ) {
        setWrongInputError( 'Please enter Email, try again' )
        setIsDisabled( true )
      } else if (
        text.length >= 3 &&
        text.charAt( 0 ) +
          text.slice( text.length - 2 ) !=
          props.hint
      ) {
        setWrongInputError( 'Incorrect Email, try again' )
        setIsDisabled( true )
      } else {
        setWrongInputError( '' )
        setIsDisabled( false )
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        // height: '100%',
        backgroundColor: Colors.white,
      }}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={{
          ...styles.modalContentContainer,
          paddingBottom: onBlurFocus ? hp( '30%' ) : 0,
        }}
      >
        <View>
          <View style={{
            flexDirection: 'row', flex: 1
          }}>
            <View style={styles.successModalHeaderView}>
              {!props.isRecovery ? (
                <Text style={styles.modalTitleText}>
                  {props.isGuardian
                    ? 'Backup Request'
                    : 'Friends & Family Request'}
                </Text>
              ) : (
                <Text style={styles.modalTitleText}>Recovery Key Request</Text>
              )}
              <Text style={{
                ...styles.modalInfoText, marginTop: wp( '1.5%' )
              }}>
                {props.isGuardian
                  ? 'Accept the request to backup Recovery Key'
                  : 'Accept the request to add your contact to Friends & Family'}
              </Text>
            </View>
            <View style={styles.box}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={styles.successModalAmountImage}
                  source={require( '../../assets/images/icons/icon_wallet.png' )}
                />
                <Text
                  style={{
                    fontSize: RFValue( 18 ),
                    fontFamily: Fonts.Regular,
                    color: Colors.blue,
                  }}
                >
                  {props.trustedContactName}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: Colors.borderColor,
              marginBottom: hp( '3%' ),
            }}
          />
          {props.inputNotRequired ? null: (
            <Text
              style={{
                ...styles.modalTitleText,
                marginLeft: wp( '8%' ),
                marginRight: wp( '8%' ),
              }}
            >
              {props.inputType === DeepLinkEncryptionType.NUMBER
                ? 'Confirm your mobile number'
                : props.inputType === DeepLinkEncryptionType.EMAIL
                  ? 'Confirm your email address'
                  : null}
            </Text>
          )}
          {props.inputNotRequired ? null: (
            <Text
              style={{
                ...styles.modalInfoText,
                marginLeft: wp( '8%' ),
                marginRight: wp( '8%' ),
                // marginBottom: wp('8%'),
              }}
            >
              Enter your{' '}
              <Text
                style={{
                  ...styles.modalInfoText,
                  marginLeft: wp( '8%' ),
                  marginRight: wp( '8%' ),
                  marginBottom: wp( '8%' ),
                }}
              >
                {props.inputType === DeepLinkEncryptionType.NUMBER
                  ? 'mobile number, '
                  : props.inputType === DeepLinkEncryptionType.EMAIL
                    ? 'email address, '
                    : 'otp, '}
                <Text style={{
                  fontFamily: Fonts.MediumItalic
                }}>
                  to accept the request
                </Text>
              </Text>
            </Text>
          )}

          {props.inputNotRequired ? null: (
            <View style={{
              marginLeft: wp( '8%' ), marginRight: wp( '8%' )
            }}>
              <View style={{
                flexDirection: 'row'
              }}>
                <Text style={styles.inputErrorText}>{WrongInputError}</Text>
              </View>
              {getInputBox()}
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 'auto',
              alignItems: 'center',
              marginVertical: hp( '4%' )
            }}
          >
            <AppBottomSheetTouchableWrapper
              disabled={isDisabled}
              onPress={() => {
                const key =
                  props.inputType === DeepLinkEncryptionType.NUMBER
                    ? PhoneNumber
                    : props.inputType === DeepLinkEncryptionType.EMAIL
                      ? EmailId
                      : passcode.toUpperCase()
                setTimeout( () => {
                  setPhoneNumber( '' )
                }, 2 )
                props.onPressAccept( key )
              }}
              style={{
                ...styles.successModalButtonView,
                backgroundColor: isDisabled ? Colors.lightBlue : Colors.blue,
              }}
            >
              {props.loading && props.loading == true ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={styles.proceedButtonText}>Accept Request</Text>
              )}
            </AppBottomSheetTouchableWrapper>
            <AppBottomSheetTouchableWrapper
              onPress={() => {
                const key =
                  props.inputType === DeepLinkEncryptionType.NUMBER
                    ? PhoneNumber
                    : props.inputType === DeepLinkEncryptionType.EMAIL
                      ? EmailId
                      : passcode
                props.onPressReject( key )
              }}
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
                Reject Request
              </Text>
            </AppBottomSheetTouchableWrapper>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create( {
  modalContentContainer: {
    // height: '100%',
    backgroundColor: Colors.white,
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
} )
