import {Alert} from 'react-native';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {initializeApp} from '@react-native-firebase/app';
import dbServices from './database';

interface Props {
  user: null | FirebaseAuthTypes.User;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  updateProfile: (name: string) => Promise<boolean>;
  currentUser: () => Promise<FirebaseAuthTypes.User | null>;
  signOut: () => Promise<boolean>;
}

// NOTE: Can add it to env file for better security.
const firebaseConfig = {
  apiKey: 'AIzaSyARHX3s_cwKv-TH1kgHCE7GKNOD62Je8HE',
  authDomain: 'interview-demo-fc1ed.firebaseapp.com',
  projectId: 'interview-demo-fc1ed',
  storageBucket: 'interview-demo-fc1ed.appspot.com',
  messagingSenderId: '619456801030',
  appId: '1:619456801030:web:792b024eaacb7798201687',
  measurementId: 'G-29EY1BTM57',
};

initializeApp(firebaseConfig);

const firebaseServices: Props = {
  user: null,
  signUp: async (displayName, email, password) => {
    return await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await auth().onAuthStateChanged(async function (user) {
          if (user) {
            await user.updateProfile({
              displayName,
            });
            dbServices.insertDB(displayName, email);
            firebaseServices.user = await auth().currentUser;
            dbServices.fetchDB();
            return true;
          } else {
            return false;
          }
        });
        console.log('User account created & signed in!');
        return true;
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('Signup Error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Signup Error', 'That email address is invalid!');
        }

        return false;
      });
  },
  signIn: async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      firebaseServices.user = await auth().currentUser;
      return true;
    } catch (error) {
      Alert.alert('SignIn Error', error.message);
      return false;
    }
  },
  updateProfile: async name => {
    try {
      await auth().currentUser.updateProfile({
        displayName: name,
      });
      firebaseServices.user = await auth().currentUser;
      return true;
    } catch (error) {
      Alert.alert('Update Profile', error.message);
      return false;
    }
  },
  currentUser: async () => {
    try {
      const user = await auth().currentUser;
      firebaseServices.user = user;
      return user;
    } catch (error) {
      Alert.alert('Current User Error', error.message);
      return null;
    }
  },
  signOut: async () => {
    try {
      await auth().signOut();
      firebaseServices.user = null;
      return true;
    } catch (error) {
      Alert.alert('SignOut Error', error.message);
      return false;
    }
  },
};

export default firebaseServices;
