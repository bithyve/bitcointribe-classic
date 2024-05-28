import React from 'react'
import {
  ImageBackground,
  StatusBar,
  StyleSheet
} from 'react-native'
import {
  heightPercentageToDP
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import BuyContainer from './BuyContainer'

const BuyMenu = () => {
  return (
    <ImageBackground
      source={require( '../../assets/images/home-bg.png' )}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
      }}
      imageStyle={{
        resizeMode: 'stretch',
      }}
    >
      <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
      <BuyContainer containerView={styles.accountCardsSectionContainer} />

    </ImageBackground>
  )
}

const styles = StyleSheet.create( {
  accountCardsSectionContainer: {
    height: heightPercentageToDP( '70.83%' ),
    // marginTop: 30,
    backgroundColor: Colors.backgroundColor1,
    borderTopLeftRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 2,
      height: -1,
    },
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
} )

export default BuyMenu
