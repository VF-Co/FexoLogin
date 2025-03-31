import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './components/screens/Login';
import Home from './components/screens/Home';
import MainShipperLandingPage from './components/screens/shipper/MainShipperLandingPage';
import MainCarrierLandingPage from './components/screens/carrier/MainCarrierLandingPage';
import ShipperTripScreen from './components/screens/shipper/ShipperTripScreen';
import ShipperSearch from './components/screens/shipper/ShipperSearch';
import ShipperPayment from './components/screens/shipper/ShipperPayment';
import ShipperProfile from './components/screens/shipper/ShipperProfile';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();

  function TabNavigation() {
    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Trips') {
              iconName = 'map-outline';
            } else if (route.name === 'Search') {
              iconName = 'search-outline';
            } else if (route.name === 'Payments') {
              iconName = 'wallet-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00b4d8',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="Home" component={MainShipperLandingPage} />
        <Tabs.Screen name="Trips" component={ShipperTripScreen} />
        <Tabs.Screen name="Search" component={ShipperSearch} />
        <Tabs.Screen name="Payments" component={ShipperPayment} />
        <Tabs.Screen name="Profile" component={ShipperProfile} />
      </Tabs.Navigator>
    );
  }

  function MyNativeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="FEXO"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialScreen"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyNativeStack />
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
