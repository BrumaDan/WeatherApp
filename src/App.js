import Wheather from "./components/Wheather";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <Wheather></Wheather>
    </ChakraProvider>
  );
}

export default App;
