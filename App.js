import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated'


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './components/screens/Login';
import Home from './components/screens/Home';
import SessionManager from './components/screens/SessionManager';
import FPassword1 from './components/screens/ForgetPassword/FPassword1';
import SignUp from './components/screens/SignUp';
import SettingsPage from './components/screens/Settings';


//Shipper Screens
import MainShipperLandingPage from './components/screens/shipper/MainShipperLandingPage';
import ShipperTripScreen from './components/screens/shipper/ShipperTripScreen';
import ShipperSearch from './components/screens/shipper/ShipperSearch';
import ShipperPayment from './components/screens/shipper/ShipperPayment';
import ShipperProfile from './components/screens/shipper/ShipperProfile';
import TripsForm from './components/screens/TripsForm'

//Carrier Screens
import MainCarrierLandingPage from './components/screens/carrier/MainCarrierLandingPage';
import CarrierTrip from './components/screens/carrier/CarrierTripsScreen';
import CarrierSearch from './components/screens/carrier/CarrierSearch';
import CarrierPayment from './components/screens/carrier/CarrierPayment';
import CarrierProfile from './components/screens/carrier/CarrierProfile';
import Colors from './globals/colors';
import SplashScreen from './components/screens/SplashScreen';
import TripClientSearch from './components/screens/TripClientSearch';
import FPassword2 from './components/screens/ForgetPassword/FPassword2';
import FPassword3 from './components/screens/ForgetPassword/FPassword3';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();

  function ShipperTabNavigation() {
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
          tabBarActiveTintColor: Colors.fexoOrange,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="Home" component={MainShipperLandingPage} options={{headerShown: false}}/>
        <Tabs.Screen name="Trips" component={ShipperTripScreen} />
        <Tabs.Screen name="Search" component={ShipperSearch} />
        <Tabs.Screen name="Payments" component={ShipperPayment} />
        <Tabs.Screen name="Profile" component={ShipperProfile} />
        {/* <Tabs.Screen name='TripForm' component={TripsForm} /> */}
      </Tabs.Navigator>
    );
  }

  function CarrierTabNavigation() {
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
          tabBarActiveTintColor: Colors.fexoBlue,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="Home" component={MainCarrierLandingPage} />
        <Tabs.Screen name="Trips" component={CarrierTrip} />
        <Tabs.Screen name="Search" component={CarrierSearch} />
        <Tabs.Screen name="Payments" component={CarrierPayment} />
        <Tabs.Screen name="Profile" component={CarrierProfile} />
      </Tabs.Navigator>
    );
  }

  function MyNativeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{headerShown: false}}
        />
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
          name='Step1'
          component={FPassword1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Step2'
          component={FPassword2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Step3'
          component={FPassword3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShipperTabs"
          component={ShipperTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CarrierTabs'
          component={CarrierTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TripForm'
          component={TripsForm}
          options={{
            headerShown: true,
            title: 'Workorder'
          }}
        />
        <Stack.Screen
          name='ClientSearch'
          component={TripClientSearch}
          options={{headerShown: true}}
        />
        <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Settings"
      component={SettingsPage}
      options={{ headerShown: true }}
      />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <SessionManager>
        <StatusBar style='auto'/>
        <MyNativeStack />
      </SessionManager>
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
