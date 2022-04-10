import axios from 'axios';
import {ADD_TO_CART, REMOVE_CART_ITEM, REMOVE_ALL_CART_ITEM} from '../constants/cartConstants';

export const addItemsToCart = (id, qty, addOn, addOnPrice, food_type, prepare_time, product_type,sku) => async (dispatch, getState) => {
    const {data} = await axios.get(`https://heebeetestapi.quadbtech.com/api/v1/webpos/get_single_product?product=${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: data.data.product_id,
            name: data.data.product_list.product_name,
            price: data.data.product_list.price,
            image: data.data.product_list.card_img,
            stock: data.data.items_available,
            add_ons: addOn,
            add_on_price: addOnPrice,
            qty,
            food_type,
            prepare_time,
            product_type,
            sku
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


//remove from cart
export const removeItemsFromCart = (sku) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: sku,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

//remove all items from cart
export const removeAllItemsFromCart = () => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ALL_CART_ITEM,
    });

    localStorage.removeItem('cartItems');
    localStorage.removeItem('customerInfo');
    localStorage.removeItem("bday", 'true');
}
