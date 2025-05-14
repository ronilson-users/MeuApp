import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/AuthContext.jsx';
import InputComponent from '@/components/InputComponent';
import ButtonComponent from '@/components/ButtonComponent';

import AuthFormLayout from '@/components/AuthFormLayout';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, loading, errorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 
const handleSubmit = async () => {
  setSuccessMessage('');
  const success = await signIn(email, password);
  if (success) {
    setSuccessMessage('Login realizado com sucesso!');
    setTimeout(() => router.replace('/(drawer)/(tabs)/home'), 1500);
  }
};

  return (
    <AuthFormLayout title="Login">
      <InputComponent placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <InputComponent placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      
      {errorMessage ? <Text style={styles.messageError}>{errorMessage}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#3fbd38" />
      ) : (
        <>
          <ButtonComponent title="Entrar" onPress={handleSubmit} />
          <ButtonComponent title="Cadastrar-se" onPress={() => router.push('/SignUpScreen')} />
          
          {successMessage ? <Text style={styles.messageSuccess}>{successMessage}</Text> : null}
        </>
      )}
    </AuthFormLayout>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  messageError: {
    color: '#f01717',
    marginVertical: 10,
    textAlign: 'center',
  },
  messageSuccess: {
  color: '#3fbd38',
  marginVertical: 10,
  textAlign: 'center',
},
});