import { TextInput, View } from 'react-native';
import styles from './styles';

const TextBox = ({placeholder, changetext, text}) => {


    return(
        
        <View>
        <TextInput placeholder={placeholder}
        onChangeText={changetext} 
        defaultValue={text}
        placeholderTextColor="#666"
        style={styles.textbox}/>
        </View>

    );

}

export default TextBox;