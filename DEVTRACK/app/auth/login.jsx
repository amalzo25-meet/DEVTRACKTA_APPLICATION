import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { account } from '../../appwriteDB/appwriteclient';
import ClickButton from '../components/click';
import styles from '../components/styles';
import TextBox from '../components/textbox';

const login = () => {

    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [success, setsuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
    if (success) {
      router.push("/content/page1");
    }
  }, [success]);

    useEffect(()=>{
            console.log('amal1')
            const CheckLogIn = async () => {
                try {
                    console.log('amal2')
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
        }, [loggedIn])

    const HandleSignInButton = async () => {

        setLoggedIn(!loggedIn)
        
        try {    
        await account.createEmailPasswordSession(email, password); 
        setsuccess(true);
        }
        catch (error) {
        console.log('Error during sign in:', error.message || error); 
        setsuccess(false)
        }
    }

return (
  <View style={styles.container}>
    <Text style={styles.header2}>Welcome to the Developer's Track!</Text>

    <TextBox placeholder="Enter Your Email" changetext={newtxt => setemail(newtxt)} text = {email}/>
    <TextBox placeholder="Enter Your Password" changetext={newtxt => setpassword(newtxt)} text = {password}/>
    
    <ClickButton label="Log In!!" HandlePress={HandleSignInButton} />
    <ClickButton label="go to sign up" HandlePress={() => router.push("/auth/signup")} />

  </View>
);
}

export default login;
