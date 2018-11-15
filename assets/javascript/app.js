$(document).ready(function () {
    //Initialize firebase
    var config = {
        apiKey: "AIzaSyD7l9EnnFOaMFk5Uml0CLR2Qlh6A0zGR9U",
        authDomain: "train-scheduler-c2327.firebaseapp.com",
        databaseURL: "https://train-scheduler-c2327.firebaseio.com",
        projectId: "train-scheduler-c2327",
        storageBucket: "",
        messagingSenderId: "408300338786"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      //click event to add new train
      $(".submitBtn").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        //these variables need to be in moment.js
        var inputTime = $("#first-time").val().trim();
        var frequency = $("#frequency").val().trim();
        //Stores new train info
        var newTrain = {
            name: trainName,
            destination: destination,
            frequency: frequency,
            time: inputTime
        };

        database.ref().push(newTrain);
        //Clears input boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-time").val("");
        $("#frequency").val("");
      });

      database.ref().on("child_added", function (snap) {
          var trainName = snap.val().name;
          var destination = snap.val().destination;
          var inputTime = snap.val().time;
          var frequency = snap.val().frequency;

          var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway)
          );

          $("#train-table > tbody").append(newRow);
      })
})