import { chain } from 'icepick'
import LoginMethod from 'src/common/interfaces/LoginMethod'
import { Wallet } from '../../bitcoin/utilities/Interface'
import { COMPLETED_WALLET_SETUP } from '../actions/setupAndAuth'
import {
  KEY_FETCHED,
  SET_LOGIN_METHOD,
  UPDATE_WALLET
} from '../actions/storage'

const initialState: {
  wallet: Wallet;
  key: String;
  walletExists: boolean,
  loginMethod: LoginMethod;
} = {
  wallet: null,
  key: '',
  walletExists: false,
  loginMethod: LoginMethod.PIN,
}

export default ( state = initialState, action ) => {
  switch ( action.type ) {
      case UPDATE_WALLET:
        return chain( state )
          .setIn( [ 'wallet' ], action.payload.wallet )
          .value()

      case KEY_FETCHED:
        return chain( state ).setIn( [ 'key' ], action.payload.key ).value()

      case COMPLETED_WALLET_SETUP:
        return chain( state )
          .setIn( [ 'walletExists' ], true )
          .value()
          
      case SET_LOGIN_METHOD:
        console.log('action.payload.method', action.payload.method)
        return {
          ...state,
          loginMethod : action.payload.method
        }

  }
  return state
}
