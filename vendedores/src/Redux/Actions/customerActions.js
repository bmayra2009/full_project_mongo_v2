import {
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_RESET,
  CUSTOMER_LIST_SUCCESS,
} from "../Constants/CustomerConstants";
import axios from "axios";

// ALL CUSTOMER
export const listCustomer = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/customers/all`, config);

    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: message,
    });
  }
};
