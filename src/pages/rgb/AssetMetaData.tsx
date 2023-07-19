import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Text,
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../common/Colors'
import CommonStyles from '../../common/Styles/Styles'
import { RFValue } from 'react-native-responsive-fontsize'
import RGBServices from '../../services/RGBServices'
import moment from 'moment'
import HeaderTitle from '../../components/HeaderTitle'
import Fonts from '../../common/Fonts'

const styles = StyleSheet.create( {
  lineItem: {
    marginBottom: RFValue( 2 ),
    padding: 2,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  textTitle: {
    flex: 2.5,
    fontSize: RFValue( 13 ),
    color: '#6C7074',
    fontFamily: Fonts.Medium
  },
  title: {
    fontSize: RFValue( 15 ),
    color: '#A36363',
    fontFamily: Fonts.Medium,
    marginVertical: 10
  },
  textValue: {
    flex: 4,
    fontSize: RFValue( 14 ),
    color: '#2C3E50',
    fontFamily: Fonts.Regular
  }
} )

export const DetailsItem = ( { name, value } ) => {
  return(
    <View style={styles.lineItem}>
      <Text style={styles.textTitle}>{name}</Text>
      <Text
        selectable
        numberOfLines={1}
        ellipsizeMode="middle"
        style={styles.textValue}
      >
        {value}
      </Text>
    </View>
  )
}

const AssetMetaData = ( props ) => {
  const [ loading, setLoading ] = useState( true )
  const asset = props.navigation.getParam( 'asset' )
  const [ metaData, setMetaData ] = useState( {
  } )

  useEffect( () => {
    getMetaData()
  }, [] )

  const getMetaData = async () => {
    try {
      const data = await RGBServices.getRgbAssetMetaData( asset.assetId )
      if ( data ) {
        setMetaData( data )
        setLoading( false )
      } else {
        props.navigation.goBack()
      }

    } catch ( error ) {
      props.navigation.goBack()
      console.log( error )
    }
  }


  return (
    <SafeAreaView style={{
      flex: 1, backgroundColor: Colors.backgroundColor
    }}>
      <StatusBar backgroundColor={Colors.backgroundColor} barStyle="dark-content" />
      <View style={CommonStyles.headerContainer}>
        <TouchableOpacity
          style={CommonStyles.headerLeftIconContainer}
          onPress={() => {
            props.navigation.goBack()
          }}
        >
          <View style={CommonStyles.headerLeftIconInnerContainer}>
            <FontAwesome
              name="long-arrow-left"
              color={Colors.homepageButtonColor}
              size={17}
            />
          </View>
        </TouchableOpacity>
      </View>
      <HeaderTitle
        firstLineTitle={'Asset Details'}
        secondLineTitle={asset.name}
        infoTextNormal={''}
        infoTextBold={''}
        infoTextNormal1={''}
        step={''}
      />
      {
        loading ?
          <ActivityIndicator size="large" style={{
            height: '70%'
          }}/> :
          <ScrollView contentContainerStyle={{
            padding: 20
          }}>
            {
              asset.dataPaths && (
                <View>
                  <Image
                    style={{
                      height: '100%'
                    }}
                    resizeMode="contain"
                    source={{
                      uri: asset.dataPaths[ 0 ].filePath
                    }}
                  />

                </View>
              )
            }
            <Text style={styles.title}>Asset Meta Data</Text>
            <DetailsItem
              name="Asset ID"
              value={metaData.assetId}
            />

            <DetailsItem
              name="Issued Supply"
              value={metaData.issuedSupply.toLocaleString()}
            />

            <DetailsItem
              name="Asset Type"
              value={metaData.assetType}
            />

            <DetailsItem
              name="Timestamp"
              value={moment.unix( metaData.timestamp ).format( 'DD/MM/YY • hh:MMa' )}
            />

          </ScrollView>
      }


    </SafeAreaView>
  )
}

export default AssetMetaData
