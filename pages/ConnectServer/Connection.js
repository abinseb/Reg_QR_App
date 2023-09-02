import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
import { useIpContext } from "../IpContext";
import axios from "axios";

const ConnectServer = () => {
  const { addIpAddress, ipAddress } = useIpContext();
  const [ipAddressValue, setIpAddressValue] = useState('');
  const [connectedIpAddresses, setConnectedIpAddresses] = useState([]);

  const ConnectWithServer = () => {
    addIpAddress(ipAddressValue);
    setIpAddressValue('');

    if (connectedIpAddresses.includes(ipAddressValue)) {
      alert(`Already connected to server at IP address: ${ipAddressValue}`);
    } else {
      // Perform server connection logic here
      // For demonstration purposes, I'll just add it to the list without actual connection logic
      setConnectedIpAddresses([...connectedIpAddresses, ipAddressValue]);
      alert(`Connected to server at IP address: ${ipAddressValue}`);
    }
    axios.get('http://'+ipAddressValue+'/gun/')
    .then(()=>{
      alert('Server Connected');
    })
    .catch(()=>{
      alert("Server is Not connected");
    })
  };

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs">
            Input the IP Address to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>IP Address</FormControl.Label>
              <Input
                value={ipAddressValue}
                onChangeText={(value) => setIpAddressValue(value)}
              />
            </FormControl>

            <Button mt="2" colorScheme="teal" bg="#006400" onPress={ConnectWithServer}>
              Connect..
            </Button>
          </VStack>

          {/* {connectedIpAddresses.length > 0 && (
            <Ul>
              {connectedIpAddresses.map((ip, index) => (
               <Text key={index}>{ip}</Text> 
              ))}
            </Ul>
          )} */}
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ConnectServer;
