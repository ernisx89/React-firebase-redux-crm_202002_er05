const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//prints out calculated days less than 5 reservations in DB
//https://us-central1-crm-er05.cloudfunctions.net/getTimes
exports.getTimes = functions.https.onRequest((req, res) => {
  let reservations = [];

  return admin.database().ref('/mini-crm/reservations/').once('value', (snapshot) => {
    snapshot.forEach((item) => {

    var timeValue = item.val().time;
    var now = new Date()
    var datefromAPITimeStamp = (new Date(timeValue).getTime())
    var nowTimeStamp = now.getTime()
    var microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp );
    var daysDiff = Math.floor(microSecondsDiff/(1000 * 60 * 60  * 24))
    //condition if calculated less than 5 days
    if(daysDiff < 5) {
      //pushes calculated time values 
      reservations.push({
        id: item.key,
        customer: item.val().customer,
        time: daysDiff
      });
    }
    });   
    //prints out on endpoint
    res.send(reservations);
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
})

//test in console -> functions
exports.onReservationCheck = functions.database
.ref('/mini-crm/reservations/{reservationId}')
.onWrite((change, context) => {
  const now = Date.now()
  //console.log('now= ', now)
  const time = change.after.val().time
  let result = time - now
  console.log('Timestamp piece = ', result)
})