import axios from 'axios';

const initialState = {
    tabList: [],
    tabContent: '',
    isLoading: true,
    tabId: '',
    user: {},
    tabObject: {}
};

//ACTION TYPES
const UPDATE_TAB_LIST = 'UPDATE_TAB_LIST';
const UPDATE_TAB_LIST_PENDING = 'UPDATE_TAB_LIST_PENDING';
const UPDATE_TAB_LIST_FULFILLED = 'UPDATE_TAB_LIST_FULFILLED';
const CLEAR_RESULTS = 'CLEAR_RESULTS';
const CLEAR_TAB_CONTENT = 'CLEAR_TAB_CONTENT';
const RENDER_TAB_CONTENT = 'RENDER_TAB_CONTENT';
const GET_TAB_ID = 'GET_TAB_ID';
const GET_USER_INFO = 'GET_USER_INFO';
const CLEAR_USER_SESSION = 'CLEAR_USER_SESSION';
const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
const GET_TAB_OBJECT = 'GET_TAB_OBJECT';

//ACTION CREATOR 
export function updateTabList(tabList) {
    return {
        type: UPDATE_TAB_LIST,
        payload: tabList
    }
}

export function clearResults() {
    return {
        type: CLEAR_RESULTS,
        payload: []
    }
}

export function renderTabResults(url) {
    return {
        type: RENDER_TAB_CONTENT,
        payload: url
    }
}

export function clearTabContent() {
    return {
        type: CLEAR_TAB_CONTENT,
        payload: ''
    }
}

export function getTabId(tabId) {
    return {
        type: GET_TAB_ID,
        payload: tabId
    }
}

export function getUserInfo() {
    let userInfo = axios.get('/auth/me').then(res => {
        if (res.data !== 'User not found') {
            return res.data;
        }
    })
    return {
        type: GET_USER_INFO,
        payload: userInfo
    }
}

export function setLoadingStatus(status) {
    return {
        type: SET_LOADING_STATUS,
        payload: status
    }
}

export function clearUserSession() {
    return {
        type: CLEAR_USER_SESSION,
        payload: {}
    }
}

export function getTabObject(tabObj) {
    console.log('HERE IS THE TAB OBJECT ', tabObj);
    return {
        type: GET_TAB_OBJECT,
        payload: tabObj
    }
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TAB_LIST:
            return Object.assign({}, state, { tabList: action.payload });

        case UPDATE_TAB_LIST_PENDING:
            return Object.assign({}, state, { loading: true });

        case UPDATE_TAB_LIST_FULFILLED:
            return Object.assign({}, state, { loading: false, tabList: action.payload });

        case CLEAR_RESULTS:
            return Object.assign({}, state, { tabList: action.payload, isLoading: true });
        
        case CLEAR_TAB_CONTENT:
            return Object.assign({}, state, { tabContent: action.payload });

        case RENDER_TAB_CONTENT:
            return Object.assign({}, state, { tabContent: action.payload });
        
        case GET_TAB_ID:
            return Object.assign({}, state, { tabId: action.payload });

        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
            
        case CLEAR_USER_SESSION:
            return Object.assign({}, state, { user: action.payload });
            
        case SET_LOADING_STATUS:
            return Object.assign({}, state, { isLoading: action.payload });

        case GET_TAB_OBJECT:
            return Object.assign({}, state, { tabObject: action.payload });
            
        default:
            return state;
    }
}
