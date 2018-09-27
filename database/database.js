const firebase = require('firebase');
require('firebase/firestore');
const key = require('./apiKey.js');

// Initialize Firebase
var config = {
  apiKey: key,
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
const addItem = (userId, itemName, itemDeadline, itemCreated, response) => {
  db.collection("items").add({
    user_id: userId,
    item_name: itemName,
    item_deadline: itemDeadline,
    item_created: itemCreated
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        response.send(docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        response.send('addItem failed')
    });
}

module.exports = {
  addItem
};