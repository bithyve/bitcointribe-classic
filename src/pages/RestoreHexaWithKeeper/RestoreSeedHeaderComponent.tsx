import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import { translations } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'

const RestoreSeedHeaderComponent = ( props ) => {
  const strings  = translations[ 'bhr' ]

  return (
    <View style={styles.modalHeaderTitleView}>
      <TouchableOpacity
        onPress={() => props.onPressBack()}
        style={{
          height: wp( '10%' ), width: wp( '10%' ), alignItems: 'center'
        }}
      >
        <Image
          source={require( '../../assets/images/icons/icon_back.png' )}
          style={{
            width: wp( '5%' ), height: wp( '2%' ), tintColor: Colors.homepageButtonColor
          }}
        />
      </TouchableOpacity>
      <Text style={styles.titleText}>{props.selectedTitle}</Text>
    </View>
  )
}

export default RestoreSeedHeaderComponent

const styles = StyleSheet.create( {
  modalHeaderTitleView: {
    // borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    // alignItems: 'center',
    // flexDirection: 'row',
    paddingBottom: hp( '2%' ),
    marginTop: 20,
    marginBottom: 15,
    marginLeft: wp( '4%' ),
    marginRight: wp( '4%' ),
  },
  titleText: {
    marginLeft: wp( '4%' ),
    color: Colors.THEAM_TEXT_COLOR,
    fontSize: RFValue( 20 ),
    fontFamily: Fonts.Regular,
  },
} )
