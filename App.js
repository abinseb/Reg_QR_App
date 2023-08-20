import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import components
import Home from "./pages/Home";
import Scan from './pages/ReadQR/Scan';
import ValidateQR from "./pages/ValidateQR/ValidateQR";
import InputDataManualy from "./pages/ReadQR/InputData";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="Scan" component={Scan} />
          <Stack.Screen name="ValidateQR" component={ValidateQR} />
          <Stack.Screen name="Input" component={InputDataManualy} />


        </Stack.Navigator>
    </NavigationContainer>
    
  );
}


