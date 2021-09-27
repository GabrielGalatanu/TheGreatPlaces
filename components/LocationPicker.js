import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import Geolocation from '@react-native-community/geolocation';

import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [location, setLocation] = useState('');

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  const { onLocationPicked } = props;

  useEffect(() => {
    if(mapPickedLocation){
      setLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked])

  let watchID = null;
  const getLocationHandler = () => {
    console.log('aloo');

    Geolocation.getCurrentPosition(
      info => {
        console.log({lat: info.coords.latitude, lng: info.coords.longitude});
        setLocation({lat: info.coords.latitude, lng: info.coords.longitude});
        props.onLocationPicked({lat: info.coords.latitude, lng: info.coords.longitude});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    // Geolocation.getCurrentPosition(
    //   position => {
    //     const initialPosition = JSON.stringify(position);
    //     setInitialPosition(initialPosition);
    //   },
    //   error => Alert.alert('Error', JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );
    // watchID = Geolocation.watchPosition(position => {
    //   const lastPosition = JSON.stringify(position);
    //   setLastPosition(lastPosition);
    // });
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={location} onPress={pickOnMapHandler}> 
        <Text>No location chosen yet!</Text>
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get user location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
});

export default LocationPicker;
