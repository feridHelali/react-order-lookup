import React, { useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
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
  updateOrderDate,
  updateOrderLine,
  updateQuantity,
} from "./hooks/actions";

import { formatDate } from "../../helpers/formatDate";
import DevisCustomerZone from "./DevisCustomerZone";
import { AiOutlineSelect } from "react-icons/ai";

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
      tva: product.tva,
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
    const quantityAsNumber = Number.parseFloat(quantity);
    dispatch(updateQuantity(lineIndex, quantityAsNumber));
  };

  const handleUpdateOrderDate = (orderDate) => {
    dispatch(updateOrderDate(formatDate(orderDate)));
  };

  const handleSaveOrder = () => {
    dispatch(saveOrder());
    // Call API to save order
  };

  return (
    <Box w={"full"} p={"1rem"} m={"1rem"} boxShadow={"xl"}>
        <FormControl>
          <FormLabel>Numero Devis</FormLabel>
        </FormControl>
      <Flex flexDirection={"row"} gap={".2rem"}>
        <FormControl maxWidth={"50%"}>
          <FormLabel>Date Devis</FormLabel>
          <Input
            type="date"
            value={formatDate(store.order.orderDate)}
            onChange={(e) => handleUpdateOrderDate(e.target.value)}
          />
        </FormControl>

        <Flex
          flexDirection={"column"}
          gap={"1rem"}
          alignItems={"start"}
          justifyContent={"start"}
          maxW={"100%"}
        >
          <Button onClick={handleOpenCustomerDialog} p={"1rem"}>
            Select Customer
          </Button>
          {store.selectedCustomer && (
            <DevisCustomerZone customer={store.selectedCustomer} />
          )}
        </Flex>
        <CustomerLookupDialog
          isOpen={isOpenCustomerDialog}
          onClose={handleCloseCustomerDialog}
          onSelectCustomer={handleSelectCustomer}
        />
      </Flex>

      {/* Order Lines */}
      <Table boxShadow={"sm"}>
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
                  <Button onClick={() => handleOpenProductDialog(index)}>
                    <AiOutlineSelect />
                  </Button>
                  {orderLine.product}
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
              <Td>{(orderLine.price * orderLine.quantity).toFixed(3)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleAddOrderLine}>Add Line</Button>
      {/* <hr />
      <pre>
        <code>{JSON.stringify(store, null, 3)}</code>
      </pre> */}
      <Button onClick={handleSaveOrder}>Save Order</Button>
    </Box>
  );
};

export default DevisForm;
