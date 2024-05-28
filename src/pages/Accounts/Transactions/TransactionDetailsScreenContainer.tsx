import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TransactionDescribing from '../../../common/data/models/Transactions/Interfaces';

export type Props = {
  navigation: any;
  route: any;
};


const TransactionDetailsScreenContainer: React.FC<Props> = ( {
  navigation,
  route
}: Props ) => {
  const transactionID: TransactionDescribing = useMemo( () => {
    return route.params?.txID
  }, [ navigation ] )

  return (
    <View style={styles.rootContainer}>
      <Text>New TransactionDetails Container</Text>
      <Text>Transaction ID: {transactionID}</Text>
    </View>
  )
}

const styles = StyleSheet.create( {
  rootContainer: {
  }
} )

export default TransactionDetailsScreenContainer
