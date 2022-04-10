import {ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, ALL_CATEGORY_FAIL, CLEAR_ERRORS} from '../constants/categoryConstants';

export const categoryReducer = (state = {categories:[]}, action) => {

    switch(action.type) {
        case ALL_CATEGORY_REQUEST:
        return{
            loadingCategory:true,
            categories:[]
        };

        case ALL_CATEGORY_SUCCESS:
        return{
            loadingCategory:false,
            categories:action.payload.data,
        };

        case ALL_CATEGORY_FAIL:
        return{
            loadingCategory:false,
            errorCategory:action.payload
        };

        case CLEAR_ERRORS:
        return{
            ...state,
            errorCategory:null
        };

        default:
        return state;
    }
    
};