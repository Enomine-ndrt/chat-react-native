import React,{useEffect} from 'react';
import {
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RNLocation from 'react-native-location';
import GPS from './Gps';
import {DIRECCION_SERVER} from '@env';
import Conexion from './Conexion';

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

RNLocation.configure({
  distanceFilter: 5.0,
});
const Chat = () => {

  /**
   * Hooks para estados
   */
  const [serverState, setServerState] = React.useState('Loading...'); //hook para estado de server
  const [messageText, setMessageText] = React.useState(''); // hook para mensaje
  const [disableButton, setDisableButton] = React.useState(true); // hook para estado de boton
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true); // hook
  const [serverMessages, setServerMessages] = React.useState([]); // hook para mensajes
  const [mesaje,setMesaje] = React.useState('');
  const serverMessagesList = [];

 
 const con = new Conexion();

 const server=  con.conexiones();
 const serverStatus = con.checkServer(server);

    useEffect(()=>{
     server.onmessage = e => {
        /**
         *ServerMessage list
         * @type {Array}
         */
        
        var indice = e.data.indexOf(" ");
         let extraida = e.data.substring(0, indice);

         var ms = extraida.split(":");
         var mss = ms[1];
      
          console.log("onmessage "+mss);   
        serverMessagesList.push(e.data); //se guardar en un array el mensaje
        setServerMessages([...serverMessagesList]); //se envia con el hook 
    };
  },[]);
 
  
   
  return (
    <View style={styles.body}>
      {/* View con estilo body */}
      <View style={styles.backgroundColor}>
        <Text>{serverStatus}</Text>
       
      </View>
      
      <View style={styles.scrollview}>
        {/* Se hace uso de funcion importada Map */}
        
        <ScrollView>
          
          {serverMessages.map((item, ind) => {
           
            return (
              <View style={styles.messages}>
                  <Text>
                {item}
              </Text>
              </View>
              
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
        <GPS  chat={messageText} />
       
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
    padding: 4,
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
  messages:{
    marginTop: 5,
    backgroundColor: '#fff',
    borderColor: 'black',
    height: 60,
    width: '90%',
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopEndRadius: 7,
    borderTopLeftRadius: 7,
  }
});

export default Chat; //se exporta el app
