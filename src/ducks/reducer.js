const initialState = {
    tabList: [],
    tabContent: '',
    loading: false
};

//ACTION TYPES
const UPDATE_TAB_LIST = 'UPDATE_TAB_LIST';
const UPDATE_TAB_LIST_PENDING = 'UPDATE_TAB_LIST_PENDING';
const UPDATE_TAB_LIST_FULFILLED = 'UPDATE_TAB_LIST_FULFILLED';
const CLEAR_RESULTS = 'CLEAR_RESULTS';
const RENDER_TAB_CONTENT = 'RENDER_TAB_CONTENT';

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

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TAB_LIST:
            return Object.assign({}, state, { tabList: action.payload });
        case UPDATE_TAB_LIST_PENDING:

        case UPDATE_TAB_LIST_FULFILLED:
            return
        case CLEAR_RESULTS:
            return Object.assign({}, state, { tabList: action.payload });
        case RENDER_TAB_CONTENT:
            return Object.assign({}, state, { tabContent: action.payload });
        default:
            return state;
    }
}
