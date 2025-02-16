// app/(auth)/SignIn/index.tsx
import { useSession } from '@/src/ctx';
import { useLogin } from '@/src/hooks/auth/useLogin';
import theme from '@/src/theme';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const SignInScreen = () => {
  const { login, loading, error } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace('/(main)');
    }
  }, [session, router]);

  const handleLogin = async () => {
    try {
      // Pass an object matching the LoginRequest interface
      const token = await login({ username, password });

      Toast.show({
        type: 'success',
        text1: 'Login Successful!',
        text2: 'Welcome to LEXi ! 👋'
      });

      console.log('Login successful:', token);

      // Redirect to the main area of the app
      router.push('/(main)');
    } catch (err: any) {

      Toast.show({
        type: 'error',
        text1: 'Login Failed!',
        text2: 'Try login in again'
      });

      console.error('Login failed:', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('@/assets/images/auth/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome back!</Text>

      {/* Form */}
      <View style={styles.form}>
        {/* Email Input */}
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Email</Text>
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

        {/* Remember Me and Forgot Password */}
        <View style={styles.flexRow}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkbox} />
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Link href={'/(auth)/ForgetPassword'}>
              <Text style={styles.span}>Forgot password?</Text>
            </Link>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {/* Sign Up Link */}
        <Link href={'/(auth)/Signup'}>
          <Text style={styles.p}>
            Don't have an account? <Text style={styles.span}>Sign Up</Text>
          </Text>
        </Link>
        <Text style={styles.p}>Or With</Text>

        {/* Social Buttons */}
        <View style={styles.flexRow}>
          <TouchableOpacity style={[styles.socialButton]}>
            <AntDesign name="google" size={24} color={styles.socialIcons.backgroundColor} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton]}>
            <AntDesign name="apple1" size={24} color={styles.socialIcons.backgroundColor} />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
    padding: 20,
  },
  avatarContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  form: {
    gap: 10,
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
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: theme.colors.blacks.dark,
    marginRight: 5,
  },
  checkboxLabel: {
    fontSize: 14,
    color: 'black',
  },
  span: {
    color: theme.colors.primary.medium,
    fontWeight: '500',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: theme.colors.primary.medium,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: theme.colors.background.beige,
    fontWeight: '500',
    fontSize: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary.medium2,
    backgroundColor: theme.colors.primary.medium2,
    marginHorizontal: 5,
  },
  socialIcons: {
    backgroundColor: theme.colors.background.beige,
  },
  socialButtonText: {
    fontWeight: '500',
    color: theme.colors.background.beige,
  },
  p: {
    textAlign: 'center',
    color: theme.colors.blacks.dark,
    fontSize: 14,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  errorText: { color: 'red', marginTop: 10 },
});

export default SignInScreen;
