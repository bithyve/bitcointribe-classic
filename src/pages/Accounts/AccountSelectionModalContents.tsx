import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import { REGULAR_ACCOUNT } from '../../common/constants/wallet-service-types'
import { translations } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import RadioButton from '../../components/RadioButton'

export default function AccountSelectionModalContents( props ) {
  const strings  = translations[ 'accounts' ]
  const common  = translations[ 'common' ]

  const RegularBalance = props.RegularAccountBalance
  const [ SelectedAccountType, setSelectedAccountType ] = useState( '' )
  const [ accountData, setAccountData ] = useState( [
    {
      accountName: 'Checking Account',
      accountBalance: props.RegularAccountBalance,
      accountImage: require( '../../assets/images/icons/icon_regular_account.png' ),
      type: REGULAR_ACCOUNT,
      isSelected: false
    },
  ] )

  useEffect( ()=>{
    accountData[ 0 ].accountBalance = RegularBalance
    // accountData[ 1 ].accountBalance = SavingBalance
    setAccountData( accountData )
  }, [ RegularBalance ] )

  const onAccountSelection = ( item ) =>{
    for ( let i = 0; i < accountData.length; i++ ) {
      const element = accountData[ i ]
      if( item.type == element.type ) element.isSelected = true
      else element.isSelected = false
    }
    setAccountData( accountData )
    setSelectedAccountType( item.type )
  }

  return (
    <View style={styles.modalContentContainer}>
      <View style={styles.successModalHeaderView}>
        <Text style={styles.modalTitleText}>{strings.ChangeAccount}</Text>
        <Text style={{
          ...styles.modalInfoText, marginTop: wp( '1.5%' )
        }}>
          {strings.Chooseaccounttosendfrom}
        </Text>
      </View>
      <View>
        {accountData.map( ( item, index )=>{
          return <View key={index} style={{
            flexDirection: 'row', alignItems:'center', marginLeft: wp( '2%' ), marginTop: index==0 ? wp( '4%' ) : wp( '2%' ), marginBottom: index==1 ? wp( '4%' ) : wp( '2%' )
          }}>
            <View style={{
              width: wp( '10%' ), height: wp( '10%' ), justifyContent:'center', alignItems:'center',
            }}>
              <RadioButton
                size={15}
                color={Colors.lightBlue}
                borderColor={Colors.borderColor}
                isChecked={item.isSelected}
                onpress={() => onAccountSelection( item )}
              />
            </View>
            <AppBottomSheetTouchableWrapper activeOpacity={10} onPress={() => onAccountSelection( item )}  style={{
              flexDirection:'row', backgroundColor: Colors.backgroundColor1, width: wp( '80%' ), padding: wp( '3%' ), borderRadius: 10
            }}>
              <View style={{
                width: wp( '17%' ), height: wp( '17%' ), backgroundColor: Colors.backgroundColor, borderRadius: wp( '17%' )/2, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor: Colors.white,
                shadowOffset: {
                  width: 0,
                  height: item.isSelected ? 5 : 0,
                },
                shadowOpacity: item.isSelected ? 0.7 : 0,
                shadowColor: item.isSelected ? Colors.borderColor: Colors.backgroundColor,
                shadowRadius: 5,
                elevation: item.isSelected ? 10 : 0,

              }}>
                <Image source={item.accountImage} style={{
                  width: wp( '10%' ), height: wp( '10%' )
                }} />
              </View>
              <View style={{
                marginLeft: wp( '2%' ), alignSelf:'center'
              }}>
                <Text style={{
                  color: Colors.black, fontFamily: Fonts.Regular, fontSize: RFValue( 20 )
                }}>{item.accountName}</Text>
                <Text style={{
                  color: Colors.blue, fontFamily: Fonts.MediumItalic, fontSize: RFValue( 10 ), marginTop: 5
                }}>{`${strings.availableToSpend} ${item.accountBalance} sats`}</Text>
              </View>
            </AppBottomSheetTouchableWrapper>
          </View>
        } )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 'auto',
          alignItems: 'center',
          marginBottom: hp( '4%' ),
        }}
      >
        <AppBottomSheetTouchableWrapper
          disabled={props.loading}
          onPress={() => {
            props.onPressConfirm( SelectedAccountType )
          }}
          style={styles.successModalButtonView}
        >
          {props.loading && props.loading == true ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.proceedButtonText}>{common.confirm}</Text>
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
            {common.back}
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
  },
  successModalHeaderView: {
    marginTop: hp( '2%' ),
    marginRight: wp( '6%' ),
    marginLeft: wp( '6%' ),
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
