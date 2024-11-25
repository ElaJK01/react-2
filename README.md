
# React 2 - Gardening Teams App

This project is a React-based application developed as part of a frontend training program aimed at deepening knowledge and skills in building React applications. The primary focus was to explore and effectively use the following libraries:

* **Ramda.js** – A functional programming library that simplifies data manipulation with a rich set of utilities for handling arrays, objects, and functions.
* **Fluture** – A functional library for working with asynchronous computations, providing a robust and declarative approach to handling promises and side effects.
* **Styled-Components** – A CSS-in-JS library that enables writing encapsulated, maintainable, and dynamic styles directly within JavaScript components.

## How tu run application:
* Clone this repository by using `git clone` command in your terminal.
* In app folder in terminal use `yarn install`.
* In terminal use `yarn dev`.

***TECHNICAL REQUIREMENTS***
* take advantage of Fluture **wherever possible**,
* loading and error states should be handled via Fluture,
* a minimal amount of .css files - use styled-components instead,
* application takes advantage of pipeline operator **wherever possible**,
* components and logic aim to be reusable,
* Ramda must be utilized wherever possible,
* fake "backend" for this project should generate players and teams with information about them - name, surname, description  for players; team name, list of player names, description for teams:
  * there should be 1-3 second delay when requesting players/teams, ***per request, not per team/player***,
  * there should be a 20% chance to get an error, ***per request, not per team/player***,
  * loading state and error state must be handled appropriately,
  * use a short predefined list to generate from,
* upper navbar contain two links - to a list of players and to a list of teams,
* application contain routing to accomodate this,
* application fetch 2000 players/teams,
* left navbar is a pagination component, used to navigate the whole list of players/teams, 20 per page for players, 10 per page for teams,
* clicking on "details" button should show a modal window with a bigger version of the card that fit all the details that may be cut off in small-format cards,
* player list should be sorted by player name and surname,
* team list should be sorted by team name.
