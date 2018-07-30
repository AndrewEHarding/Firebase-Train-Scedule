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
    var currentTime;

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

    //=====CHILD ADDED FUNCTION=====
    database.ref().on("child_added", function(snapshot){
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
        addArrival.html("0w0");
        addMinAway.html("0w0");
        //Fill <tr>
        row.append(addName, addDestination, addFrequency, addArrival, addMinAway);
        //Fill <tbody>
        $("tbody").append(row);
    });


});//end of .ready function