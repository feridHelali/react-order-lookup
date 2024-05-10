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
  Heading,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import CustomerLookupDialog from "../CustomerLookupDialog";
import ProductLookupDialog from "../ProductLookupDialog";
import { useOrderContext } from "./hooks/useOrderContext";
import { useParams } from "react-router-dom";
import {
  addOrderLine,
  deleteOrderLine,
  selectCustomer,
  selectProduct,
  setSelectedCustomer,
  setSelectedProduct,
  switchUpdateMode,
  updateOrderDate,
  updateOrderLine,
  updateQuantity,
} from "./hooks/actions";
import { RiDeleteBin5Line } from "react-icons/ri";

import { formatDate } from "../../helpers/formatDate";
import DevisCustomerZone from "./DevisCustomerZone";
import { AiOutlineSelect } from "react-icons/ai";
import { useEffect } from "react";

const DevisForm = () => {
  const { store, dispatch, saveOrder, getDevisByNumero, updateOrder } =
    useOrderContext();
  const [isOpenCustomerDialog, setIsOpenCustomerDialog] = useState(false);
  const [isOpenProductDialog, setIsOpenProductDialog] = useState(false);
  const [selectedOrderLineIndex, setSelectedOrderLineIndex] = useState(null);

  const { numero } = useParams();

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
    dispatch(selectCustomer(customer.id, customer));
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
      price: product.price,
    };
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

  const handleDeleteOrderLine = (id) => {
    dispatch(deleteOrderLine(id));
  };

  const handleSaveOrder = () => {
    saveOrder(store.order);
  };

  const handleUpdateOrder = () => {
    updateOrder(store.order);
  };

  useEffect(() => {
    if (numero) {
      dispatch(switchUpdateMode());
      getDevisByNumero(numero);
    }
  }, [numero]);

  if (store.loading) return <Heading>Loading</Heading>;
  if (store.error) return <Heading colorScheme="red">{store.error}</Heading>;



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
            value={formatDate(store.order?.orderDate) || formatDate(new Date())}
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
      <br />
      <hr />
      <Button
        onClick={handleAddOrderLine}
        colorScheme="green"
        isDisabled={
          (store.selectedCustomer === null ? true : false) ||
          isNewOrderLineWithNoProduct(store.order.orderLines)
        }
      >
        Add Line +
      </Button>
      <Table
        boxShadow={"sm"}
        ariant="striped"
        colorScheme="teal"
        fontSize={"sm"}
        fontFamily={"monospace"}
      >
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Product</Th>
            <Th>Label</Th>
            <Th>Price HT</Th>
            <Th>Quantity</Th>
            <Th>TVA</Th>
            <Th>Total HT</Th>
            <Th>Total TTC</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {store.order.orderLines.map((orderLine, index) => (
            <Tr key={orderLine.id}>
              <Td>{index + 1}</Td>
              <Td>
                <Box
                  mb={4}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {store.order.orderLines[index] && (
                    <div>{store.order.orderLines[index]?.product}</div>
                  )}
                  <Button onClick={() => handleOpenProductDialog(index)}>
                    <AiOutlineSelect />
                  </Button>
                </Box>
                <ProductLookupDialog
                  isOpen={isOpenProductDialog}
                  onClose={handleCloseProductDialog}
                  onSelectProduct={handleSelectProduct}
                />
              </Td>
              <Td>{orderLine.label}</Td>
              <Td>{(orderLine.price ? orderLine.price : 0).toFixed(3)}</Td>
              <Td>
                <Input
                  type="number"
                  min="1"
                  value={orderLine.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value, index)}
                />
              </Td>
              <Td>{`${orderLine.tva}%`}</Td>
              <Td>
                {(orderLine.price && orderLine.quantity
                  ? orderLine.price * orderLine.quantity
                  : 0
                ).toFixed(3)}
              </Td>
              <Td>
                {(orderLine.price && orderLine.quantity
                  ? orderLine.price *
                    orderLine.quantity *
                    (1 + orderLine.tva / 100)
                  : 0
                ).toFixed(3)}
              </Td>
              <Td>
                {" "}
                <Button onClick={() => handleDeleteOrderLine(orderLine.id)}>
                  <RiDeleteBin5Line />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box
        my="1rem"
        py={"1rem"}
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        maxWidth="100%"
        alignContent={"flex-end"}
        justifyItems={"flex-end"}
      >
        <Heading fontSize={"sm"} fontFamily={"monospace"}>
          Total HT : {computeTotalHt(store.order.orderLines).toFixed(3)}
        </Heading>
        <Heading fontSize={"sm"} fontFamily={"monospace"}>
          Total TVA : {computeTotalTVA(store.order.orderLines).toFixed(3)}
        </Heading>
        <Heading fontSize={"sm"} fontFamily={"monospace"}>
          Total TTC : {computeTotalTTC(store.order.orderLines).toFixed(3)}
        </Heading>
      </Box>
      {/* <hr />
      <pre>
        <code>{JSON.stringify(store, null, 3)}</code>
      </pre> */}
      {store.mode === "create" ? (
        <Button
          onClick={handleSaveOrder}
          isDisabled={!isOrderReadyToSave(store.order)}
          colorScheme="blue"
          p="1rem"
          m="1rem"
        >
          Save Order
        </Button>
      ) : store.mode === "update" ? (
        <Button
          onClick={handleUpdateOrder}
          isDisabled={!isOrderReadyToSave(store.order)}
          colorScheme="blue"
          p="1rem"
          m="1rem"
        >
          Update Order
        </Button>
      ) : (
        <Heading colorScheme="">
          Error: I cant figureout what action you want to perform CreateOrder Ou
          UpdateOrder
        </Heading>
      )}
    </Box>
  );
};

export default DevisForm;

const isNewOrderLineWithNoProduct = (orderLines) => {
  return orderLines.some((line) => line.product === null);
};

const computeTotalHt = (orderLines) => {
  if (orderLines?.length === 0) return 0;
  return orderLines.reduce((total, line) => {
    return total + line.price * line.quantity;
  }, 0);
};

const computeTotalTTC = (orderLines) => {
  if (orderLines?.length === 0) return 0;
  return orderLines.reduce((total, line) => {
    return total + line.price * line.quantity * (1 + line.tva / 100);
  }, 0);
};

const computeTotalTVA = (orderLines) => {
  if (orderLines?.length === 0) return 0;
  return orderLines.reduce((total, line) => {
    return total + line.price * line.quantity * (line.tva / 100);
  }, 0);
};

const isOrderReadyToSave = (order) => {
  return (
    order.customerId &&
    order.orderLines.length !== 0 &&
    !isNewOrderLineWithNoProduct(order.orderLines)
  );
};
