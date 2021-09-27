import {ADD_PLACE, SET_PLACES} from './places-actions';
import Place from '../models/place';

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
     
      let arrayPlaces = [];

     

      for (let i = 0; i < action.places.length; i++) {
        arrayPlaces.push({
          id: action.places.item(i).id,
          title: action.places.item(i).title,
          imageUri: action.places.item(i).imageUri,
          address: action.places.item(i).address,
          lat: action.places.item(i).lat,
          lng: action.places.item(i).lng
        });
      }
    
      return {
        places: arrayPlaces.map(
          pl => new Place(pl.id.toString(), pl.title, pl.imageUri, pl.address, pl.lat, pl.lng),
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
