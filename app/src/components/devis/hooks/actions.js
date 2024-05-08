export const ActionTypes = {
    SET_CUSTOMERS: 'SET_CUSTOMERS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SELECT_CUSTOMER: 'SELECT_CUSTOMER',
    ADD_ORDER_LINE: 'ADD_ORDER_LINE',
    UPDATE_ORDER_LINE: 'UPDATE_ORDER_LINE',
    SELECT_PRODUCT: 'SELECT_PRODUCT',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    SET_SELECTED_CUSTOMER: 'SET_SELECTED_CUSTOMER',
    SET_SELECTED_PRODUCT: 'SET_SELECTED_PRODUCT',
    SAVE_ORDER: 'SAVE_ORDER',
  };


  export const setCustomers = (customers) => ({
    type: ActionTypes.SET_CUSTOMERS,
    payload: customers,
  });
  
  export const setProducts = (products) => ({
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  });
  
  export const selectCustomer = (customerId) => ({
    type: ActionTypes.SELECT_CUSTOMER,
    payload: customerId,
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