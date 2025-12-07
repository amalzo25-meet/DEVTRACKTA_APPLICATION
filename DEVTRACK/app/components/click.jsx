import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';




const ClickButton = ({label, HandlePress}) => {


  return (
    <View>
      <TouchableOpacity
        onPress={HandlePress}
        style={styles.button}>
        <Text style={styles.buttontext}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClickButton;