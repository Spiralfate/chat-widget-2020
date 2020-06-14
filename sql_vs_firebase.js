/*
{
  "users": {
    "1": {
      "name": "Peter",
      "email": "peter@mail.com",
      "age": "40",
      "location": "Moscow",
      "age_location": "40_Moscow"
    },
    "9": {
      "name": "Dean",
      "email": "dean@aol.com",
      "age": "30",
      "location": "NewYork",
      "age_location": "30_NewYork"
    }
  },
  "events": {
    "fm": {
      "name": "Firebase Meetup",
      "date": 983275235320
    }
  },
  "eventAttendees": {
    "fm": {
      "1": "Peter",
      "9": "Dean"
    }
  }
}
*/

const rootRef = firebase.database().ref();

// 1. Select a user by UID
const oneRef = rootRef.child('users').child('1');
// 2. Find a user by email
const twoRef = rootRef.child('users').orderByChild('email').equalTo('dmitry@aol.com');
// 3. Limit to 10 users
const threeRef = rootRef.child('users').limitToFirst(10);
// 4. Get all users names start with 'd'
const fourRef = rootRef.child('users').orderByChild('name').startAt('D').endAt('D\uf8ff');
// 5. Get all users ages who are less than 50
const fiveRef = rootRef.child('users').orderByChild('age').endAt(49);
// 6. Get all users who are greater than 50
const sixRef = rootRef.child('users').orderByChild('age').startAt(51);
// 7. Get all users who are between 20 and 100
const sevenRef = rootRef.child('users').orderByChild('age').startAt(20).endAt(100);
// 8. Get all users who are 40 and live in Moscow
const eightRef = rootRef.child('users').orderByChild('age_location').equalTo('40_Moscow');

// -------- Firebase requests like SQL JOINS
const rootRef = firebase.database().ref();
const attendees = db.child('eventAttendees/fm');
