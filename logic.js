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
        console.log(name)
        console.log(dest)
        console.log(depart)
        console.log(freq)

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
        var nameSnap = snap.name;
        var destSnap = snap.destination;
        var departSnap = snap.firstDepart;
        var freqSnap = snap.frequency;

        $('#train-show').append('<tr> <td>' + nameSnap + '</td> <td>' + destSnap + '</td> <td>' + departSnap + '</td> <td>' + freqSnap + '</td> <td>' + '</td> <td>' + '</td> </tr>')
    })
})

