import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ID } from 'react-native-appwrite';
import { account } from '../../appwriteDB/appwriteclient';
import ClickButton from '../components/click';
import TextBox from '../components/textbox';

const signup = () => {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [success, setsuccess] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
    if (success) {
      router.push("/content/page1");
    }
  }, [success]);

  

    useEffect(()=>{
        const CheckLogIn = async () => {
            try {
                const person = await account.get();
                Alert.alert('Already Logged In',
                `You are already logged in as ${person.name}. Do you want to log out or stay?`,
                [
                    {
                        text: 'Log out',
                        onPress: async () => {
                            await account.deleteSession('current')
                            Alert.alert('try to log in again')
                        },
                        style: 'destructive',
                    },
                    {
                        text: 'Stay',
                        onPress: () => {router.push('/content/page1')},
                        style: 'cancel',
                    },
                ]
                )
                }
                
                catch (e)
                {
                    console.log('continue')
                }
            }

        CheckLogIn();
    }, [])
        

    

    const HandleSignUpButton = async () => {

        try {
        await account.create(ID.unique(), email, password, username);    
        await account.createEmailPasswordSession(email, password); 
        setsuccess(true);
        }
        catch (error) {
        console.error('Error during sign up:', error.message || error); 
        setsuccess(false)
        }
    }

return (
  <View style={styles.container}>
    <Text>Welcome to the Developer's Track!</Text>

    <TextBox placeholder="Enter Your Username" changetext={newtxt => setusername(newtxt)} text = {username}/>
    <TextBox placeholder="Enter Your Email" changetext={newtxt => setemail(newtxt)} text = {email}/>
    <TextBox placeholder="Enter Your Password" changetext={newtxt => setpassword(newtxt)} text = {password}/>
    
    <ClickButton label="Sign Up!" HandlePress={HandleSignUpButton} />
    <ClickButton label="go to sign in" HandlePress={() => router.push("/auth/login")} />



  </View>
);
}

export default signup;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: 100
}})