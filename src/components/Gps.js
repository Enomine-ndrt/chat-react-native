/**
 * Manejo del gps
 * @returns View
 */
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import RNLocation from 'react-native-location';
import {useState, useRef, useEffect} from 'react';
import Map from './Map';
import Mensaje from './Mensaje';

RNLocation.configure({
  distanceFilter: 5.0,
});

const GPS = (props) => {
 
  const [locationGPS, setLocationGPS] = useState([])
  const [estado,setEstado] = useState(false);

  const getLocation = async () => {
    
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or always
      android: {
        detail: 'fine', // or coarse
      },
    });

  console.log(permission);
    let location;
   
    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine', // or coarse,
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
   
     // console.log(permission);
    
      location = await RNLocation.getLatestLocation({timeout: 100});
      setLocationGPS(location);
    } else {
      setEstado(permission);
      location = await RNLocation.getLatestLocation({timeout: 100});
      setLocationGPS(location);
    }
  };

  return (
    <View>
      <Mensaje mensaje={props.chat} location={locationGPS} estado={estado}/>
      <Button title={'Submit'} onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    display: 'none',
  },
});

export default GPS;
