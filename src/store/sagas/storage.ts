import { call, put, select } from 'redux-saga/effects';
import LoginMethod from 'src/common/interfaces/LoginMethod';
import { Wallet } from '../../bitcoin/utilities/Interface';
import dbManager from '../../storage/realm/dbManager';
import * as SecureStore from '../../storage/secure-store';
import { updateWalletImageHealth } from '../actions/BHR';
import { CHANGE_LOGIN_METHOD, setLoginMethod, updateWallet, UPDATE_USER_NAME } from '../actions/storage';
import { createWatcher } from '../utils/utilities';

function* updateUserNameWorker( { payload }: { payload: { userName: string }} ) {
  const { userName } = payload
  const wallet: Wallet = yield select( ( state ) => state.storage.wallet )
  wallet.userName = userName
  yield put( updateWallet( wallet ) )
  yield call( dbManager.updateWallet, {
    userName
  } )
  yield put( updateWalletImageHealth( {
  } ) )
}

export const updateUserNameWatcher = createWatcher(
  updateUserNameWorker,
  UPDATE_USER_NAME,
)

// Biometrics
function* changeLoginMethodWorker({
  payload,
}: {
  payload: { method: LoginMethod; pubKey: string };
}) {
  try {
    const { method, pubKey } = payload;
    if (method === LoginMethod.BIOMETRIC) {
      const savePubKey = yield call(SecureStore.storeBiometricPubKey, pubKey);
      if (savePubKey) {
        yield put(setLoginMethod(method));
      }
    } else {
      yield put(setLoginMethod(method));
    }
  } catch (err) {
    console.log({
      'err_': err
    });
  }
}

export const changeLoginMethodWatcher = createWatcher(changeLoginMethodWorker, CHANGE_LOGIN_METHOD);
