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
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../globals/colors';
import appFirebase from '../../credentials';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

function SignUp({ navigation }) {
  const [userType, setUserType] = useState('Carrier'); // Shipper or Carrier
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
    const currentDate = selectedDate || selectedDate;
    setSelectedDate(currentDate);
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
      const user = userCredential.user;

      // Add Firestore saving here later if needed

      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('FEXO');
    } catch (error) {
      console.error('Error during sign up:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <ImageBackground source={require('../../assets/img/Background.png')} style={styles.background}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', top: 60, left: 20, zIndex: 10 }}
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <Image source={require('../../assets/img/FEXO LOGO-NO BACKGROUND.png')} style={styles.img} />
          <Text style={styles.title}>Create account</Text>
          <View style={styles.pressed}>
            <Text style={styles.pressedText2}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('FEXO')}>
              <Text style={styles.signUp}>Login</Text>
            </Pressable>
          </View>

          {/* Shipper / Carrier toggle */}
          <View style={styles.userTypeToggle}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'Shipper' && styles.selectedUserTypeButton
              ]}
              onPress={() => setUserType('Shipper')}
            >
              <Text style={[
                styles.userTypeText,
                userType === 'Shipper' && styles.selectedUserTypeText
              ]}>Shipper</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'Carrier' && styles.selectedUserTypeButton
              ]}
              onPress={() => setUserType('Carrier')}
            >
              <Text style={[
                styles.userTypeText,
                userType === 'Carrier' && styles.selectedUserTypeText
              ]}>Carrier</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>

              {/* Full Name */}
              <View style={styles.textBox}>
                <FontAwesome name="user-o" size={20} color="#6c757d" style={styles.icon} />
                <TextInput
                  placeholder="Full Name"
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              {/* Email */}
              <View style={styles.textBox}>
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
                <View style={styles.textBox}>
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
              <Pressable onPress={() => setShowDatePicker(true)} style={styles.textBox}>
                <MaterialIcons name="date-range" size={20} color="#6c757d" style={styles.icon} />
                <Text style={[styles.input, { paddingTop: 3, color: dob ? Colors.fexoBlue : '#6c757d' }]}>
                  {dob ? dob : 'Date of Birth'}
                </Text>
              </Pressable>

              {/* Date Picker */}
              {showDatePicker && (
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
              )}

              {/* Phone */}
              <View style={styles.textBox}>
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
              <View style={styles.textBox}>
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
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 350,
    height: 150,
    borderRadius: 50,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.fexoWhite,
    marginBottom: 10,
  },
  form: {
    margin: 20,
    width: '95%',
    padding: 20,
    backgroundColor: 'transparent',
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
    backgroundColor: Colors.fexoWhite,
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
    color: Colors.fexoWhite,
  },
  signUp: {
    color: '#4D81E7',
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
    marginTop: 10,
    marginBottom: 10,
  },
  userTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: Colors.fexoGrey,
  },
  selectedUserTypeButton: {
    backgroundColor: Colors.fexoOrange,
  },
  userTypeText: {
    color: Colors.fexoWhite,
    fontWeight: 'bold',
  },
  selectedUserTypeText: {
    color: Colors.fexoWhite,
  },
});

export default SignUp;
