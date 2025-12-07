import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Camera, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ID, Query } from 'react-native-appwrite';
import { account, databases } from '../../appwriteDB/appwriteclient';
import ClickButton from '../components/click';
import styles from '../components/styles';

const Userview = () => {

  const [facing, setFacing] = useState('back');
  const [hasPermission, setHasPermission] = useState(null);
  const camref = useRef(null);
  const [Uri, setUri] = useState(null);
  const [results, setResults] = useState(null);
  const navigation = useNavigation();
  const [plantName, setplantName] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  


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
    const topPlantName = response.data?.results?.[0]?.species?.scientificNameWithoutAuthor || null;
    setplantName(topPlantName);


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

  const CheckPlants = async () => {
  const person = await account.get();
  const response = await databases.listDocuments(
    'IMAGEGALLERY',
    'plants_users',
    [Query.equal('userID', person.$id)]
  );

  const plantId = `plant_${Date.now()}`;

  if (response.documents.length > 0) {
    let raw = response.documents[0].userData;
    let UserData = {};

    try {
      UserData = JSON.parse(raw);

      if (typeof UserData === "string") {
        UserData = JSON.parse(UserData);
      }
    } catch (e) {
      console.log("Parse error:", e);
      UserData = {};
    }

    if (!UserData.plants) UserData.plants = {};
    UserData.plants[plantId] = plantName;
    console.log(plantName);


    return await databases.updateDocument(
      'IMAGEGALLERY',
      'plants_users',
      response.documents[0].$id,
      {
        userID: person.$id,
        userData: JSON.stringify(UserData)
      }
    );
  }

  const userDataC = {
    name: person.name,
    plants: { [plantId]: plantName }
  };

  return await databases.createDocument(
    'IMAGEGALLERY',
    'plants_users',
    ID.unique(),
    {
      userID: person.$id,
      userData: JSON.stringify(userDataC)
    }
  );
};



  return (
    <View style={styles.camcontainer}>
      <ScrollView>
      <Text style={styles.header2}>Open the camera and see for yourself!</Text>
      <View style={{alignItems:'center'}}> 
      <ClickButton
        HandlePress={() => setShowCamera(prev => !prev)}
        label="Camera (Show / Hide)" />
        </View>
      {showCamera && (
        <View style={{height: 600}}>
        <CameraView style={styles.camera} facing={facing} ref={camref} /></View>)}  
            <View style={{alignItems:'center'}}> 

      <ClickButton HandlePress={toggleCameraFacing} label='flip camera' />
      <ClickButton HandlePress={takePicture} label="Take Photo"/>
      <ClickButton HandlePress={PlantIdentifier} label="Show plant"/>
      {results && results.results && results.results.length > 0 && (
        <>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 16, color:'#DAA06D'}}>Results:</Text>
          {results.results.slice(0, 3).map((result, index) => (
            <View key={index} style={styles.resultCard}>
              <Text style={{color:'#6E260E'}}>
                {result.species?.scientificNameWithoutAuthor || 'Unknown'}
              </Text>
              <Text>
                {(result.score * 100).toFixed(1)}% confident
              </Text>
              <ClickButton 
  label="show in history" 
  HandlePress={async () => {
    await CheckPlants();
    navigation.navigate("page2");
  }} 
/>
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
      </View>
      </ScrollView>
    </View>
  );
};


export default Userview;