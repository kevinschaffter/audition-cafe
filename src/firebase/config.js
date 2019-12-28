import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCPGumztAqksjYDUybQc36F34qNsKgdwlg',
  authDomain: 'audition-cafe.firebaseapp.com',
  databaseURL: 'https://audition-cafe.firebaseio.com',
  projectId: 'audition-cafe',
  storageBucket: 'audition-cafe.appspot.com',
  messagingSenderId: '188511577499',
  appId: '1:188511577499:web:6b1edf257444a12c182d3e',
  measurementId: 'G-F9KVVT1WV8',
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();

export const { currentUser } = firebase.auth();

export const auth = firebase.auth();

export const storage = firebase.storage().ref();

export const googleAuth = () => firebase.auth().signInWithPopup(googleAuthProvider);
