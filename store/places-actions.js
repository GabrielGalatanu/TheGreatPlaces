export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
import {insertPlace, fetchPlaces} from '../helpers/db';
import ENV from '../env';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    // require the module
    var RNFS = require('react-native-fs');

    // get a list of files and directories in the main bundle
    // RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //   .then(result => {
    //     console.log('GOT RESULT', result);

    //     // stat the first file
    //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //   })
    //   .then(statResult => {
    //     if (statResult[0].isFile()) {
    //       // if we have a file, read it
    //       return RNFS.readFile(statResult[1], 'utf8');
    //     }

    //     return 'no file';
    //   })
    //   .then(contents => {
    //     // log the file contents
    //     console.log('contents: ');
    //     console.log(contents);
    //   })
    //   .catch(err => {
    //     console.log('error: ');
    //     console.log(err.message, err.code);
    //   });

    console.log('Nume imagine:' + image.split('/').pop());

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`,
    );

    if (!response) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    if (!resData.results) {
      throw new Error('Something went wrong!');
    }
    const address = resData.results[0].formatted_address;
    let path = RNFS.DocumentDirectoryPath + '/' + image.split('/').pop();
    let imageName = image.split('/').pop();

    RNFS.copyFile(image, path)
      .then(success => {
        console.log('File moved!');

        insertPlace(title, imageName, address, location.lat, location.lng)
          .then(success => {
            console.log(success);

            dispatch({
              type: ADD_PLACE,
              placeData: {
                id: success.insertId,
                title: title,
                image: imageName,
                address: address,
                coords: {lat: location.lat, lng: location.lng},
              },
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err.message);
      });

    console.log('test end');
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();

      dispatch({type: SET_PLACES, places: dbResult.rows});
    } catch (err) {
      throw err;
    }
  };
};
