const initialState = {
    tabList: [],
    tabContent: '',
    isLoading: true,
    tabId: '',
    user: {},
    tabObject: {},
    userSearch: '',
    menuHeaderText: 'Learning music has never been easier',
    isFromFavorites: false,
    userFavorites: []
};

//ACTION TYPES
const UPDATE_TAB_LIST = 'UPDATE_TAB_LIST';
const UPDATE_TAB_LIST_PENDING = 'UPDATE_TAB_LIST_PENDING';
const UPDATE_TAB_LIST_FULFILLED = 'UPDATE_TAB_LIST_FULFILLED';
const CLEAR_RESULTS = 'CLEAR_RESULTS';
const CLEAR_TAB_CONTENT = 'CLEAR_TAB_CONTENT';
const RENDER_TAB_CONTENT = 'RENDER_TAB_CONTENT';
const GET_TAB_ID = 'GET_TAB_ID';
const SET_USER_INFO = 'SET_USER_INFO';
const CLEAR_USER_SESSION = 'CLEAR_USER_SESSION';
const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
const GET_TAB_OBJECT = 'GET_TAB_OBJECT';
const UPDATE_USER_SEARCH = 'UPDATE_USER_SEARCH';
const UPDATE_MENU_HEADER_TEXT = 'UPDATE_MENU_HEADER_TEXT';
const SET_FAVORITES_STATUS = 'SET_FAVORITES_STATUS';
const GET_USER_FAVORITES = 'GET_USER_FAVORITES';

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

export function setUserInfo(userInfo) {
    return {
        type: SET_USER_INFO,
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
    return {
        type: GET_TAB_OBJECT,
        payload: tabObj
    }
}

export function updateUserSearch(search) {
    return {
        type: UPDATE_USER_SEARCH,
        payload: search
    }

}

export function updateHeader(username) {
    return {
        type: UPDATE_MENU_HEADER_TEXT,
        payload: 'Welcome Back, ' + username
    }
}

export function setFavoritesStatus(status) {
    return {
        type: SET_FAVORITES_STATUS,
        payload: status
    }
}

export function getFavorites(favorites) {
    return {
        type: GET_USER_FAVORITES,
        payload: favorites
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
            return Object.assign({}, state, { tabContent: action.payload, tabObject: {} });

        case RENDER_TAB_CONTENT:
            return Object.assign({}, state, { tabContent: action.payload });
        
        case GET_TAB_ID:
            return Object.assign({}, state, { tabId: action.payload });

        case SET_USER_INFO:
            return Object.assign({}, state, { user: action.payload });
            
        case CLEAR_USER_SESSION:
            return Object.assign({}, state, { user: action.payload });
            
        case SET_LOADING_STATUS:
            return Object.assign({}, state, { isLoading: action.payload });

        case GET_TAB_OBJECT:
            return Object.assign({}, state, { tabObject: action.payload });

        case UPDATE_USER_SEARCH:
            return Object.assign({}, state, { userSearch: action.payload });

        case UPDATE_MENU_HEADER_TEXT:
            return Object.assign({}, state, { menuHeaderText: action.payload });

        case SET_FAVORITES_STATUS:
            return Object.assign({}, state, { isFromFavorites: action.payload });

        case GET_USER_FAVORITES:
            return Object.assign({}, state, { userFavorites: action.payload });
            
        default:
            return state;
    }
}
