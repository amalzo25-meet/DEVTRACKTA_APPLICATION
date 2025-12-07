import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Camera, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ClickButton from '../components/click';


const Userview = () => {

  const [facing, setFacing] = useState('back');
  const [hasPermission, setHasPermission] = useState(null);
  const camref = useRef(null);
  const [Uri, setUri] = useState(null);
  const [results, setResults] = useState(null);
  const navigation = useNavigation();


  const API_KEY = '2b10tIMqXZKRnoUS4a7HMjwLhO';

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading camera permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>We need your permission to show the camera,
        it appears that you have permenantly disabled it from your settings, please enable it there and come back</Text>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await camref.current?.takePictureAsync();
    if (photo?.uri) setUri(photo.uri);
    console.log(Uri)
  };

  const PlantIdentifier = async () => {

    if (!Uri) {Alert.alert('NO IMAGE FOUND', 'You have to Take a picture before identifying', [
                            {
                                text: 'Ok',
                                onPress: {},
                                style: 'cancel',
                            },
                        ]);
                      return;}

    setResults(null);

    try {

      const FilePath = Uri.split('/').pop();
      let mimeType = 'image/jpeg';
      if (FilePath) {
        if (FilePath.endsWith('.png')) mimeType = 'image/png';
        else if (FilePath.endsWith('.jpg') || FilePath.endsWith('.jpeg')) mimeType = 'image/jpeg';
      }

      const formData = new FormData();
      formData.append('images', {
        uri: Uri,
        type: mimeType,
        name: FilePath || 'plant.jpg',
      });

    formData.append('organs', 'auto');
    
    const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${API_KEY}&include-related-images=false&lang=en`;


    const response = await axios({
      url: url,
      method: 'POST',
      data: formData,
    });

    setResults(response.data);

    }
    catch(e){
      console.log('Error during API call:', e.response ? e.response.data : e.message);

    }

  }

  const toggleCameraFacing = () => {

    if (facing == 'back') {
      setFacing('front')
      console.log('front')
    }
    if (facing == 'front') {
      setFacing('back')
      console.log('back')
    }
    
  }



  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <ScrollView>
      <View style={{height: 600}}>
      <CameraView style={styles.camera} facing={facing} ref={camref}/>
      </View>
      <ClickButton HandlePress={toggleCameraFacing} label='flip camera' />
      <ClickButton HandlePress={takePicture} label="Take Photo"/>
      <ClickButton HandlePress={PlantIdentifier} label="Show plant"/>
      {results && results.results && results.results.length > 0 && (
        <>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 16}}>Results:</Text>
          {results.results.slice(0, 3).map((result, index) => (
            <View key={index} style={styles.resultCard}>
              <Text>
                {result.species?.scientificNameWithoutAuthor || 'Unknown'}
              </Text>
              <Text>
                {(result.score * 100).toFixed(1)}% confident
              </Text>
              <ClickButton label="plant history" HandlePress={() => navigation.navigate("page2", { plantName: result.species?.scientificNameWithoutAuthor })} />
            </View>
          ))}
        </>
      )}
      {Uri && (
        <Image 
          source={{uri: Uri}} 
          style={{ width: 300, height: 400 }} 
        />
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  }
});

export default Userview;