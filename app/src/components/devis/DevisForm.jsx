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
import { useOrderContext } from "./hooks/useOrderContext";
import {
  addOrderLine,
  saveOrder,
  selectCustomer,
  selectProduct,
  setSelectedCustomer,
  setSelectedProduct,
  updateOrderLine,
  updateQuantity,
} from "./hooks/actions";

const DevisForm = () => {
  const { store, dispatch } = useOrderContext();
  const [isOpenCustomerDialog, setIsOpenCustomerDialog] = useState(false);
  const [isOpenProductDialog, setIsOpenProductDialog] = useState(false);
  const [selectedOrderLineIndex, setSelectedOrderLineIndex] = useState(null);

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
    dispatch(selectCustomer(customer.id));
    setIsOpenCustomerDialog(false);
    dispatch(setSelectedCustomer(customer));
  };

  const handleSelectProduct = (product) => {
    const index = selectedOrderLineIndex;
    const updatedOrderLines = [...store.order.orderLines];
    updatedOrderLines[index] = {
      ...updatedOrderLines[index],
      product: product.id,
      label: product.label,
      cateogory: product.cateogory,
      tva:product.tva,
      price: product.price, // Assuming 'price' is the field containing the product price
    }; // Get the selected order line index
    dispatch(selectProduct(index, product.id));
    setIsOpenProductDialog(false);
    dispatch(setSelectedProduct(product));
    dispatch(updateOrderLine(updatedOrderLines));
  };

  const handleAddOrderLine = () => {
    dispatch(addOrderLine());
  };

  const handleQuantityChange = (quantity, lineIndex) => {
    const quantityAsNumber=Number.parseFloat(quantity)
    dispatch(updateQuantity(lineIndex, quantityAsNumber ));
  };

  const handleSaveOrder = () => {
    dispatch(saveOrder());
    // Call API to save order
  };
  console.log(store);
  return (
    <Box w={"full"} p={"1rem"} m={".5rem"}>
      <Button onClick={handleOpenCustomerDialog}>Select Customer</Button>
      {store.selectedCustomer && (
        <div>
          Selected Customer: {store.selectedCustomer.id} -{" "}
          {store.selectedCustomer.name} - {store.selectedCustomer.city}
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
            <Th>TVA</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {store.order.orderLines.map((orderLine, index) => (
            <Tr key={index}>
              <Td>
                <Box mb={4}>
                  {orderLine.product}
                  <Button onClick={() => handleOpenProductDialog(index)}>
                    Select Product
                  </Button>
                  {orderLine[index] && <div>{orderLine[index].id}</div>}
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
              <Td>{orderLine.tva}</Td>
              <Td>
                {(orderLine.price * orderLine.quantity).toFixed(3)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleAddOrderLine}>Add Line</Button>
      <hr />
      <pre>
        <code>{JSON.stringify(store.order, null, 3)}</code>
      </pre>
      <Button onClick={handleSaveOrder}>Save Order</Button>
    </Box>
  );
};

export default DevisForm;
