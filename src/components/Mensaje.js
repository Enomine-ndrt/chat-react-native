//import variable 
import {DIRECCION_SERVER} from '@env';
import React,{useEffect} from 'react';
import Conexion from './Conexion'
var contador = 0;//variable contador que se incrementa segun sea llamada la funcion
const Mensaje = (props) => {
 const timeNow = new Date().toLocaleString(); // funcion javascript para tomar el tiempo
 let mensaje = props.mensaje;
 
 var estado = props.estado; 
 try{
  const con = new Conexion();
 
  var server= con.conexiones();
 
  con.checkServer(server);

  var ms = null;
  if(mensaje.length > 0){
    ms = mensaje;
  }else{
    ms = null;
  }

  var p = contador%2;//saco el modulo de contador para evitar duplicados
 if(estado && (p == 0)){
  let locations = props.location;
  con.sendMessage(server,"mensaje:"+ms+" latitude: "+locations.latitude+" longitude: "+locations.longitude+" timeNow:"+timeNow);
  estado = false;//devuelvo a falso el estado para evitar que se quede en true
 }
 contador++;

 }catch(err){
   console.log("mensaje err "+err);
 }

  return null;
};

export default Mensaje;
