import {ADD_TO_CART, REMOVE_CART_ITEM, REMOVE_ALL_CART_ITEM} from '../constants/cartConstants';

export const cartReducer = (state = {cartItems:[]}, action) => {

    switch(action.type) {
        case ADD_TO_CART:
        const item = action.payload;

        const isItemExist = state.cartItems.find(
            (i) => i.sku === item.sku
        );

        if(isItemExist) {
            return {
                ...state,
                cartItems: state.cartItems.map((i) => 
                    i.sku === isItemExist.sku ? item : i
                ),
            };

        }else{
            return {
                ...state,
                cartItems: [...state.cartItems, item],
            };
        }

        case REMOVE_CART_ITEM:
        return{
            ...state,
            cartItems: state.cartItems.filter((i) => i.sku !== action.payload),
        }

        case REMOVE_ALL_CART_ITEM:
        return{
            ...state,
            cartItems: [],
        }

        default:
        return state;
    }
    
};