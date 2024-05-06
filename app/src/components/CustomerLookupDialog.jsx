import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@chakra-ui/react';

const CustomerLookupDialog = ({ isOpen, onClose, onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer Lookup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Search by Customer Code or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Box overflowX="auto">
            <Table variant="striped">
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
                      <Button size="sm" onClick={() => handleSelectCustomer(customer)}>
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
