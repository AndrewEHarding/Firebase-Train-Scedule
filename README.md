# Firebase-Train-Scedule
[Live Site](https://andreweharding.github.io/Firebase-Train-Schedule/)

My train schedule tool, integrated with Firebase and coded in JavaScript.

When submitting a new train to the schedule, the submit function will trigger the following:

1. Trim all submission values
2. Check for any empty values
3. Check if the entered time is in 24 hour format
4. Push verified submission to the database
5. Empty the input form

Any new child added to the database triggers another function:

1. Calculates next train arrival and minutes to arrival with Moment.js
2. Creates new row elements
3. Appends the train information to the elements
4. Appends the row to the table

The page must be refreshed to keep "Next Arrival" and "Minutes Away" values up to date. The submission form also includes a clear function.
