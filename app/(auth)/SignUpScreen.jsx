import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import AuthFormLayout from '../../components/AuthFormLayout';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, loading, errorMessage } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    try {
     
      await signUp(name, cpf, email, password);
      
      if (!errorMessage) {
        setSuccessMessage('Cadastro realizado com sucesso!');
        
        setTimeout(() => router.replace('/(drawer)/(tabs)/home'), 1500);
     
        
      }
    } catch (error) {
      console.log('Erro no handleSubmit:', error);
    }
  };

  return (
    <AuthFormLayout title="Cadastro">
      <InputComponent placeholder="Nome" value={name} onChangeText={setName} />
      
      <InputComponent placeholder="CPF" value={cpf} onChangeText={setCpf} />
      
      <InputComponent placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      
      <InputComponent placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {errorMessage && <Text style={styles.messageError}>{errorMessage}</Text>}
      
      {successMessage && <Text style={styles.messageSuccess}>{successMessage}</Text>}
      
      <ButtonComponent title="Cadastrar" onPress={handleSubmit} disabled={loading} />
      <ButtonComponent 
        title="Já tenho conta" 
        onPress={() => router.push('/SignInScreen')} 
        type="secondary" 
      />
    </AuthFormLayout>
  );
}

const styles = StyleSheet.create({
  messageError: {
    color: '#f01717',
    marginVertical: 10,
    textAlign: 'center',
  },
  messageSuccess: {
    color: 'green',
    marginVertical: 10,
    textAlign: 'center',
  },
});