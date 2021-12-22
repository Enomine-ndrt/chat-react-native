import React from 'react';
import {
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Chat from './components/Chat';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
 
  return (
    <View style={styles.body}>
      <Chat />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    //estilos de body
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 0,
    padding: 0,
  },
});

export default App; //se exporta el app
