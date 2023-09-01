import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
// import components
import Home from "./pages/Home";
import Scan from './pages/ReadQR/Scan';
import ValidateQR from "./pages/ValidateQR/ValidateQR";
import InputDataManualy from "./pages/ReadQR/InputData";
import ConnectServer from "./pages/ConnectServer/Connection";

// ipProvider
import { IPProvider } from "./pages/IpContext";

// enable screens 
enableScreens();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <IPProvider>
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="Scan" component={Scan} />
          <Stack.Screen name="ValidateQR" component={ValidateQR} options={{headerShown:false}}/>
          <Stack.Screen name="Input" component={InputDataManualy} />
          <Stack.Screen name="serverConnection" component={ConnectServer} />


        </Stack.Navigator>
    </NavigationContainer>
    </IPProvider>
    
  );
}


