//import variable 
import {DIRECCION_SERVER} from '@env';
import React from 'react';
import {
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Mensaje = (props) => {
  var ws = React.useRef(
    new WebSocket(`${DIRECCION_SERVER}`),
  ).current; //direccion chat
  //const [serverMessages, setServerMessages] = React.useState([]); // hook para mensajes
 //const [mensajes, setMensajes] = React.useState(''); // hook para mensaje
 // const serverMessagesList = [];

  const timeNow = new Date().toLocaleString(); // funcion javascript para tomar el tiempo
  let mensaje = props.mensaje;
  let locations = props.location;
   var estado = props.estado;
/*
  console.log('h '+mensaje +" location latitude: "+
  location.latitude +" longitud "
  +location.longitude+" estado "+estado);
*/
  //setMensajes(mensaje);
  React.useEffect(() => {
    /**
     * lista de mensajes
     * @type {Array}
     */
    //const serverMessagesList = [];
    ws.onopen = () => {
      // se habre conexion al server
     // setServerState('Connected to the server');
     console.log('connected to the server');
      //setDisableButton(false);
    };
    ws.onclose = e => {
      // Por si se desconecta
     // setServerState('Disconnected check internet or server');
     console.log('disconnected from the server');
     // setDisableButton(true);
    };
    ws.onerror = e => {
      // Mensaje de error
      //setServerState(e.message);
      console.log('error'+e.message);
    };
    ws.onmessage = e => {
      /**
       *ServerMessage list
       * @type {Array}
       */
      //serverMessagesList.push(e.data); //se guardar en un array el mensaje
      //setServerMessages([...serverMessagesList]); //se envia con el hook
    };
   // ws.send(mensaje); //envia mensaje mas tiempo actual

  }, []);

  if(estado){
    const timeNow = new Date().toLocaleString(); // funcion javascript para tomar el tiempo
    ws.send('time'+timeNow+' mensaje '+mensaje+' latitude '+locations.latitude+' longitude '+locations.longitude); //envia mensaje mas tiempo actual
   
  }
 
  return null;
};

export default Mensaje;
