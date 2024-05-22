import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'

export default function BackupUpgradeSuccess( props ) {
  return (
    <View style={styles.modalContentContainer}>
      <View style={styles.successModalHeaderView}>
        <Text style={styles.headerTitleText}>{props.title}</Text>
        <Text style={styles.headerInfoText}>{props.subText}</Text>
      </View>
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center'
      }}>
        <View style={styles.greyBox}>
          <Image
            source={require( '../../assets/images/icons/keeper_sheild.png' )}
            style={{
              width: wp( '15%' ), height: wp( '15%' ), resizeMode: 'contain'
            }}
          />
          <View style={{
            marginLeft: 10
          }}>
            <Text style={styles.greyBoxText}>{props.cardInfo}</Text>
            <Text
              style={{
                ...styles.greyBoxText,
                fontSize: RFValue( 20 ),
              }}
            >
              {props.cardTitle}
            </Text>
            <Text
              style={{
                ...styles.greyBoxText,
                fontSize: RFValue( 10 ),
              }}
            >
              {props.cardSubInfo}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.successModalAmountView}>
        <Text style={styles.bottomInfoText}>{props.info}</Text>
      </View>
      <View style={styles.bottomButtonsView}>
        <AppBottomSheetTouchableWrapper
          onPress={() => props.onPressProceed()}
          style={styles.successModalButtonView}
        >
          <Text
            style={{
              ...styles.proceedButtonText,
              color: Colors.white,
            }}
          >
            {props.proceedButtonText}
          </Text>
        </AppBottomSheetTouchableWrapper>
        <AppBottomSheetTouchableWrapper
          onPress={() => props.onPressBack()}
          style={styles.transparentButtonView}
        >
          <Text
            style={{
              ...styles.proceedButtonText,
              color: Colors.blue,
            }}
          >
            {props.backButtonText}
          </Text>
        </AppBottomSheetTouchableWrapper>
        <Image
          source={
            props.bottomImage
              ? props.bottomImage
              : require( '../../assets/images/icons/success.png' )
          }
          style={styles.successModalImage}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  modalContentContainer: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  headerTitleText: {
    color: Colors.blue,
    fontSize: RFValue( 18 ),
    fontFamily: Fonts.Medium,
  },
  headerInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Regular,
    marginTop: wp( '1.5%' ),
  },
  bottomInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Regular,
    marginBottom: hp( '1%' ),
    marginTop: 'auto',
  },
  bottomButtonsView: {
    height: hp( '15%' ),
    flexDirection: 'row',
    alignItems: 'center',
  },
  transparentButtonView: {
    height: wp( '13%' ),
    width: wp( '35%' ),
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalHeaderView: {
    marginRight: wp( '8%' ),
    marginLeft: wp( '8%' ),
    marginTop: wp( '4%' ),
  },
  successModalAmountView: {
    justifyContent: 'center',
    marginRight: wp( '8%' ),
    marginLeft: wp( '8%' ),
    marginTop: 'auto',
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
  greyBox: {
    width: wp( '90%' ),
    borderRadius: 10,
    backgroundColor: Colors.backgroundColor1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greyBoxText: {
    color: Colors.textColorGrey,
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 11 ),
  },
  successModalImage: {
    width: wp( '30%' ),
    height: wp( '35%' ),
    marginLeft: 'auto',
    resizeMode: 'stretch',
    marginRight: -5,
  },
} )
