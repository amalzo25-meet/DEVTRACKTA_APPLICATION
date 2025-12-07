import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';


const authLayout = () => {
    return(
        <View style={styles.container}>
        <Stack>
            <Stack.Screen name="signup" options={{headerShown:false}}/>
            <Stack.Screen name="login" options={{headerShown:false}}/>
        </Stack>
        </View>
        
    );
}

export default authLayout;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
},
});