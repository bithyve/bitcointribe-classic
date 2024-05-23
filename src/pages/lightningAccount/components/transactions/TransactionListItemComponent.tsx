import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

export default class TransactionListItemComponent extends Component {
  constructor( props: any ) {
    super( props )
  }

  render() {
    return (
      <View>
        <View style = {{
          flex: 2,
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          margin: 5
        }}>
          <View>
            <Text>amount: {this.props.params.amount}</Text>
          </View>
          <View>
            <Text>timestamp: {this.props.params.time_stamp}</Text>
          </View>
        </View>

        <View style={{
          borderBottomWidth: 1, borderColor: 'grey', marginHorizontal: widthPercentageToDP( 4 )
        }} />
      </View>
    )
  }
}
