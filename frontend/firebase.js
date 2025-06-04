import { initializeApp, getApps } from '@firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: '???',
  authDomain: '???,
  projectId: '???',
  storageBucket: '???',
  messagingSenderId: '???',
  appId: '???',
  measurementId: '???',
};

// Initialise (or reuse) the app
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialise Auth **with** persistence
const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, firebaseAuth };
