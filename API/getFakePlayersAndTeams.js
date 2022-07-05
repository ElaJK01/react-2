import { multiply, lt, range, map } from "ramda";
import {
  addSurnameAndDescription,
  oneRandomName,
  zipPlayerWithScore,
} from "./fakePlayersFunctions";
import { teamFakeNameGenerator } from "./teamFakeNameGenerator";
import { teamFakeDescription } from "./teamFakeDescription";
import {
  encase,
  chain,
  resolve,
  isFuture,
  node,
  done,
  attempt,
  fork,
} from "fluture";

const shouldThrowError = () => lt(Math.floor(multiply(Math.random(), 2)), 1);

export const delay = () =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (shouldThrowError() ? reject("network error") : resolve()),
      Math.floor(Math.random() * 2000) + 1000
    )
  );

export const getPlayers = (numberOfPlayers) =>
  range(0, numberOfPlayers)
  |> map(oneRandomName)
  |> map(zipPlayerWithScore)
  |> map(addSurnameAndDescription);

const addTeamName = (el) => ({
  teamName: teamFakeNameGenerator(),
  teamPlayers: el,
  description: teamFakeDescription(),
});

export const getTeams = (numberOfPlayers, numberOfTeams) =>
  attempt(
    () =>
      range(0, numberOfTeams)
      |> map(() => getPlayers(numberOfPlayers))
      |> map(addTeamName)
  );
