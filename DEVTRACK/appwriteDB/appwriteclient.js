import { Account, Client, Databases } from "react-native-appwrite";

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6931bad20032d2bbd9dd');

export const account = new Account(client);
export const databases = new Databases(client); //this is not needed for basic auth, maybe i'll use it in the future