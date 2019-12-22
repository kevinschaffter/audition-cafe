import * as firebase from 'firebase';

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
