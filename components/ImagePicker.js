import React, {useState} from 'react';
import {View, Button, Image, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const ImgPicker = props => {
  const [resourcePath, setResourcePath] = useState('');

  const takeImageHandler = () => {
    

      let options = {
        title: 'Select Image',
        customButtons: [
          {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
        ],
        storageOptions: {
          skipBackup: false,
          path: 'images',
        },
        allowsEditing: true,
        aspect: [16,9],
      
      };


      
     launchImageLibrary(options, res => {
        console.log('Response = ', res);
        
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);

          alert(res.customButton);
        } else {
          let source = res;

         
          setResourcePath(source.assets[0].uri);
          props.onImageTaken(source.assets[0].uri);
        }
      });
    
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {/* <Text>No image picked yet</Text> */}
        {/* <Image style={styles.image} /> */}
        <Image source={{uri: resourcePath}} style={styles.image} />
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImgPicker;
