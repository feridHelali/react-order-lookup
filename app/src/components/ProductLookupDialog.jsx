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

const ProductLookupDialog = ({ isOpen, onClose, onSelectProduct,orderLineIndex  }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSelectProduct = (product) => {
    onSelectProduct(product,orderLineIndex);
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
            placeholder="Search by Product Code or Label"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Box overflowX="auto">
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
                {filteredProducts.map((product,index) => (
                  <Tr key={product.id}>
                    <Td>{product.id}</Td>
                    <Td>{product.label}</Td>
                    <Td>{product.price}</Td>
                    <Td>
                      <Button size="sm" onClick={() => handleSelectProduct(product)}>
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
