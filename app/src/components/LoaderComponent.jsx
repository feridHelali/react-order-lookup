import {Box,CircularProgress,CircularProgressLabel} from "@chakra-ui/react"

function LoaderComponent() {
  return (
    <Box w={"100%"} m="1rem" h="60px" p="1rem">
    <CircularProgress value={40} color="purple" isIndeterminate>
      <CircularProgressLabel>...</CircularProgressLabel>
    </CircularProgress>
    </Box>
  );
}

export default LoaderComponent;
