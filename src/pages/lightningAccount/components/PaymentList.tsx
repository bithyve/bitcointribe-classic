import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, { Component, ReactElement } from 'react'
import { FlatList, StatusBar, StyleSheet, View } from 'react-native'
import Payment from '../../../models/Payment'
import PaymentItem from './PaymentItem'

export default class PaymentList extends Component {
  constructor( props: any ) {
    super( props )
  }

    uniqueKey = ( item:any, index: number ) => index.toString();

    renderTemplate = ( { item } : {item: Payment } ): ReactElement => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate( 'PaymentDetailsScreen', {
              payment:item
            } )
          }}
        >
          <PaymentItem payment={item}/>
        </TouchableOpacity>
      )
    }

    render() {
      return (
        <View
          style={styles.container}>
          <FlatList
            data={this.props.payments}
            renderItem={this.renderTemplate}
            keyExtractor={this.uniqueKey}
          />
        </View>
      )
    }
}


const styles = StyleSheet.create( {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
} )
