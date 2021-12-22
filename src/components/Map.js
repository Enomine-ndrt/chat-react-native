import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

/**
 *Map
 *@return{View}
 * @example
 * return (
 *<View style={styles.body}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.6770302,
          longitude: -103.4019035,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
 * )
 */

const Map = props => {
  const location = props.location;
  const mapRef = useRef(null);

  [viewLocation, setViewLocation] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  if (!isObjEmpty(location)) {
    const currentLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current.animateToRegion(currentLocation, 3 * 1000);
  }
  return (
    <View style={styles.body}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 20.6770302,
          longitude: -103.4019035,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={viewLocation => setViewLocation(viewLocation)}
      />
    </View>
  );
};

/**
 * estilos para map
 * @property {array} body - Estilos para body de elemento mapa
 * @property {array} map - Estilos para mapa
 */
const styles = StyleSheet.create({
  body: {
    marginTop: -95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
});

export default Map;

/**
 *
 * @param {Object} obj - recive un objeto
 * @returns true or false
 */
function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}
