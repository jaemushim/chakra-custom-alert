import * as React from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Alert, Confirm } from "./CustomAlert";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Button
            onClick={() =>
              Alert({ title: "Alert title", message: "Alert message" })
            }
          >
            Alert
          </Button>
          <Button
            onClick={async () =>
              (await Confirm({ title: "test", message: "message" }))
                ? console.log("true")
                : console.log("false")
            }
          >
            Confirm
          </Button>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
