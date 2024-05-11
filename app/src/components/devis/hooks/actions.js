export const ActionTypes = {
  SET_CUSTOMERS: "[CUSTOMER] - SET_CUSTOMERS",
  SELECT_CUSTOMER: "[CUSTOMER] - SELECT_CUSTOMER",
  SET_SELECTED_CUSTOMER: "[CUSTOMER] - SET_SELECTED_CUSTOMER",
  FETCH_CUSTOMERS_START:"[CUSTOMER] - FETCH_CUSTOMERS_START",
  FETCH_CUSTOMERS_SUCCESS:"[CUSTOMER] - FETCH_CUSTOMER_SUCCESS",
  FETCH_CUSTOMERS_FALIURE:"[CUSTOMER] - FETCH_CUSTOMERS_FALIURE",
  SET_PRODUCTS: "[PRODUCT] - SET_PRODUCTS",
  SELECT_PRODUCT: "[PRODUCT] - SELECT_PRODUCT",
  SET_SELECTED_PRODUCT: "[PRODUCT] - SET_SELECTED_PRODUCT",
  FETCH_PRODUCTS_START:"[PRODUCT] - FETCH_PRODUCTS_START",
  FETCH_PRODUCTS_SUCCESS:"[PRODUCT] - FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAILURE:"[PRODUCT] - FETCH_PRODUCTS_FAILURE",
  SAVE_ORDER: "[ORDER] - SAVE_ORDER",
  UPDATE_ORDER_DATE: "[ORDER] - UPDATE_ORDER_DATE",
  ADD_ORDER_LINE: "[ORDER LINE] - ADD_ORDER_LINE",
  UPDATE_ORDER_LINE: "[ORDER LINE] - UPDATE_ORDER_LINE",
  UPDATE_QUANTITY: "[ORDER LINE] - UPDATE_QUANTITY",
  UPDATE_DISCOUNT: "[ORDER LINE] - UPDATE_DISCOUNT",
  DELETE_ORDER_LINE: "[ORDER LINE] - DELETE_ORDER_LINE",
  SAVE_ORDER_START: "[ORDER] - SAVE_ORDER_START",
  SAVE_ORDER_SUCCESS: "[ORDER] - SAVE_ORDER_SUCCESS",
  SAVE_ORDER_FAILURE: "[ORDER] - SAVE_ORDER_FAILURE",
  UPDATE_ORDER_START: "[ORDER] - UPDATE_ORDER_START",
  UPDATE_ORDER_SUCCESS: "[ORDER] - UPDATE_ORDER_SUCCESS",
  UPDATE_ORDER_FAILURE: "[ORDER] - UPDATE_ORDER_FAILURE",
  GET_DEVIS_BY_NUMERO_START: "[ORDER] - GET_DEVIS_BY_NUMERO_START",
  GET_DEVIS_BY_NUMERO_SUCCESS: "[ORDER] - GET_DEVIS_BY_NUMERO_SUCCESS",
  GET_DEVIS_BY_NUMERO_FAILURE: "[ORDER] - GET_DEVIS_BY_NUMERO_FAILURE",
  SWITCH_UPDATE_MODE:"[ORDER] - SWITCH_UPDATE_MODE",
  SWITCH_CREATE_MODE:"[ORDER] - SWITCH_CREATE_MODE",
};

export const setCustomers = (customers) => ({
  type: ActionTypes.SET_CUSTOMERS,
  payload: customers,
});

export const setProducts = (products) => ({
  type: ActionTypes.SET_PRODUCTS,
  payload: products,
});

export const selectCustomer = (customerId, customer) => ({
  type: ActionTypes.SELECT_CUSTOMER,
  payload: { customerId, customer },
});

export const addOrderLine = () => ({
  type: ActionTypes.ADD_ORDER_LINE,
});

export const updateOrderLine = (orderLines) => ({
  type: ActionTypes.UPDATE_ORDER_LINE,
  payload: orderLines,
});

export const selectProduct = (index, id) => ({
  type: ActionTypes.SELECT_PRODUCT,
  payload: { index, id },
});

export const updateQuantity = (lineIndex, quantity) => ({
  type: ActionTypes.UPDATE_QUANTITY,
  payload: { lineIndex, quantity },
});

export const updateDiscount = (lineIndex, discount)=>({
  type:ActionTypes.UPDATE_DISCOUNT,
  payload: {lineIndex,discount}
})

export const setSelectedCustomer = (customer) => ({
  type: ActionTypes.SET_SELECTED_CUSTOMER,
  payload: customer,
});

export const setSelectedProduct = (product) => ({
  type: ActionTypes.SET_SELECTED_PRODUCT,
  payload: product,
});

export const saveOrder = () => ({
  type: ActionTypes.SAVE_ORDER,
});

export const updateOrderDate = (orderDate) => ({
  type: ActionTypes.UPDATE_ORDER_DATE,
  payload: orderDate,
});

export const deleteOrderLine = (id) => ({
  type: ActionTypes.DELETE_ORDER_LINE,
  payload: id,
});

export const saveOrderStart = () => ({
  type: ActionTypes.SAVE_ORDER_START,
});
export const saveOrderSuccess = () => ({
  type: ActionTypes.SAVE_ORDER_SUCCESS,
});

export const saveOrderFailure = (error) => ({
  type: ActionTypes.SAVE_ORDER_SUCCESS,
  payload: error.message,
});

export const updateOrderStart = () => ({
  type: ActionTypes.UPDATE_ORDER_START,
});

export const updateOrderSuccess = () => ({
  type: ActionTypes.UPDATE_ORDER_SUCCESS,
});

export const updateOrderFailure = (error) => ({
  type: ActionTypes.UPDATE_ORDER_FAILURE,
  payload: error.message,
});

export const getDevisByNumeroStart = () => ({
  type: ActionTypes.GET_DEVIS_BY_NUMERO_START,
});

export const getDevisByNumeroSuccess = (order) => ({
  type: ActionTypes.GET_DEVIS_BY_NUMERO_SUCCESS,
  payload:order
});

export const getDevisByNumeroFailure = (error) => ({
  type: ActionTypes.GET_DEVIS_BY_NUMERO_FAILURE,
  payload: error,
});


export const switchUpdateMode = ()=>({
  type:ActionTypes.SWITCH_UPDATE_MODE
})
export const switchCreateMode = ()=>({
  type:ActionTypes.SWITCH_CREATE_MODE_MODE
})

export const fetchCustomersStart=()=>({
  type:ActionTypes.FETCH_CUSTOMERS_START

})

export const fetchCustomersSuccess=()=>({
  type:ActionTypes.FETCH_CUSTOMERS_SUCCESS

})

export const fetchCustomersFailure=(error)=>({
  type:ActionTypes.FETCH_PRODUCTS_FAILURE,
  payload:error.message

})

export const fetchProductsStart=()=>({
  type:ActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess=()=>({
  type: ActionTypes.FETCH_CUSTOMERS_SUCCESS
})

export const fetchProductsFailure=(error)=>({
  type:ActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: error.message
})
