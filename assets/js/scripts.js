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

    var database = firebase.database();


});//end of .ready function