const firebase = require('firebase');
require('firebase/firestore');
const key = require('./apiKey.js');

// Initialize Firebase
var config = {
  apiKey: key,
  authDomain: 'setsailsoftware.firebaseapp.com',
  databaseURL: 'https://setsailsoftware.firebaseio.com',
  projectId: 'setsailsoftware',
  storageBucket: 'setsailsoftware.appspot.com',
  messagingSenderId: '33759728162'
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
  db.collection('items').add({
    user_id: userId,
    item_name: itemName,
    item_deadline: itemDeadline,
    item_created: itemCreated
    })
    .then(function(docRef) {
      response.send(docRef.id);
    })
    .catch(function(error) {
      console.log('Error adding document: ', error)
      response.status(500).send('Error adding document');
    });
}

const getItem = (itemId, response) => {
  db.collection('items').doc(itemId).get()
    .then((doc) => {
      if (doc.exists) {
        response.send(doc.data());
      } else {
        response.status(404).send('No such document');
      }
    });
}

const changeDeadline = (itemId, newDeadline, response) => {
  db.collection('items').doc(itemId).update({item_deadline: newDeadline})
    .then(() => {
      getItem(itemId, response);
    })
    .catch((error) => {
      console.log('Error updating document: ', error);
      response.status(500).send('Error updating document');
    });
}

const removeItem = (itemId, response) => {
  db.collection('items').doc(itemId).delete()
    .then(() => {
      console.log('Document deleted successfully');
      response.send('Document deleted successfully');
    })
    .catch((error) => {
      console.log('Error deleting document: ', error);
      response.status(500).send('Error deleting document');
    })
}

const listItems = (userId, response) => {
  db.collection('items').where('user_id', '==', userId).get()
    .then((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => result.push(doc.data()));
      response.send(result);
    })
    .catch((error) => {
      console.log('Error listing documents: ', error);
      response.status(500).send('Error listing documents');
    })
}

module.exports = {
  addItem,
  getItem,
  changeDeadline,
  removeItem,
  listItems
};