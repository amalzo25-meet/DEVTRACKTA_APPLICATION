import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import ClickButton from './components/click';

const Welcome = () => {
  
  const router = useRouter();

return (
  <View style={styles.container}>
    <Text>Welcome to the Developer's Track!</Text>
    <ClickButton label="go to sign up" HandlePress={() => router.push("/auth/signup")} />
    <ClickButton label="go to log in" HandlePress={() => router.push("/auth/login")} />

  </View>
);
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: 100
}})