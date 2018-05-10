import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCfTu2WShyL877ULoz22B_JlLuOIDyqgBk",
  authDomain: "dailydiet-app.firebaseapp.com",
  databaseURL: "https://dailydiet-app.firebaseio.com",
  projectId: "dailydiet-app",
  storageBucket: "dailydiet-app.appspot.com",
  messagingSenderId: "256948720385"
}

firebase.initializeApp(config)

const db = firebase.database()

export default db