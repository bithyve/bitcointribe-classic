import React from 'react'
import {
  ActivityIndicator,
  Image, StyleSheet, Text, View
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'

export default function GiftStepperComponent( props ) {

  return(
    <View style={[ styles.container, props.extraContainer ]}>
      {
        props.showLoader ?
          <ActivityIndicator size="small" color={Colors.blue} />
          : <Image style={styles.circularView} resizeMode='contain' source={require( '../../assets/images/icons/checkmark.png' )}/>
      }
      <Text style={styles.setUpText}>{props.verifiedText}</Text>
    </View>
  )
}

const styles = StyleSheet.create( {
  container:{
    flexDirection:'row', marginHorizontal:20, alignItems:'center'
  },
  circularView:{
    width: 18, height:18, borderRadius:18
  },
  setUpText:{
    fontFamily: Fonts.Regular,
    marginStart: 8,
    fontSize: RFValue( 16 ),
    letterSpacing: 0.8,
    color: Colors.blue
  }
} )
