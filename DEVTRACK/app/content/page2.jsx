import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ID, Query } from 'react-native-appwrite';
import { account, databases } from '../../appwriteDB/appwriteclient';



const Userview2 = () => {

  const [plants, setPlants] = useState({}); 
  const route = useRoute();
  const plantName = route.params?.plantName;


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

    setPlants(UserData.plants || {});

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


  return(
    <View style = {{ flex : 1, marginTop:100}}>
        <TouchableOpacity
        onPress={CheckPlants}
        style={{ backgroundColor: "red", padding: 10, borderRadius: 5, }}
      >
        <Text>Add Plant</Text>        
      </TouchableOpacity>
              {Object.keys(plants).length === 0 && (
        <Text>No plants yet.</Text>
        )}

        {Object.keys(plants).map((plantId) => (
        <Text key={plantId} style={{ fontSize: 16, marginTop: 5 }}>
        • {plants[plantId]}
        </Text>
        ))}
    </View>
  );
}

export default Userview2;