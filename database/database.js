const firebase = require('firebase');
require('firebase/firestore');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAc3EavKu5bGD3tdBATcWa42TKjvpt5tWs",
  authDomain: "setsailsoftware.firebaseapp.com",
  databaseURL: "https://setsailsoftware.firebaseio.com",
  projectId: "setsailsoftware",
  storageBucket: "setsailsoftware.appspot.com",
  messagingSenderId: "33759728162"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

// Helper functions
const addItem = (/*userId, itemName, itemDeadline, itemCreated, response*/) => {
  db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

module.exports = {
  addItem
};