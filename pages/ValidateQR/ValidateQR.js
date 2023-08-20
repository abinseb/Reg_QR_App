import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Gun from "gun";

// native base 

// gun js 









const ValidateQR = ({ route ,navigation}) => {
    const [userob,setuserob] = useState("")
    const { qrData } = route.params;
    const gun = Gun({
        peers: ['http:192.168.43.163:5000/gun']
      })
    var index="data111"

 //function acknowlege  network for new user 
 function inituser()
  {
    {
      gun.get(index+"/"+"init").put({"ttft":"u7ygyyg"})
      
    }
  }
  
  function getuser()
  {
    gun.get(index+'/'+qrData).once((data) =>{
      if ( data === undefined)
      {
        alert ("user not found");
      }
      else{
      setuserob(
        {
          Name: data.Name,
          Institution: data.Institution,
          Email: data.Email,
          Phone: data.Phone,
          Verified: data.Verified
        }
      )
      }
    })
    //getkey()
  }
 
 const navigateToHome=()=>{
    navigation.navigate("Home");
 }

//  fetching data from gun js
useEffect(()=>{
    gun.get(index+'/'+qrData).once((data) =>{
        if ( data === undefined)
        {
          alert ("user not found");
        }
        else{
        setuserob(
          {
            Name: data.Name,
            Institution: data.Institution,
            Email: data.Email,
            Phone: data.Phone,
            Verified: data.Verified
          }
        )
        }
      })

},[])

const handleVerification=async()=>{
    // alert("succcess");
    try{
        await  console.log(gun.get(index+'/'+qrData).put({"Verified":true}))
        alert("Verification Success");
        navigateToHome();
    }
    catch(err){
        alert("Somthing Wrong")
    }

   
    

 }
    return (
            <View style={styles.container}>
            <View style={styles.viewBox}>
                <View style={styles.profileBox}>
                    <Text style={styles.label}>Id: </Text>
                    <Text style={styles.value}>{qrData}</Text>
                </View>
                <View style={styles.profileBox}>
                    <Text style={styles.label}>Name: </Text>
                    <Text style={styles.value}>{userob["Name"]}</Text>
                </View>
                <View style={styles.profileBox}>
                    <Text style={styles.label}>Email: </Text>
                    <Text style={styles.value}>{userob["Email"]}</Text>
                </View>
                <View style={styles.profileBox}>
                    <Text style={styles.label}>MobileNo: </Text>
                    <Text style={styles.value}>{userob["Phone"]}</Text>
                </View>
                <View style={styles.profileBox}>
                    <Text style={styles.label}>Status: </Text>
                    <Text style={styles.value}>{qrData}</Text>
                </View>
                
                {/* <Text style={styles.label}>Name:{"abin sebastian peejjej"}</Text>
                <Text style={styles.label}>Email:</Text> */}
                <Button mode="contained" style={styles.verifyButton} 
                    onPress={handleVerification} 
                >
                    Verify
                </Button>
            </View>
        </View>

        
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#1e7898",
    },
    viewBox: {
        justifyContent: 'flex-start',
        alignItems: "center",
        borderRadius: 20,
        elevation: 2,
        padding: 20,
        backgroundColor: "white",
        width:'90%',
        alignSelf:'center',
       
    },
    profileBox:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
        color: "#333",
        fontSize:18,
    },
    value:{
        flex:1,
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'sans-serif'
    },
    verifyButton: {
        backgroundColor: "#1e7898",
        marginTop: 20,
       
    },
});

export default ValidateQR;
