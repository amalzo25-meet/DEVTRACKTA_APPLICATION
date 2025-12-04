import { Text, TouchableOpacity, View } from 'react-native';



const ClickButton = ({label, HandlePress}) => {


  return (
    <View>
      <TouchableOpacity
        onPress={HandlePress}
        style={{ backgroundColor: "red", padding: 10, borderRadius: 5, }}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClickButton;