import { Image, ScrollView, View } from "react-native";




const Trialimage = () => {
return (
  <View>
    <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBWODwrFHzq50JTUrOE5Y1bw-B1wz-xOBLMFdJ8Eyn6eiz5jJpvk-9YVZejSq78QRN19ZGZAGaBI1SPhbjpmuej-Ep942pI0hdcy16A&s=10"}} style={{width: 300, height: 400}} />
  </View>
);
};

const userview = () => {
return (
  <View style={{ flex : 1, marginTop:100}}>
    <ScrollView>
    <Trialimage />
    </ScrollView>
  </View>
);
};

export default userview;

