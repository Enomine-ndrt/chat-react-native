import React from 'react';
import {
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Map from './Map'; //importar Map para uso de mapa
/**
 *App de Chat
 *
 *@Component
 *@property {string} serverState - hook server state
 *@property {string} messageText - hook mensaje
 *@property {boolean} disableButton - hook estado de boton
 *@property {boolean} inputFieldEmpty - hook estado de caja de texto
 @property  {array<string>} serverMessages - hook mensajes del server
 *@param {Function} useRef - direccion de server de los mensajes
 *@param {Function} useEffect - se usa para establecer conexion al servidor con web_socket
*@param {Function} timeNow - se usa para obtener la fecha y hora actual
*@param {Function} submitMessage - Envia el mensaje cuando es pulsado el boton submit  
 *@return {View} 
 *@exmaple
 *return (
 * <App />
 * )
 */
const App = () => {
  /**
   * Hooks para estados
   */
  const [serverState, setServerState] = React.useState('Loading...'); //hook para estado de server
  const [messageText, setMessageText] = React.useState(''); // hook para mensaje
  const [disableButton, setDisableButton] = React.useState(true); // hook para estado de boton
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true); // hook
  const [serverMessages, setServerMessages] = React.useState([]); // hook para mensajes

  /**
   * Conexion a direccion de servidor
   */
  var ws = React.useRef(
    new WebSocket('https://chat-docker-nodejs.herokuapp.com/:56436'),
  ).current; //direccion chat

  const timeNow = new Date().toLocaleString(); // funcion javascript para tomar el tiempo

  React.useEffect(() => {
    /**
     * lista de mensajes
     * @type {Array}
     */
    const serverMessagesList = [];
    ws.onopen = () => {
      // se habre conexion al server
      setServerState('Connected to the server');
      setDisableButton(false);
    };
    ws.onclose = e => {
      // Por si se desconecta
      setServerState('Disconnected check internet or server');
      setDisableButton(true);
    };
    ws.onerror = e => {
      // Mensaje de error
      setServerState(e.message);
    };
    ws.onmessage = e => {
      /**
       *ServerMessage list
       * @type {Array}
       */
      serverMessagesList.push(e.data); //se guardar en un array el mensaje
      setServerMessages([...serverMessagesList]); //se envia con el hook
    };
  }, []);
  /**
   *submitMessage
   *
   * @param {string} messageText - envia mensaje al servidor
   */
  const submitMessage = () => {
    /**
     *send
     * @param {string} messageText -mensaje
     * @param {string} '' -mensaje time
     * @param {string} timeNow -fecha y hora actual
     */
    ws.send(messageText + ' time ' + timeNow); //envia mensaje mas tiempo actual
    setMessageText('');
    setInputFieldEmpty(true);
  };

  return (
    <View style={styles.body}>
      {/* View con estilo body */}
      <View style={styles.backgroundColor}>
        <Text>{serverState}</Text>
        <Button title="GPS" />
      </View>

      <View style={styles.scrollview}>
        {<Map />}
        {/* Se hace uso de funcion importada Map */}
        <ScrollView>
          {serverMessages.map((item, ind) => {
            return (
              <Text>
                key={ind}, item={item}
              </Text>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={'Add Message'}
          onChangeText={text => {
            setMessageText(text);
            setInputFieldEmpty(text.length == 0 ? false : true);
          }}
          value={messageText}
        />
        <Button
          onPress={submitMessage} //onpress succede cuando se pulsa el boton
          title="submit"
          disabled={disableButton}
        />
      </View>
    </View>
  );
};

/**
 * Estilos para chat
 * @property {array} body - estilos para body
 * @property {array} background - estilos para background de estado de servidor
 * @property {array} scrollview - estilos para scroll view
 * @property {array} row - ordenamiento tipo row
 * @property {array} input - estilos para input
 */
const styles = StyleSheet.create({
  body: {
    //estilos de body
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 30,
    padding: 8,
  },
  backgroundColor: {
    //color background
    height: 30,
    backgroundColor: '#eeceff', // color backgroundColor
    padding: 5,
  },
  scrollview: {
    backgroundColor: '#ffeece', // color background de scroll
    padding: 5,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    flexGrow: 1,
    padding: 5,
  },
});

export default App; //se exporta el app
