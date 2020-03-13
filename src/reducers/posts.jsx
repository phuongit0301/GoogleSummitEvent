import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';

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
    GET_DATA_GROUPS,
    HANDLE_GROUP_WHEN_COME_BACK_SUCCESS,
    HANDLE_GROUP_WHEN_COME_BACK_ERROR,
    HANDLE_START_GAME,
    HANDLE_UPDATE_DATA_GROUP
} from '../private/constants';

const initState = {
    loading: false,
    error: false,
    message: '',
    data: [],
    dataGroupSelected: null,
    dataQuestionSelected: null,
    isShowAudio: false,
    steps: 1,
    dataCoins: null,
    dataPeopleImpact: null,
    isShowAnswer: false,
    finalImpactScore: 2,
    isReset: false,
    isSubmit: false,
    isStart: false,
    dataSummary: [],
    isComeBack: false
};

export function posts(state = initState, action) {
    switch (action.type) {
        case LOADING:
        case FETCHING_CREATE_EXCEL:
            return { ...state, loading: true };
        case FETCHING_DATA_GROUPS_SUCCESS:
            console.log('action.payload=====', action.payload);
            return { ...state, ...action.payload, steps: 1, finalImpactScore: 2, coinsIncrementLatest: 50, loading: false };
        case FETCHING_DATA_GROUPS_ERROR:
            return { ...state, loading: false, error: true };
        case HANDLE_GROUP_SELECTED_SUCCESS:
            state.data.coins = 50;
            if(action.payload.bool) {
                state.data.groups = state.data.groups.map(item => {
                    item.isUsed = action.payload.dataGroupSelected._id == item._id ? true : item.isUsed;
                    return item;
                });
            }
            return { 
                ...state, dataGroupSelected: action.payload.bool ? action.payload.dataGroupSelected : {}, error: false, loading: false, 
                isShowAnswer: false, finalImpactScore: action.payload.bool ? state.finalImpactScore : 2, isReset: !action.payload.bool,
                dataCoins: null, dataPeopleImpact: null, dataQuestionSelected: null, coinsIncrementLatest: 50, dataSummary: [], isComeBack: false,
                isStart: false
            };
        case HANDLE_START_GAME: 
            return { ...state, isStart: true };
        case GET_DATA_GROUPS: 
            state.data.groups = action.payload.groups;
            return { ...state };
        case HANDLE_GROUP_SELECTED_ERROR:
            return { ...state, ...action.payload, error: true };
        case SHOW_COIN_AUDIO:
            state.data.coins = action.payload.coins;
            state.data.sumLatest = action.payload.sumLatest;

            const dataGainLoss = handleGainLoss(state.data, action.payload);
            let htmlWrapper = "<div class='icons-wrapper'>";
            let htmlCostIcon = `${htmlWrapper}<i class="${dataGainLoss.objItemCostIcons.iconClass}" style="font-size:30px;"></i>`;
            let htmlProductiveIcon = `${htmlWrapper}<i class="${dataGainLoss.objItemProductiveIcons.iconClass}" style="font-size:30px;"></i>`;
            if(dataGainLoss.objItemCostIcons.hasTripleIcon) {
                htmlCostIcon += `<i class="${dataGainLoss.objItemCostIcons.iconClass2}" style="font-size:30px;"></i>`;
            }
            if(dataGainLoss.objItemProductiveIcons.hasTripleIcon) {
                htmlProductiveIcon += `<i class="${dataGainLoss.objItemProductiveIcons.iconClass2}" style="font-size:30px;"></i>`;
            }
            htmlCostIcon += "</div>";
            htmlProductiveIcon += "</div>";

            return {
                ...state,
                dataCoins: [{ key: `coin-${action.payload.item.id}`, text: `<span class="text-wrapper ${dataGainLoss.dataItem.class}">+${action.payload.item.productivity}</span>${htmlCostIcon}` }],
                dataCoinsMessage: dataGainLoss.dataItem.title,
                dataPeopleImpact: [{ key: `people-impact-${action.payload.item.id}`, text: `<span class="text-wrapper ${dataGainLoss.dataItem.class}"></span>${htmlProductiveIcon}` }],
                finalImpactScore: action.payload.finalImpactScore > 10 ? 10 : action.payload.finalImpactScore,
                classCurrent: dataGainLoss.dataItem.class,
                dataQuestionSelected: action.payload.item,
                coinsIncrementLatest: action.payload.coins + action.payload.item.productivity,
                isShowAudio: true,
                isSubmit: action.payload.isSubmit,
                dataSummary: [...state.dataSummary, { finalImpactScore: action.payload.finalImpactScore > 10 ? 10 : action.payload.finalImpactScore, coinsIncrementLatest: action.payload.coins + action.payload.item.productivity, question: action.payload.item.title }]
            }
        case HIDE_COIN_AUDIO:
            return { ...state, isShowAudio: false };
        case HANDLE_STEP:
            return { ...state, steps: state.steps + 1 };
        case HANDLE_CREATE_EXCEL_SUCCESS:
        case HANDLE_CREATE_EXCEL_ERROR:
            return { ...state, ...action.payload, loading: false, isSubmit: action.payload.isSubmit };
        case HANDLE_SHOW_ANSWER:
            return { ...state, isShowAnswer: true }
        case HANDLE_HIDE_ANSWER:
            state.data.coins = state.coinsIncrementLatest;
            return { ...state, steps: state.steps + 1, isShowAnswer: false }
        case HANDLE_COME_BACK:
            return { ...state, loading: false, isSubmit: false, finalImpactScore: initState.finalImpactScore, steps: initState.steps };
        case HANDLE_GROUP_WHEN_COME_BACK_SUCCESS:
            return { ...state, dataGroupSelected: action.payload.dataGroupSelected, isComeBack: action.payload.isComeBack, isStart: false };
        case HANDLE_GROUP_WHEN_COME_BACK_ERROR:
            return { ...state, ...action.payload };
        case HANDLE_UPDATE_DATA_GROUP:
            state.data.groups = action.payload;
            return { ...state }
        case REHYDRATE:
        case "persist/REHYDRATE":
            if(action.payload && action.payload.data) {
                action.payload.data.coins = state.data.coins;
                action.payload.data.coinsRoot = state.data.coinsRoot;
                action.payload.data.cultureGrade = state.data.cultureGrade;
                action.payload.data.sumLatest = state.data.sumLatest;
            }
            let dataHydrate = (action.payload && action.payload.datas) ? action.payload.datas : action.payload;
            return { ...state, ...dataHydrate };
        case HANDLE_GROUP_BEFORE_BEGIN:
            return { ...state, dataGroupSelected: action.payload };
        default:
            return { ...state };
    }
}

function handleGainLoss(datas, payload) {
    let objItemCostIcons = '';
    let objItemProductiveIcons = '';
    datas.invesmentCostStatusData.map(item => {
        if(item.name == payload.item.invesmentCostStatus.toLowerCase()) {
            objItemCostIcons = item;
        }

        if(item.name == payload.item.productivityStatus.toLowerCase()) {
            objItemProductiveIcons = item;
        }
    })
    
    let dataItem = '';

    datas.dataRevenueMessage.map(item => {
        if(item.impactValue === payload.item.peopleImpact) {
            dataItem = item;
        }
    })
    return { objItemCostIcons, objItemProductiveIcons, dataItem };
}