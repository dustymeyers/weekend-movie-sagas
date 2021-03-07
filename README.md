# Dusty's Movie List App

## Description

_Duration: Weekend Solo Project_

I was presented with a partially built app, that stored movie details in a database. The only feature that worked from the start was a GET request to the database that would return movie posters and their respective titles. It was my job to complete the app by adding a feature that would allow the user to revert to a movie details view when they click on a movie poster from the home page. This details view shows the title, poster, genres, and a description for the respective movie. If the page is refreshed, the details will stay on the page.

The second feature I was tasked to implement was a form submission to add a movie to the database, which would then be rendered on teh home page. This feature has it's own stand alone view and should take in text for a title, an image url (movie poster), a description, and a drop down selector for a genre. On submission, Sweet Alert is used to notify the user that they successfully added a movie before routing them back to the home page.

I added an additional feature to app to allow for movie details editing. In the details view of a selected movie, the user will notice an edit button down at the bottom of the page. When they click on this button, they are moved to a new form view that is pre-filled out with the relevant movie data in each respective input field. The user can then edit the movie details to their preferences, again using Sweet Alert to let the user know if the submission was successful. After update is successful, the user is routed back to the description page where they can see their newly updated movie details.

## Screen Shot

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Postico](https://eggerapps.at/postico/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

1. Create a database named `saga_movies_weekend`.
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. This project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
3. Open up your editor of choice and run `npm install` in your terminal. 
4. Run `npm run server` in your terminal.
5. Run `npm run client` in your terminal, which will open a new browser tab for you.

## Usage

_The user is an avid movie watcher, and wants to use the app to keep track of their favorites._

1. The user just watched an amazing new movie and wants to add it to their list.
2. They hop on to _Dusty's Movie List App_ and are immediately greeted by a full list of movies that they've already watched.
3. An "Add a Movie" button is also rendered at the top of the page, they click on the button to get started adding the new movie.
4. The user inputs the movie's title, an image address to the movie poster, they select a genre they think best fits, and then they add the description. 
5. As they hit the submission button, they realize they put the wrong image address. Luckily a nice alert makes sure the user is actually ready to send before confirming.
6. The user cancels the alert and is allowed to edit their submission before hitting send again.
7. This time everything is right! After getting a success message, the user is navigated back to the list page where they can view their newly added movie.
8. There's a movie listed on the app that they can't seem to remember, so they click click on the movie image.
9. After clicking the movie image, the user is brought to the details page of the movie they clicked on.
10. All the movie details are rendered including a description. No wonder they didn't know what the movie was! It had the wrong title.
11. The user clicks the "Edit" button at the bottom of the page and are brought to a form view pre-filled with all of the previous details data.
12. The user updates the title of the movie and clicks "save".
13. Once the submission successfully sends, the user is greeted with a similar success message and routed back to the details page for that movie.

## Built With

This application is built with HTML, CSS, Javascript, Axios, React, Redux, Express, Material-UI, Sagas, SweetAlert and PostgreSQL.

## Acknowledgement

Thanks to Prime Digital Academy who equipped and helped me to make this application a reality. Thanks to the members of my cohort to bounce ideas off of and assist.