import {DIRECCION_SERVER} from '@env';
import React,{useState} from 'react';


export default class Conexion{
    constructor(){}
  
    conexiones(){
        var  ws =  React.useRef(
            new WebSocket(`${DIRECCION_SERVER}`),
          ).current; //direccion chat 
          return ws;
    }

     checkServer(con){
        const [serverState,setServerState] = useState("");
       React.useEffect(()=>{
              con.onopen = () => {
                // se habre conexion al server
                setServerState('Connected to the server');
                console.log('connected to the server coenxion');
               // setDisableButton(false);
               return 'Conected to the server';
              };

            con.onclose = e => {
                // Por si se desconecta
              setServerState('Disconnected check internet or server');
              // setDisableButton(true)
               return 'disconnected  from the server';
              };
              con.onerror = e => {
                // Mensaje de error
                setServerState(e.message);
                console.log('error'+e.message);
              };
        });
      
        return serverState;
    }
    sendMessage(con,mensaje){
        con.send(mensaje);
    }
}