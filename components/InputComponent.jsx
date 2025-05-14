import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputComponent = (props) => {
 return (
  <View style={styles.container}>
   <TextInput
    style={styles.input}
    placeholder={props.placeholder}
    value={props.value} // valor controlado pelo pai
    onChangeText={props.onChangeText} // função do pai para atualizar o estado
    secureTextEntry={props.secureTextEntry || false}
   />
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  marginBottom: 10,
 },
 input: {
  height: 40,
  borderColor: 'gray',
  borderRadius: 3,
  borderWidth: 1,
  paddingHorizontal: 10,
 },
});

export default InputComponent;