import React, { createContext, useReducer, useContext, useEffect } from "react";
import {
  ActionTypes,
  fetchCustomersFailure,
  fetchCustomersSuccess,
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  getDevisByNumeroFailure,
  getDevisByNumeroStart,
  getDevisByNumeroSuccess,
  saveOrderFailure,
  saveOrderStart,
  saveOrderSuccess,
  setCustomers,
  setProducts,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  fetchCustomersStart,
} from "./actions";

import axios from "axios";
import { formatDate } from "../../../helpers/formatDate";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { ContextDevTool } from "react-context-devtool";

const OrderContext = createContext();

const initialState = {
  mode: "create", //'update'
  order: {
    customerId: null,
    customer: null,
    orderDate: formatDate(new Date()),
    orderLines: [],
  },
  selectedCustomer: null,
  selectedProduct: null,
  customers: [],
  products: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CUSTOMERS:
      return { ...state, customers: action.payload };

    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };

    case ActionTypes.SELECT_CUSTOMER:
      return {
        ...state,
        order: {
          ...state.order,
          customerId: action.payload.customerId,
          customer: action.payload.customer,
        },
      };

    case ActionTypes.ADD_ORDER_LINE:
      return {
        ...state,
        order: {
          ...state.order,
          orderLines: [
            ...state.order.orderLines,
            { id: uuid(), product: null, quantity: 1, tva: 0, discount: 0 },
          ],
        },
      };

    case ActionTypes.UPDATE_ORDER_LINE:
      return {
        ...state,
        order: {
          ...state.order,
          orderLines: action.payload,
        },
      };

    case ActionTypes.SELECT_PRODUCT:
      const { index, id } = action.payload;
      const orderLines = [...state.order.orderLines];
      orderLines[index].product = id;
      return { ...state, order: { ...state.order, orderLines } };

    case ActionTypes.UPDATE_QUANTITY:
      const { lineIndex, quantity } = action.payload;
      const updatedOrderLines = [...state.order.orderLines];
      updatedOrderLines[lineIndex].quantity = quantity;
      return {
        ...state,
        order: { ...state.order, orderLines: updatedOrderLines },
      };

    case ActionTypes.UPDATE_DISCOUNT:
      const { lineIndex: lIndex, discount } = action.payload;
      const updatedOrderLinesforDiscout = [...state.order.orderLines];
      updatedOrderLinesforDiscout[lIndex].discount = discount;
      return {
        ...state,
        order: { ...state.order, orderLines: updatedOrderLinesforDiscout },
      };

    case ActionTypes.SET_SELECTED_CUSTOMER:
      return { ...state, selectedCustomer: action.payload };

    case ActionTypes.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };

    case ActionTypes.UPDATE_ORDER_DATE:
      return { ...state, order: { ...state.order, orderDate: action.payload } };

    case ActionTypes.DELETE_ORDER_LINE:
      const lineId = action.payload;
      const afterDeleteLineById = state.order.orderLines.filter(
        (line) => line.id !== lineId
      );
      return {
        ...state,
        order: { ...state.order, orderLines: afterDeleteLineById },
      };

    case ActionTypes.SAVE_ORDER_START:
      return { ...state, loading: true };

    case ActionTypes.SAVE_ORDER_SUCCESS:
      return { ...state, loading: false };

    case ActionTypes.SAVE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.SWITCH_UPDATE_MODE:
      return { ...state, mode: "update" };

    case ActionTypes.SWITCH_CREATE_MODE:
      return { ...state, mode: "create" };

    case ActionTypes.GET_DEVIS_BY_NUMERO_START:
      return { ...state, loading: true };

    case ActionTypes.GET_DEVIS_BY_NUMERO_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.GET_DEVIS_BY_NUMERO_SUCCESS:
      const order = action.payload;
      return {
        ...state,
        order: { ...order, orderLines: [...order.orderLines] },
        selectedCustomer: order.customer,
        loading: false,
        error: null,
      };

    case ActionTypes.UPDATE_ORDER_START:
      return { ...state, loading: true };

    case ActionTypes.UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false };

    case ActionTypes.UPDATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.FETCH_CUSTOMERS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.FETCH_CUSTOMERS_SUCCESS:
      return { ...state, loading: false, error: null };

    case ActionTypes.FETCH_CUSTOMERS_FALIURE:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.FETCH_PRODUCTS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, error: null };

    case ActionTypes.FETCH_PRODUCTS_FALIURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export const OrderProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      dispatch(fetchCustomersStart());
      try {
        const response = await axios.get("http://localhost:3000/clients");
        dispatch(fetchCustomersSuccess());
        dispatch(setCustomers(response.data));
      } catch (error) {
        dispatch(fetchCustomersFailure(error));
      }
    };

    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const response = await axios.get("http://localhost:3000/products");
        dispatch(fetchProductsSuccess());
        dispatch(setProducts(response.data));
      } catch (error) {
        dispatch(fetchProductsFailure(error));
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const saveOrder = async (order) => {
    dispatch(saveOrderStart());
    try {
      await axios.post("http://localhost:3000/devis", order);
      dispatch(saveOrderSuccess());
      navigate("/");
    } catch (error) {
      dispatch(saveOrderFailure(error));
    }
  };

  const getDevisByNumero = async (numero) => {
    dispatch(getDevisByNumeroStart());
    try {
      const response = await axios.get(`http://localhost:3000/devis/${numero}`);
      dispatch(getDevisByNumeroSuccess(response.data));
    } catch (error) {
      dispatch(getDevisByNumeroFailure(error));
    }
  };

  const updateOrder = async (order) => {
    dispatch(updateOrderStart());
    try {
      await axios.put(`http://localhost:3000/devis/${order.id}`, order);
      dispatch(updateOrderSuccess());
      navigate("/");
    } catch (error) {
      dispatch(updateOrderFailure(error));
    }
  };

  return (
    <>
      <OrderContext.Provider
        value={{
          store,
          dispatch,
          saveOrder,
          getDevisByNumero,
          updateOrder,
        }}
      >
        <ContextDevTool
          context={OrderContext}
          id="orderUniqContextId"
          displayName="Order Context"
        />
        {children}
        <OrderContext.Consumer>
          {(values) => {
            if (window.__REACT_CONTEXT_DEVTOOL) {
              window.__REACT_CONTEXT_DEVTOOL({
                id: "orderUniqContextId",
                displayName: "Order Context",
                values,
              });
            }
            return null;
          }}
        </OrderContext.Consumer>
      </OrderContext.Provider>
    </>
  );
};

export const useOrderContext = () => useContext(OrderContext);
