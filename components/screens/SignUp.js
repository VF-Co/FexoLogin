import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../globals/colors';
import appFirebase from '../../credentials';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

function SignUp({ navigation }) {
  const [userType, setUserType] = useState('Carrier');
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setSelectedDate(selectedDate);
        setDob(selectedDate.toLocaleDateString());
      }
    } else {
      if (selectedDate) {
        setSelectedDate(selectedDate);
      }
    }
  };

  const handleApplyDate = () => {
    setDob(selectedDate.toLocaleDateString());
    setShowDatePicker(false);
  };

  const handleSignUp = async () => {
    if (
      !email || !password || !fullName || !phone || !dob ||
      (userType === 'Shipper' && !businessName)
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('FEXO');
    } catch (error) {
      console.error('Error during sign up:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={28} color="black" />
              </TouchableOpacity>
            </View>

            <Image source={require('../../assets/img/FEXO-LOGO.jpg')} style={styles.img} />
            <Text style={styles.title}>Create account</Text>
            <View style={styles.pressed}>
              <Text style={styles.pressedText2}>Already have an account? </Text>
              <Pressable onPress={() => navigation.navigate('FEXO')}>
                <Text style={styles.signUp}>Login</Text>
              </Pressable>
            </View>
            <Text style={{ color: 'black', fontWeight: 'bold', marginVertical: 5 }}>
              Select the preference of your account
            </Text>

            {/* Contenedor gris que abarca todo */}
            <View style={styles.formContainer}>
              {/* Shipper / Carrier toggle */}
              <View style={styles.userTypeToggle}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'Shipper' ? styles.selectedUserTypeButton : styles.inactiveUserTypeButton
                  ]}
                  onPress={() => setUserType('Shipper')}
                >
                  <Text style={[
                    styles.userTypeText,
                    userType === 'Shipper' ? styles.selectedUserTypeText : styles.inactiveUserTypeText
                  ]}>Shipper</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'Carrier' ? styles.selectedUserTypeButton : styles.inactiveUserTypeButton
                  ]}
                  onPress={() => setUserType('Carrier')}
                >
                  <Text style={[
                    styles.userTypeText,
                    userType === 'Carrier' ? styles.selectedUserTypeText : styles.inactiveUserTypeText
                  ]}>Carrier</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  {/* Full Name */}
                  <View style={[styles.textBox, { backgroundColor: Colors.fexoWhite }]}>
                    <FontAwesome name="user-o" size={20} color="#6c757d" style={styles.icon} />
                    <TextInput
                      placeholder="Full Name"
                      style={styles.input}
                      value={fullName}
                      onChangeText={setFullName}
                    />
                  </View>

                  {/* Email */}
                  <View style={[styles.textBox, { backgroundColor: Colors.fexoWhite }]}>
                    <Ionicons name="mail-outline" size={20} color="#6c757d" style={styles.icon} />
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      keyboardType="email-address"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>

                  {/* Business Name (only for Shipper) */}
                  {userType === 'Shipper' && (
                    <View style={[styles.textBox, { backgroundColor: Colors.fexoWhite }]}>
                      <FontAwesome name="building-o" size={20} color="#6c757d" style={styles.icon} />
                      <TextInput
                        placeholder="Business Name"
                        style={styles.input}
                        value={businessName}
                        onChangeText={setBusinessName}
                      />
                    </View>
                  )}

                  {/* Date of Birth */}
                  <Pressable onPress={() => setShowDatePicker(true)} style={[styles.textBox, { backgroundColor: Colors.fexoWhite }]}>
                    <MaterialIcons name="date-range" size={20} color="#6c757d" style={styles.icon} />
                    <Text style={[styles.input, { paddingTop: 3, color: dob ? Colors.fexoBlue : '#6c757d' }]}>
                      {dob ? dob : 'Date of Birth'}
                    </Text>
                  </Pressable>

                  {/* Date Picker */}
                  {showDatePicker && (
                    Platform.OS === 'ios' ? (
                      <View style={styles.datePickerContainer}>
                        <DateTimePicker
                          value={selectedDate}
                          mode="date"
                          display="spinner"
                          onChange={handleDateChange}
                        />
                        <TouchableOpacity style={styles.applyButton} onPress={handleApplyDate}>
                          <Text style={styles.btnText}>Apply Date</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                      />
                    )
                  )}

                  {/* Phone */}
                  <View style={[styles.textBox, { backgroundColor: Colors.fexoWhite }]}>
                    <Text style={{ marginRight: 10, color: '#6c757d' }}>+504</Text>
                    <TextInput
                      placeholder="Phone Number"
                      style={styles.input}
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>

                  {/* Password */}
                  <View style={[styles.textBox, { backgroundColor: Colors.fexoWhite }]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#6c757d" style={styles.icon} />
                    <TextInput
                      placeholder="Password"
                      style={styles.input}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#6c757d"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.termsContainer}>
                <Text style={{ color: '#777' }}>
                  By signing in with an account, you agree to SO's
                </Text>
                <Text>Terms of Service and Privacy Policy.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  img: {
    width: 350,
    height: 150,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#D1D5DBE6',
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  form: {
    width: '90%',
    padding: 20,
  },
  inputContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: '#ced4da',
    borderWidth: 0.5,
    marginTop: -2,
    width: '100%',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.fexoBlue,
  },
  btn: {
    padding: 12,
    borderRadius: 35,
    backgroundColor: Colors.fexoOrange,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: Colors.fexoWhite,
    fontSize: 16,
  },
  pressed: {
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  pressedText2: {
    marginTop: 0,
    color: Colors.fexoBlue,
  },
  signUp: {
    color: Colors.fexoBlue,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    zIndex: 2,
    backgroundColor: Colors.fexoWhite,
    alignItems: 'center',
    paddingBottom: 20,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: Colors.fexoOrange,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  userTypeToggle: {
    flexDirection: 'row',
    // marginTop: 10,
    marginBottom: 10,
  },
  userTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderRadius: -5,
    width: '50%',
    textAlign: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedUserTypeButton: {
    backgroundColor: '#D1D5DBE6',
  },
  inactiveUserTypeButton: {
    backgroundColor: Colors.background,
  },
  userTypeText: {
    fontWeight: 'bold',
  },
  selectedUserTypeText: {
    color: 'black',
    fontSize: 20,
  },
  inactiveUserTypeText: {
    color: 'black',
    fontSize: 20,
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default SignUp;