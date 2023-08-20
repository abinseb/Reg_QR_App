import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const InputDataManualy = () => {
    const navigation =useNavigation();

    const [qrData , setQRData] = useState('');

    const ValidateInputData=()=>{
        navigation.navigate("ValidateQR",{qrData});
    }
  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs">
            Input the Id to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>ID</FormControl.Label>
              <Input 
                value={qrData}
                onChangeText={(value)=>{setQRData(value)}}
              />
            </FormControl>
            
            <Button mt="2" colorScheme="teal" bg="#1e7898"  onPress={ValidateInputData}>
              Search..
            </Button>
           
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default InputDataManualy;