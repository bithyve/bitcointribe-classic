import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../common/Colors'
import { LocalizationContext } from '../../common/content/LocContext'
import ListStyles from '../../common/Styles/ListStyles'

const BottomSheetWalletHeader = ( { title, onPress } ) => {
  const { translations } = useContext( LocalizationContext )
  const strings = translations[ 'home' ].manyWays
  if ( !title )  { return null }
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
          width: wp( 7 ), height: wp( 7 ), borderRadius: wp( 7/2 ),
          alignSelf: 'flex-end',
          backgroundColor: Colors.CLOSE_ICON_COLOR, alignItems: 'center', justifyContent: 'center',
          marginTop: wp( 3 ), marginRight: wp( 3 )
        }}
      >
        <FontAwesome name="close" color={Colors.white} size={19} style={{
        // marginTop: hp( 0.5 )
        }} />
      </TouchableOpacity>
      <Text style={ListStyles.modalTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create( {
  headerContainer: {
    backgroundColor: Colors.bgColor,
    paddingBottom: heightPercentageToDP( 4 )
  }
} )


export default BottomSheetWalletHeader
