import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';


const NavigateButton2 = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push("/content/page1")}
        style={{ backgroundColor: "red", padding: 10, borderRadius: 5, }}
      >
        <Text>Go to first Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const Userview2 = () => {
    return(
    <View style = {{ flex : 1, marginTop:100}}>
        <NavigateButton2 />
    </View>
    );
}

export default Userview2;