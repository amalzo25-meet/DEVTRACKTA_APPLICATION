import { TextInput, View } from 'react-native';

const TextBox = ({placeholder, changetext, text}) => {


    return(
        
        <View>
        <TextInput placeholder={placeholder}
        onChangeText={changetext} 
        defaultValue={text}
        placeholderTextColor="#666"
        style = {{borderWidth: 2, borderColor: '#ccc', padding: 12, borderRadius: 5, fontSize: 16,}}/>
        </View>

    );

}

export default TextBox;