import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from '@chakra-ui/react';
import { useOrderContext } from './devis/hooks/useOrderContext';
import LoaderComponent from './LoaderComponent';

const CustomerLookupDialog = ({ isOpen, onClose, onSelectCustomer }) => {
  const {store,error}=useOrderContext()
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCustomers(store.customers);
      return;
    }

    const filtered = store.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, store.customers]);

  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    onClose();
  };

  if(store.loading) return <LoaderComponent />
  if(store.error) return <Heading color="orange">{error.message}</Heading>

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Serach for Customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Search by Customer Code or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Box overflowX="auto" maxH={"400px"} overflowY={"scroll"}>
            <Table variant="striped" >
              <Thead>
                <Tr>
                  <Th>Customer Code</Th>
                  <Th>Customer Name</Th>
                  <Th>City</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCustomers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td>{customer.id}</Td>
                    <Td>{customer.name}</Td>
                    <Td>{customer.city}</Td>
                    <Td>
                      <Button size="sm" onClick={() => handleSelectCustomer(customer)} colorScheme='green'>
                        Select
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomerLookupDialog;
