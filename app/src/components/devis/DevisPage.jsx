import React from "react";
import { OrderProvider } from "./hooks/useOrderContext";
import DevisForm from "./DevisForm";
import { Flex,Box,Heading } from "@chakra-ui/react";

function DevisPage() {
  return (
    <OrderProvider>
      <Box>
        <Flex
          w={"auto"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading>Devis</Heading>
          <DevisForm />
        </Flex>
      </Box>
    </OrderProvider>
  );
}

export default DevisPage;
