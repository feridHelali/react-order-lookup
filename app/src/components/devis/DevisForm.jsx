import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
} from "@chakra-ui/react";
import CustomerLookupDialog from "../CustomerLookupDialog";
import ProductLookupDialog from "../ProductLookupDialog";

const initialState = {
  order: {
    customerId: null,
    orderLines: [],
  },
  selectedCustomer: null,
  selectedProduct: null,
  customers: [],
  products: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SELECT_CUSTOMER":
      return {
        ...state,
        order: { ...state.order, customerId: action.payload },
      };
    case "ADD_ORDER_LINE":
      return {
        ...state,
        order: {
          ...state.order,
          orderLines: [
            ...state.order.orderLines,
            { product: null, quantity: 1 },
          ],
        },
      };
    case "UPDATE_ORDER_LINE":
      return {
        ...state,
        order: {
          ...state.order,
          orderLines: action.payload,
        },
      };
    case "SELECT_PRODUCT":
      const { index, id } = action.payload;
      const orderLines = [...state.order.orderLines];
      orderLines[index].product = id;
      return { ...state, order: { ...state.order, orderLines } };
    case "UPDATE_QUANTITY":
      const { lineIndex, quantity } = action.payload;
      const updatedOrderLines = [...state.order.orderLines];
      updatedOrderLines[lineIndex].quantity = quantity;
      return {
        ...state,
        order: { ...state.order, orderLines: updatedOrderLines },
      };
    case "SET_SELECTED_CUSTOMER":
      return { ...state, selectedCustomer: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    case "SAVE_ORDER":
      // Implement saving order to API
      return state;
    default:
      return state;
  }
};

const DevisForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpenCustomerDialog, setIsOpenCustomerDialog] = useState(false);
  const [isOpenProductDialog, setIsOpenProductDialog] = useState(false);
  const [selectedOrderLineIndex, setSelectedOrderLineIndex] = useState(null);

  useEffect(() => {
    // Fetch customers and products data
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clients");
        dispatch({ type: "SET_CUSTOMERS", payload: response.data });
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        dispatch({ type: "SET_PRODUCTS", payload: response.data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const handleOpenCustomerDialog = () => {
    setIsOpenCustomerDialog(true);
  };

  const handleCloseCustomerDialog = () => {
    setIsOpenCustomerDialog(false);
  };

  const handleOpenProductDialog = (index) => {
    setIsOpenProductDialog(true);
    setSelectedOrderLineIndex(index);
  };

  const handleCloseProductDialog = () => {
    setIsOpenProductDialog(false);
  };

  const handleSelectCustomer = (customer) => {
    dispatch({ type: "SELECT_CUSTOMER", payload: customer.id });
    setIsOpenCustomerDialog(false);
    dispatch({ type: "SET_SELECTED_CUSTOMER", payload: customer });
  };

  const handleSelectProduct = (product) => {
    const index = selectedOrderLineIndex;
    const updatedOrderLines = [...state.order.orderLines];
    updatedOrderLines[index] = {
      ...updatedOrderLines[index],
      product: product.id,
      label: product.label,
      cateogory:product.cateogory,
      price: product.price, // Assuming 'price' is the field containing the product price
    }; // Get the selected order line index
    dispatch({ type: "SELECT_PRODUCT", payload: { index, id: product.id } });
    setIsOpenProductDialog(false);
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "UPDATE_ORDER_LINE", payload: updatedOrderLines });
  };

  const handleAddOrderLine = () => {
    dispatch({ type: "ADD_ORDER_LINE" });
  };

  const handleQuantityChange = (quantity, lineIndex) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { lineIndex, quantity } });
  };

  const handleSaveOrder = () => {
    dispatch({ type: "SAVE_ORDER" });
    // Call API to save order
  };

  return (
    <Box>
      <h2>Order Form</h2>
      {/* Customer Selection */}
      <Button onClick={handleOpenCustomerDialog}>Select Customer</Button>
      {state.selectedCustomer && (
        <div>
          Selected Customer: {state.selectedCustomer.id} -{" "}
          {state.selectedCustomer.name} - {state.selectedCustomer.city}
        </div>
      )}
      <CustomerLookupDialog
        isOpen={isOpenCustomerDialog}
        onClose={handleCloseCustomerDialog}
        onSelectCustomer={handleSelectCustomer}
      />

      {/* Order Lines */}
      <Table>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Label</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.order.orderLines.map((orderLine, index) => (
            <Tr key={index}>
              <Td>
                <Box mb={4}>
                  <Button onClick={() => handleOpenProductDialog(index)}>
                    Select Product
                  </Button>
                  {orderLine[index] && (
                    <div>{orderLine[index].id}</div>
                  )}
                </Box>
                <ProductLookupDialog
                  isOpen={isOpenProductDialog}
                  onClose={handleCloseProductDialog}
                  onSelectProduct={handleSelectProduct}
                />
              </Td>
              <Td>{orderLine.label}</Td>
              <Td>{orderLine.price}</Td>
              <Td>
                <Input
                  type="number"
                  min="1"
                  value={orderLine.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value, index)}
                />
              </Td>
              <Td>{(orderLine[index]?.price*(+orderLine[index]?.quantity)).toFixed(3)}</Td> 
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleAddOrderLine}>Add Line</Button>
      <Button onClick={handleSaveOrder}>Save Order</Button>
      <hr />
      <pre>
        <code>{JSON.stringify(state.order, null, 3)}</code>
      </pre>
    </Box>
  );
};

export default DevisForm;
