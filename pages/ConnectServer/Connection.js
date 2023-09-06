import React, { useEffect, useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider,Spinner } from "native-base";
import { useIpContext } from "../IpContext";
import axios from "axios";
import Gun from "gun";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createdata } from "../../database/SQLiteHelper";

import { openDatabase } from "expo-sqlite";





const ConnectServer = () => {
  const { addIpAddress, ipAddress } = useIpContext();
  const [ipAddressValue, setIpAddressValue] = useState('');
  const [connectedIpAddresses, setConnectedIpAddresses] = useState([]);
  const [loading , setLoading] = useState(false);

  const [dataArray, setDataArray] = useState([])
 
  // createdata();
  
 

  const ConnectWithServer = () => {
    addIpAddress(ipAddressValue);
    setIpAddressValue('');
  
    if (connectedIpAddresses.includes(ipAddressValue)) {
      alert(`Already connected to server at IP address: ${ipAddressValue}`);
    } else {
      setConnectedIpAddresses([...connectedIpAddresses, ipAddressValue]);
      alert(`Connected to server at IP address: ${ipAddressValue}`);
    }
  
    // connect with mongodb and fetch data
    axios.get('http://'+ipAddressValue+'/getdata')
      .then((res) => {
        console.log('http://'+ipAddressValue+'/getdata');
        console.log(res.data);
        // setDataArray(res.data);
        // // Call load_data() only after data is fetched
        
        // console.log(dataArray);
        // load_data();
        // // Check_The_DB();
        setDataArray((prevDataArray) => {
          const newDataArray = [...prevDataArray, ...res.data];
          // Call load_data() after updating dataArray
          Check_The_DB(newDataArray);
          return newDataArray;
        });

      })
      .catch((err) => {
        console.log(err);
      });
  
    insertIpAddress(ipAddressValue);
    // check the data connection
    axios.get('http://'+ipAddressValue+'/gun/')
      .then(() => {
        alert('Server Connected');
        
      })
      .catch(() => {
        alert("Server is Not connected");
      });
  };
  

  
  
 

const db = openDatabase('Registration.db');

// load data from mongo to local sqlite
function load_data(newDataArray){
  setLoading(true);
  console.log(dataArray);
  db.transaction(tx=>{
    newDataArray.forEach(dataItem=> {
          tx.executeSql(
            'INSERT INTO gun_data (Id , Name , Institution, Email , Phone , Verified) VALUES (?,?,?,?,?,?);',
            [
              dataItem._id,
              dataItem.Name,
              dataItem.Institution,
              dataItem.Email,
              dataItem.Phone,
              dataItem.Verified
            ],
            (_,{insertId}) => console.log(`Inserted row with Id ${insertId}`),
            error => console.error('Error inserting data: ' , error)
          );
    });
  });
  setLoading(false);
}



function Check_The_DB(newDataArray) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT COUNT(*) AS rowCount FROM gun_data;',
      [],
      (_, { rows }) => {
        const { rowCount } = rows.item(0);
        if (rowCount === 0) {
          load_data(newDataArray);
          console.log('gun_data table is empty. Calling load_data...');
          
        } else {
          console.log('gun_data table is not empty.');
        }
      },
      error => console.error('Error querying data:', error)
    );
  });
}

function dispdata() {
  db.transaction(tx => {
    tx.executeSql(
      // 'SELECT COUNT(*) FROM gun_data;',
      `SELECT * FROM gun_data WHERE ID =${120};`,
      [],
      (_, { rows }) => {
        const data = rows._array;
        if (data.length > 0) {
          console.log('Data stored in SQLite:', data);
        } else {
          console.log('No data stored in SQLite.');
        }
      },
      error => console.error('Error querying data:', error)
    );
  });
}
 
const insertIpAddress =(ipAddressUrl) =>{
  db.transaction((tx)=>{
    tx.executeSql(
      'INSERT INTO ip_data (ipurl) VALUES (?);',
      [ipAddressUrl],
      (_, {insertId}) => console.log(`Inserted IP address URL with ID ${insertId}`),
      (error) => console.error('Error inserting Ip address URL: ' , error)
    );
  });
};

function DeleteWholeData(){
  db.transaction((tx)=>{
    tx.executeSql('DELETE FROM gun_data;',
    [],(_,result)=>{
      if (result.rowsAffected >0){
        console.log('Deleted');
      }
      else{
        console.log("No records");
      }
    })
  })
}
function DeleteWholeData1() {
  db.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE IF EXISTS gun_data;',
      [],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Table gun_data Deleted');
        } else {
          console.log('No records');
        }
      },
      (error) => console.error('Error deleting table: ', error)
    );
  });
}


const displayIp=()=>{
  db.transaction (tx=>{
    tx.executeSql(
      'SELECT * FROM ip_data;',
      [],
      (_, { rows }) => {
        const data = rows._array;
        if (data.length > 0) {
          console.log('Data stored in SQLite:', data);
        } else {
          console.log('No data stored in SQLite.');
        }
      },
      error => console.error('Error querying data:', error)
    )
  })
}

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
            <Button mt="2" colorScheme="teal" bg="#006400" onPress={DeleteWholeData}>
              loadStoredDataInSqlite..
            </Button>
            
          </VStack>
          {loading && (
           <Center>
               <Spinner accessibilityLabel="Loading" color="teal.500" size="lg" />
           </Center>
          )}
          
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ConnectServer;
