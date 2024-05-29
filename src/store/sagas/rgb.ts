import { call, put, select } from 'redux-saga/effects';
import AccountOperations from 'src/bitcoin/utilities/accounts/AccountOperations';
import { AccountType, Accounts, RGBConfig } from '../../bitcoin/utilities/Interface';
import RGBServices from '../../services/RGBServices';
import {
  CREATE_UTXOS,
  RECEIVE_RGB_ASSET,
  SYNC_RGB,
  setReceiveData,
  setRgb121Assets,
  setRgb20Assets,
  setRgbSyncing,
} from '../actions/rgb';
import { AccountsState } from '../reducers/accounts';
import { createWatcher } from '../utils/utilities';

export function* syncRgbWorker() {
  try {
    yield put(setRgbSyncing(true));
    const { mnemonic, xpub }: RGBConfig = yield select((state) => state.rgb.config);
    // const sync = yield call( RGBServices.sync, mnemonic )
    const assets = yield call(RGBServices.syncRgbAssets, mnemonic, xpub);
    if (assets.nia) yield put(setRgb20Assets(assets.nia));
    if (assets.cfa) yield put(setRgb121Assets(assets.cfa));
    yield put(setRgbSyncing(false));
  } catch (err) {
    yield put(setRgbSyncing(false));
  }
}

export const rgbSyncWatcher = createWatcher(syncRgbWorker, SYNC_RGB);

export function* receiveRgbAssetWorker() {
  const { receiveAssets } = yield select((state) => state.rgb);
  const { mnemonic }: RGBConfig = yield select((state) => state.rgb.config);

  try {
    yield put(
      setReceiveData({
        message: '',
        loading: true,
        isError: false,
        data: receiveAssets.data,
      })
    );

    const invoiceData = yield call(RGBServices.receiveAsset, mnemonic);
    if (invoiceData.error) {
      yield put(
        setReceiveData({
          message: invoiceData.error,
          loading: false,
          isError: true,
          data: receiveAssets.data,
        })
      );
    } else {
      yield put(
        setReceiveData({
          message: '',
          loading: false,
          isError: false,
          data: invoiceData,
        })
      );
    }
  } catch (err) {
    yield put(
      setReceiveData({
        message: 'Failed to generate invoice',
        loading: false,
        isError: true,
        data: receiveAssets.data,
      })
    );
  }
}

export function* createUtxosWorker() {
  try {
    const accountsState: AccountsState = yield select((state) => state.accounts);
    const accounts: Accounts = accountsState.accounts;
    const address =  yield call(RGBServices.getAddress)
    let accountId = ''
    for (const id in accounts) {
      const account = accounts[id];
      if (account.type === AccountType.TEST_ACCOUNT) {
        accountId = id;
        break;
      }
    }
    const account = accounts[accountId];
    const averageTxFeeByNetwork = accountsState.averageTxFees[account.networkType];
    const txid = yield call( AccountOperations.sendToAddress, account, address, 9000, averageTxFeeByNetwork )
    //const created = yield call(RGBServices.createUtxos)
  } catch (error) {
    console.log('error', error);
  }
}

export const createUtxosWatcher = createWatcher(createUtxosWorker, CREATE_UTXOS);

export const receiveRgbAssetWatcher = createWatcher(receiveRgbAssetWorker, RECEIVE_RGB_ASSET);
