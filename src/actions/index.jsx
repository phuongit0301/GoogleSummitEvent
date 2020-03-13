import {
  LOADING,
  FETCHING_DATA_GROUPS_SUCCESS,
  FETCHING_DATA_GROUPS_ERROR,
  HANDLE_GROUP_SELECTED_SUCCESS,
  HANDLE_GROUP_SELECTED_ERROR,
  SHOW_COIN_AUDIO,
  HIDE_COIN_AUDIO,
  HANDLE_STEP,
  HANDLE_CREATE_EXCEL_SUCCESS,
  HANDLE_CREATE_EXCEL_ERROR,
  FETCHING_CREATE_EXCEL,
  HANDLE_SHOW_ANSWER,
  HANDLE_HIDE_ANSWER,
  HANDLE_COME_BACK,
  HANDLE_GROUP_BEFORE_BEGIN,
  HANDLE_GROUP_WHEN_COME_BACK_SUCCESS,
  HANDLE_GROUP_WHEN_COME_BACK_ERROR,
  HANDLE_START_GAME,
  HANDLE_UPDATE_DATA_GROUP
} from '../private/constants';
import MainApi from '../api/MainApi';

function loading() {
  return { type: LOADING };
}
function fetchDataGroupsSuccess(payload) {
  return { type: FETCHING_DATA_GROUPS_SUCCESS, payload };
}
function fetchDataGroupsError(payload) {
  return { type: FETCHING_DATA_GROUPS_ERROR, payload };
}

export function fetchDataGroups() {
  return async dispatch => {
    dispatch(loading());
    const response = await MainApi.getGroups();
    if(!response.success) {
      dispatch(fetchDataGroupsError(response))
    }
    return dispatch(fetchDataGroupsSuccess(response.data));
  }
}

function handleGroupSuccess(payload) {
  return { type: HANDLE_GROUP_SELECTED_SUCCESS, payload };
}
function handleGroupError(payload) {
  return { type: HANDLE_GROUP_SELECTED_ERROR, payload };
}

export function handleGroup(dataGroupSelected, bool) {
  return async dispatch => {
    dispatch(loading());
    const data = encodeURIData({isUsed: bool});

    const response = await MainApi.updateGroups(dataGroupSelected._id, data);
    if(!response.success) {
      dispatch(handleGroupError(response));
    }
    dispatch(handleGroupSuccess({ dataGroupSelected, bool }));

    window.socket.emit('UPDATE_GROUP');
  }
}

export function handleUpdateDataGroup(groups) {
  return dispatch => {
    dispatch({ type: HANDLE_UPDATE_DATA_GROUP, payload: groups});
  }
}

export function handleStart() {
  return dispatch => { dispatch({ type: HANDLE_START_GAME }) };
}

function handleGroupWhenComeBackSuccess(payload) {
  return { type: HANDLE_GROUP_WHEN_COME_BACK_SUCCESS, payload };
}
function handleGroupWhenComeBackError(payload) {
  return { type: HANDLE_GROUP_WHEN_COME_BACK_ERROR, payload };
}

export function handleGroupWhenComeBack(dataGroupSelected, isComeBack) {
  return async dispatch => {
    dispatch(loading());
    const data = encodeURIData({isUsed: false});

    const response = await MainApi.updateGroups(dataGroupSelected._id, data);
    if(!response.success) {
      dispatch(handleGroupWhenComeBackError(response));
    }
    dispatch(handleGroupWhenComeBackSuccess({ dataGroupSelected: {}, isComeBack }));
    window.socket.emit('UPDATE_GROUP');
  }
}

export function handleGroupBeforeBegin(dataGroupSelected) {
  return async dispatch => {
    dispatch({ type: HANDLE_GROUP_BEFORE_BEGIN, payload: dataGroupSelected });
  }
}

export function handleSelectedQuestion(item, obj) {
  return dispatch => {
    dispatch({ type: SHOW_COIN_AUDIO, payload: { item, coins: obj.coins, sumLatest: obj.sumLatest, finalImpactScore: obj.finalImpactScore, isSubmit: obj.isSubmit } });

    setTimeout(() => {
      dispatch({ type: HIDE_COIN_AUDIO });
    }, 2000)
  }
}

export function handleStep() {
  return dispatch => {
    dispatch({ type: HANDLE_STEP });
  }
}

export function fetchingCreateDataExcel() {
  return dispatch => {
    dispatch({ type: FETCHING_CREATE_EXCEL });
  }
}
function fetchCreateDataExcelError(payload) {
  return {
    type: HANDLE_CREATE_EXCEL_ERROR,
    payload
  }
}

function fetchCreateDataExcelSuccess(payload) {
  return {
    type: HANDLE_CREATE_EXCEL_SUCCESS,
    payload
  }
}

export function fetchCreateDataExcel(data) {
  return async dispatch => {
    dispatch(fetchingCreateDataExcel());
    var formBody = [];

    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    const response = await MainApi.storeDataExcel(formBody);
    if(!response.success) {
      dispatch(fetchCreateDataExcelError(response))
    }
    dispatch(fetchCreateDataExcelSuccess(response));
  }
}

function encodeURIData(data) {
  var formBody = [];

    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    return formBody;
}

export function handleShowAnswer() {
  return dispatch => {
    dispatch({type: HANDLE_SHOW_ANSWER });
  }
}

export function handleHideAnswer() {
  return dispatch => {
    dispatch({ type: HANDLE_HIDE_ANSWER });
  }
}

export function resetWhenComeBack() {
  return dispatch => {
    dispatch({ type: HANDLE_COME_BACK });
  }
}