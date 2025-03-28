import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';

export default function App() {

  const Stack = createNativeStackNavigator();

  function MyNativeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="FEXO" 
          component={Login} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyNativeStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
