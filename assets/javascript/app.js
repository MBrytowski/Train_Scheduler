//Initialize firebase
var config = {
    apiKey: "AIzaSyD7l9EnnFOaMFk5Uml0CLR2Qlh6A0zGR9U",
    authDomain: "train-scheduler-c2327.firebaseapp.com",
    databaseURL: "https://train-scheduler-c2327.firebaseio.com",
    projectId: "train-scheduler-c2327",
    storageBucket: "train-scheduler-c2327.appspot.com",
    messagingSenderId: "408300338786"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
    var trainName = "";
    var destination = "";
    var inputTime = 0;
    var frequency = 0;

    //click event to add new train
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();


        trainName = $("#train-name").val().trim();
        console.log(trainName);
        destination = $("#destination").val().trim();
        console.log(destination);
        inputTime = $("#first-time").val().trim();
        console.log(inputTime);
        frequency = $("#frequency").val().trim();
        console.log(frequency);
        //Stores new train info

        database.ref().push({
            name: trainName,
            destination: destination,
            frequency: frequency,
            time: inputTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        //Clears input boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-time").val("");
        $("#frequency").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var inputTime = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;
        console.log(frequency)

        //Logic for 2 time columns
        //First train = inputTime
        //Frequency is how often the train passes the stop
        //Use current time to determine how many minutes away
        // var a = moment([2007, 0, 29]);
        // var b = moment([2007, 0, 28]);
        // a.diff(b, 'days')
        var currentTime = moment();
        console.log(moment(currentTime).format("HH:mm"));
        var timeArr = inputTime.split(":");
        var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
        console.log("trainTime", trainTime);
        var diffTime = moment().diff(trainTime, "minutes");
        console.log("Difftime", diffTime)
        var tRemainder = diffTime % frequency;
        var minutesAway = frequency - tRemainder;
        var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
        console.log(minutesAway);

        //Creates new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway)
        );

        //Appends new row
        $("#train-table > tbody").append(newRow);
    })
})