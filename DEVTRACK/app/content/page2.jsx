import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Query } from 'react-native-appwrite';
import { account, databases } from '../../appwriteDB/appwriteclient';
import styles from '../components/styles';

const Userview2 = () => {

  const route = useRoute();
  const [plants, setPlants] = useState({});



  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const person = await account.get();
        const response = await databases.listDocuments(
          "IMAGEGALLERY",
          "plants_users",
          [Query.equal("userID", person.$id)]
        );

        if (response.documents.length > 0) {
          const userData = JSON.parse(response.documents[0].userData || '{}');
          setPlants(userData.plants || {});
        }
      } catch (e) {
        console.log(e);
        setPlants({});
      }
    };

    if (route.params?.plantlist) {
      setPlants(route.params.plantlist);
    } else {
      fetchPlants();
    }
  }, [route.params]);


  return(
    <View style = {{backgroundColor: '#6E260E', flex: 1}}>
    <ScrollView>
    <Text style={styles.header3}>Plant History:</Text>

              {Object.keys(plants).length === 0 && (
        <Text>No plants yet.</Text>
        )}

        {Object.keys(plants).map((plantId) => (
        <Text key={plantId} style={{ fontSize: 17, marginTop: 5, color:'#DAA06D', marginInlineStart: 40}}>
        • {plants[plantId]}
        </Text>
        ))}
        </ScrollView>
    </View>
  );
}

export default Userview2;