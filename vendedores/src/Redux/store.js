import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  productCreateReviewReducer,
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
  productDetailsReducer,
} from "./Reducers/ProductReducers";
import {
  customerCreateReducer,
  customerDeleteReducer,
  customerEditReducer,
  customerListReducer,
  customerUpdateReducer,
  customerDetailsReducer,
} from "./Reducers/CustomerReducers";
import { cartReducer } from "./Reducers/CartReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productReviewCreate: productCreateReviewReducer,
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  customerList: customerListReducer,
  customerDetail: customerDetailsReducer,
  customerDelete: customerDeleteReducer,
  customerCreate: customerCreateReducer,
  customerEdit: customerEditReducer,
  customerUpdate: customerUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
