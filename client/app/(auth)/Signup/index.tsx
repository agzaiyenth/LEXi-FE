import icon from '@/assets/images/auth/icon.png';
import theme from '@/src/theme';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSignup } from '@/src/hooks/auth/useSignup';

/**
 * SignUpScreen component for user registration.
 *
 * This screen provides a form for users to input their username, email,
   password, and confirm password. It validates the inputs, and redirects to the Sign-In page
   upon success.
 */

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading, error } = useSignup();
  const router = useRouter();

  /**
   * Handles the sign-up process.
   * This function performs basic input validation and if successful, it shows a success message and redirects to
    the Sign-In page.
   
   * @function handleSignUp
   */

  const handleSignUp = async () => {
    // Basic validation: check if password and confirmPassword match.
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Passwords do not match' });
      return;
    }

    try {
      const response = await signup({ fullName, username, email, password });
      console.log('Sign Up successful:', response);
      router.push('/(auth)/SignIn');
    } catch (err) {
      console.error('Sign Up failed:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={icon}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Create your account!</Text>

      {/* Form */}
      <View style={styles.form}>

        {/* Full Name Input */}
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Full Name</Text>
        </View>
        <View style={styles.inputForm}>
          <Feather name="user" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Enter your Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        {error?.fullName && <Text style={styles.errorText}>{error.fullName}</Text>}

        {/* Username Input */}
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Username</Text>
        </View>
        <View style={styles.inputForm}>
          <Feather name="user" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Enter your Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        {error?.username && <Text style={styles.errorText}>{error.username}</Text>}

        {/* Email Input */}
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Email</Text>
        </View>
        <View style={styles.inputForm}>
          <Feather name="mail" size={30} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        {error?.email ? <Text style={styles.errorText}>{error?.email}</Text> : null}
        {/* Password Input */}
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Password</Text>
        </View>
        <View style={styles.inputForm}>
          <Feather name="lock" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#666" />
          </TouchableOpacity>
        </View>
        {error?.password && <Text style={styles.errorText}>{error.password}</Text>}

        <View style={styles.flexColumn}>
          <Text style={styles.label}>Confirm Password</Text>
        </View>
        <View style={styles.inputForm}>
          <Feather name="lock" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Redirect to Sign In */}
        <Link href={'/(auth)/SignIn'}>
          <Text style={styles.p}>
            Already have an account? <Text style={styles.span}>Sign In</Text>
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
    padding: 20,
  },
  avatarContainer: {
    marginTop: 10,
    marginBottom: 4,
    alignItems: 'center',
  }, welcomeText: {
    fontSize: theme.fonts.sizes.s24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  form: {
    gap: 6,
    backgroundColor: theme.colors.background.offWhite,
    padding: 20,
    borderRadius: 20,
  },
  flexColumn: {
    marginBottom: 5,
  },
  label: {
    color: theme.colors.blacks.dark,
    fontWeight: '600',
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.blacks.dark,
    borderWidth: 1.5,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: theme.colors.primary.medium,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10
  },
  submitButtonText: {
    color: theme.colors.background.beige,
    fontWeight: '500',
    fontSize: theme.fonts.sizes.s16,
  },
  span: {
    color: theme.colors.primary.medium,
    fontWeight: '500',
    fontSize: theme.fonts.sizes.s14,
  },
  p: {
    textAlign: 'center',
    color: theme.colors.blacks.dark,
    fontSize: theme.fonts.sizes.s14,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default SignUpScreen;

