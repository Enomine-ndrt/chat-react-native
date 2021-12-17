import React from 'react';
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

const Map = () => {
  return (
    <View style={styles.body}>
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
    height: '40%',
  },
});

export default Map;
