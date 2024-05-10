
import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  ActionTypes,
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
} from "./actions";

import axios from "axios";
import { formatDate } from "../../../helpers/formatDate";
import { v4 as uuid } from "uuid";
import { useNavigate} from "react-router-dom";

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
  orderSaved:false,
  orderUpdated:false
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
            { id: uuid(), product: null, quantity: 1, tva: 0 },
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
      return { ...state, loading: false, orderSaved: true };

    case ActionTypes.SAVE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.SWITCH_UPDATE_MODE:
      return {...state,mode:'update'}


    case ActionTypes.SWITCH_CREATE_MODE:
      return {...state,mode:'create'}

    case ActionTypes.GET_DEVIS_BY_NUMERO_START:
      return { ...state, loading: true };

    case ActionTypes.GET_DEVIS_BY_NUMERO_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.GET_DEVIS_BY_NUMERO_SUCCESS:
      const order  = action.payload;
      return { ...state, 
        order:{...order,orderLines:[...order.orderLines]}, 
        selectedCustomer:order.customer,
        loading: false, 
        error: null };

        case ActionTypes.UPDATE_ORDER_START:
          return { ...state, loading: true };
    
        case ActionTypes.UPDATE_ORDER_SUCCESS:
          return { ...state, loading: false, orderUpdated: true };
    
        case ActionTypes.UPDATE_ORDER_FAILURE:
          return { ...state, loading: false, error: action.payload };
    

    default:
      return state;
  }
};
export const OrderProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/clients");
        dispatch(setCustomers(response.data));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
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
      navigate('/')
    } catch (error) {
      dispatch(saveOrderFailure(error.message));
    } finally {
      setLoading(false);
    }
  };

  const getDevisByNumero = async (numero) => {
    dispatch(getDevisByNumeroStart());
    try {
      const response = await axios.get(`http://localhost:3000/devis/${numero}`);
      dispatch(getDevisByNumeroSuccess(response.data));
    } catch (error) {
      dispatch(getDevisByNumeroFailure(error.message));
    }
  };

  const updateOrder = async (order) => {
    dispatch(updateOrderStart());
    try {
      await axios.put(`http://localhost:3000/devis/${order.id}`, order);
      dispatch(updateOrderSuccess());
      navigate('/')
    } catch (error) {
      dispatch(updateOrderFailure(error.message));
    } finally {
      setLoading(false);
    }
  };


  return (
    <OrderContext.Provider
      value={{ store, dispatch, isLoading, error, saveOrder, getDevisByNumero,updateOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
