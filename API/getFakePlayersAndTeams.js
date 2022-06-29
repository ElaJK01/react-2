import { multiply, lt, range, map } from "ramda";
import {
  addSurnameAndDescription,
  oneRandomName,
  zipPlayerWithScore,
} from "./fakePlayersFunctions";
import { teamFakeNameGenerator } from "./teamFakeNameGenerator";
import { teamFakeDescription } from "./teamFakeDescription";

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

export const getTeams = async (numberOfPlayers, numberOfTeams) => {
  try {
    const players = await Promise.all(
      range(0, numberOfTeams)
        |> map(async () => await getPlayers(numberOfPlayers))
    );

    return players |> map(addTeamName);
  } catch {
    console.error("no teams");
  }
};
