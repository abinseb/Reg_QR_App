
import React from "react";
import { TouchableOpacity } from "react-native";
import { View,Text ,StyleSheet, Image,} from "react-native";
import { Button } from 'react-native-paper'

const Home=({navigation})=>{
    const handleNavigate=()=>{
        navigation.navigate('Input');
    }
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('./../assets/images.png')}
                    style={styles.img}
                    resizeMode='contain'
                />

            </View>
            <View style={styles.btnContainer}>
              <Button mode="contained" textColor="black" style={styles.btn}
                onPress={()=>{navigation.navigate("Scan")}}
              >Scan</Button>
                
            </View>
            <View style={styles.textClick}>
                <Text style={styles.text1}>If QR won't work?{" "}</Text>
                <TouchableOpacity onPress={handleNavigate}>
                    <Text style={styles.text2}>Click</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-evenly',
        backgroundColor:'#1e7898'
        },
    imageContainer:{
        flex:0.4,
        margin:10,

    },
    img:{
        height:'100%',
        width:'100%'
    },
    btn:{
        backgroundColor:'#f0f8ff',
        
        height:100,
        width:100,
        justifyContent:'center',
        borderRadius:50,
        alignItems:'center',
    },
    btnContainer:{
        margin:20,
        alignSelf:'center'
    },
    textClick: {
        marginLeft: 20,
        alignSelf: 'center',
        bottom: 0,
        position: 'absolute',
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text1: {
        fontSize: 18,
        color: '#000'
    },
    text2: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff'
    },
})
