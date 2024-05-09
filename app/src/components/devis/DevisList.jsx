import useDevis from "../../hooks/useDevis";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
} from "@chakra-ui/react";


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
            <Th>Customer</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {devis?.map((d) => {
            return (
              <Tr key={d?.numero}>
                <Td>{d?.numero}</Td>
                <Td>{d?.date}</Td>
                <Td>{d?.client}</Td>
                <Td isNumeric>{d?.total}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DevisList;
