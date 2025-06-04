import { initializeApp, getApps } from '@firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBeFmbuUy_yITn8wUqXNWzC1SjTbAeHv3U',
  authDomain: 'langfordlog.firebaseapp.com',
  projectId: 'langfordlog',
  storageBucket: 'langfordlog.appspot.com',
  messagingSenderId: '314671122997',
  appId: '1:314671122997:web:e3cd05c2b83ee95ad3bf7c',
  measurementId: 'G-6VFCXLYBR1',
};

// Initialise (or reuse) the app
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialise Auth **with** persistence
const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, firebaseAuth };
