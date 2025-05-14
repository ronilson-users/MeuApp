import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const ButtonComponent = (props) => {
  return (
    <View style={styles.container}>
      <Button
        title={props.title}
        onPress={props.onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5, 
    backgroundColor: '#7111af',
  },
});

export default ButtonComponent;