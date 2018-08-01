$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDFgBWGDyvkawLynJrHd31vJduEquiWkrM",
        authDomain: "fir-train-schedule-8cb67.firebaseapp.com",
        databaseURL: "https://fir-train-schedule-8cb67.firebaseio.com",
        projectId: "fir-train-schedule-8cb67",
        storageBucket: "",
        messagingSenderId: "63408800098"
    };
    firebase.initializeApp(config);

    //Global vars
    var database = firebase.database();
    var name = "";
    var destination = "";
    var time = 0;
    var frequency = 0;

    // =====SET CURRENT TIME DISPLAY=====
    function timeDisplay() {
        setInterval(function () {
            // This was mainly to make sure that moment.js was working
            $("#current-time-span").text(moment().format("h:mm:ss a"));
        }, 1000);
    }
    timeDisplay();


    // =====SUBMIT FUNCTION=====
    $("#submit").on("click", function (event) {
        event.preventDefault();
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        time = $("#time").val().trim();
        frequency = $("#frequency").val().trim();
        //Log submissions
        console.log(name + "\n" + destination + "\n" + time + "\n" + frequency);
        //Prevent blank submissions
        if (!name || !destination || !time || !frequency) {
            alert("All fields are required.");
        }
        else if (time.length != 4) {
            alert("First Arrival Time must be in 24 hour format.\nExample: 1330 (for 1:30 pm)");
        }
        else {
            database.ref().push({
                name: name,
                destination: destination,
                time: time,
                frequency: frequency
            });
            //Empty fields
            $("#name").val("");
            $("#destination").val("");
            $("#time").val("");
            $("#frequency").val("");
        }
    });

    // =====CLEAR FUNCTION=====
    $("#clear").on("click", function () {
        //Empty fields
        $("#name").val("");
        $("#destination").val("");
        $("#time").val("");
        $("#frequency").val("");
    });

    //=====CHILD ADDED FUNCTION=====
    database.ref().on("child_added", function (snapshot) {
        // Calculate Next Arrivals and Minutes Away times
        // Keep first time from coming after actual current time by subtracting a year
        var time = moment(snapshot.val().time, "hh:mm").subtract(1, "years");
        var timeDifference = moment().diff(moment(time), "minutes");
        var ramainder = timeDifference % parseInt(snapshot.val().frequency);
        var minutesAway = parseInt(snapshot.val().frequency) - ramainder;
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
        //Make table elements
        var row = $("<tr>");
        var addName = $("<td>");
        var addDestination = $("<td>");
        var addFrequency = $("<td>");
        var addArrival = $("<td>");
        var addMinAway = $("<td>");
        //Fill <td>
        addName.html(snapshot.val().name);
        addDestination.html(snapshot.val().destination);
        addFrequency.html(snapshot.val().frequency);
        addArrival.html(nextArrival);
        addMinAway.html(minutesAway);
        //Fill <tr>
        row.append(addName, addDestination, addFrequency, addArrival, addMinAway);
        //Fill <tbody>
        $("tbody").append(row);
    });


});//end of .ready function