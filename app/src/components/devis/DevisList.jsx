import useDevis from "../../hooks/useDevis";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import {Link} from 'react-router-dom'

function DevisList() {
  const { devis, isLoading } = useDevis();

  if (isLoading) return <Heading>Loading ...</Heading>;

  return (
    <TableContainer p="1rem" m="1rem" boxShadow='xs' rounded='md' bg='gray:900'>
      <Heading fontSize={"sm"} textAlign={"center"} p={"1rem"}>Liste Des Devis</Heading>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Devis List</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Date</Th>
            <Th>Customer Name</Th>
            <Th>City</Th>
            <Th isNumeric>Total</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {devis?.map((d) => {
            return (
              <Tr key={d?.id}>
                <Td>{d?.id}</Td>
                <Td>{d?.orderDate}</Td>
                <Td>{d?.customer.name}</Td>
                <Td>{d?.customer.city}</Td>
                <Td isNumeric>{(d?.orderLines.reduce((total,line)=>total+(line.price*(1+(line.tva/100))*line.quantity),0)).toFixed(3)}</Td>
                <Td>
                  <Link to={`/devis/${d?.id}`}><FaEdit /></Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DevisList;
