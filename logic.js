$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyB6ys_qq8kdt-Dx4jGkWLDtjPAyS50_u24",
        authDomain: "train-schedule-5de9a.firebaseio.com/",
        databaseURL: "https://train-schedule-5de9a.firebaseio.com/",
        projectId: "train-schedule-5de9a",
        storageBucket: "gs://train-schedule-5de9a.appspot.com/",
        messengerSenderId: "223125465367"

    };


    // Initialize Firebase
    firebase.initializeApp(config);
    var database = firebase.database();

    $('#submit-btn').on('click', function (event) {
        event.preventDefault();
        var name = $('#train-name').val().trim();
        var dest = $('#dest').val().trim();
        var depart = $('#first-depart').val().trim();
        var freq = $('#freq').val().trim();
        // console.log(name)
        // console.log(dest)
        // console.log(depart)
        // console.log(freq)

        database.ref().push({
            name: name,
            destination: dest,
            firstDepart: depart,
            frequency: freq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })


    })

    database.ref().on('child_added', function (childSnapshot) {
        var snap = childSnapshot.val();
        var added = snap.dateAdded;
        // console.log(added);

        var nameSnap = snap.name;
        var destSnap = snap.destination;
        var departSnap = snap.firstDepart;
        var freqSnap = snap.frequency;
        // console.log(departSnap);
        //This will be the firstDeparture time as a moment
        var startTime = moment(departSnap, 'HH:mm');
        // If we grab the minute and hour, we can convert it into a time to subtract the current time from
        var startMinute = startTime.minute();
        var startHour = startTime.hour();
        // console.log(startHour);
        // console.log(startTime);
        var today = moment();
        // console.log(today);
        var nowHour = today.hour();
        // console.log(nowHour);
        var nowMinute = today.minute();
        var next = (nowHour * 60 + nowMinute) + (freqSnap - (((nowHour * 60 + nowMinute) - (startHour * 60 + startMinute)) % freqSnap));
        var nextMinute = next % 60;
        var nextHour = (next - nextMinute) / 60;
        // console.log(nextMinute);
        // console.log(nextHour);
        var nextTrain = nextHour.toString() + ':' + nextMinute
        // console.log(nextTrain);



        console.log(next);

        $('#train-show').append('<tr> <td>' + nameSnap + '</td> <td>' + destSnap + '</td> <td>' + departSnap + '</td> <td>' + freqSnap + '</td> <td>' + nextTrain + '</td> <td>' + '</td> </tr>')
    })
    //This will reload the page every minute so that the time will update!
    setTimeout(function () {
        location.reload();
    }, 60000);
})




