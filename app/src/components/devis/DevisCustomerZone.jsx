import React from 'react'
import {Box, Heading,Flex,Text} from '@chakra-ui/react'

function DevisCustomerZone({customer}) {
  return (
    <Box alignContent={"flex-start"} p="1rem" m=".5rem" boxShadow={"xl"} display={"flex"} flexDirection={"column"} maxW="100%">
      <Flex flexDirection={"column"} gap="1rem">
        <Flex flexDir={"row"} justifyContent={"start"} alignItems={"center"}gap={"1rem"}>
          <Heading fontSize={"sm"} justifyContent={"start"} alignItems={"center"}>Code:</Heading><Text>{customer.id}</Text>
        </Flex>
        <Flex flexDir={"row"} justifyContent={"start"} alignItems={"center"}gap={"1rem"}>
          <Heading fontSize={"sm"}>Customer Name:</Heading><Text>{customer.name}</Text>
        </Flex>
        <Flex flexDir={"row"} justifyContent={"start"} alignItems={"center"}gap={"1rem"}>
          <Heading fontSize={"sm"} justifyContent={"start"} alignItems={"center"}>City:</Heading><Text>{customer.city}</Text>
        </Flex>
      </Flex>

    </Box>
  )
}

export default DevisCustomerZone