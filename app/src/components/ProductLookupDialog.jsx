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
import { useOrderContext } from './devis/hooks/useOrderContext';

const ProductLookupDialog = ({ isOpen, onClose, onSelectProduct,orderLineIndex  }) => {
  const {store}=useOrderContext()
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(store.products);
      return;
    }

    const filtered = store.products.filter(
      (product) =>
        product.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, store.products]);

  const handleSelectProduct = (product) => {
    onSelectProduct(product,orderLineIndex);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Serach Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Search by Product Code or Label"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Box overflowX="auto" overflowY={"scroll"} maxH={"400px"}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Label</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredProducts.map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.id}</Td>
                    <Td>{product.label}</Td>
                    <Td>{product.price.toFixed(3)}</Td>
                    <Td>
                      <Button size="sm" onClick={() => handleSelectProduct(product)} colorScheme='blue'>
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

export default ProductLookupDialog;
