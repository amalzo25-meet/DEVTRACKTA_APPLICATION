import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import ClickButton from './components/click';
import styles from './components/styles';

const Welcome = () => {
  
  const router = useRouter();

return (
  <View style={styles.container}>
    <Text style={styles.header1}>Welcome to MyPlantApp!</Text>
    <ClickButton label="go to sign up" HandlePress={() => router.push("/auth/signup")} />
    <ClickButton label="go to log in" HandlePress={() => router.push("/auth/login")} />

  </View>
);
};

export default Welcome;

