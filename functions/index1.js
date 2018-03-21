var admin = require("firebase-admin");
const firebase = require('firebase');

var serviceAccount = require("./config/firebase/socialytics-dev.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialytics-a0a84.firebaseio.com"
});

var sentiment = require('sentiment');

admin.database().ref('/sentences').on("child_added",function(snapshot, prevChildKey) {
  var newPost = snapshot.val();

  if(!newPost.sentiments && newPost.entity){
    var r1 = sentiment(newPost.text);
    const newData = {
      text : newPost.text,
      sentiment : r1,
      created: firebase.database.ServerValue.TIMESTAMP
    };
    admin.database().ref('/entities/'+newPost.entity).push(newData);
    admin.database().ref('/sentences/'+snapshot.key).remove();
    
  } 
});


function randomSentence(){
  var randomWords = require('random-words');
  var sentence = randomWords({min: 8, max: 12}).join(" ");
  const data = {
    text: sentence,
    entity: "Imran Khan"
  };

  admin.database().ref('sentences').push(data);

  setTimeout(() => {
    randomSentence();
  }, 5000);
}

//randomSentence();