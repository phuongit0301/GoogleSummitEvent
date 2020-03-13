import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { posts } from './posts';

const rootConfig = {
  key: 'root',
  storage,
  blacklist: ['dataGroupSelected'],
  stateReconciler: autoMergeLevel2
}

const persistConfig = {
  key: 'dataGroupSelected',
  storage,
  blacklist: ['steps', 'cultureGradeIndex', 'coinsIncrementLatest', 
  'dataCoins', 'dataCultureGrade', 'finalImpactScore', 'isReset', 'isStart'],
  stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
  datas: persistReducer(persistConfig, posts),
  routing: routerReducer,
});

export default persistReducer(rootConfig, rootReducer);