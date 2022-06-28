import React, { useEffect, useState } from "react";
import { add, curryN, length, multiply, prop, slice, sortBy } from "ramda";
import { delay, getTeams } from "../../API/getFakePlayersAndTeams";
import Pagination from "../components/pagination";
import TeamsList from "../components/teamsList";
import Error from "../components/error";
import Loading from "../components/loading";
import { encaseP, fork } from "fluture";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const SectionTitle = styled.h3`
  text-align: center;
  margin-top: 50px;
  box-sizing: border-box;
`;

const SectionState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Teams = () => {
  const [teamsList, setTeamsList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const sortByTeamName = sortBy(prop("teamName"));

  const fetchTeams = () => {
    setLoading(true);
    setError(false);
    encaseP(delay)()
      |> fork(() => {
        setError(true);
        setLoading(false);
      })(() => {
        const curriedGetTeams = getTeams |> curryN(2);
        const fn = curriedGetTeams(11);
        encaseP(fn)(200)
          |> fork((rej) => {
            setError(true);
            setLoading(false);
          })((res) => {
            setTeamsList(sortByTeamName(res));
            setLoading(false);
          });
      });
  };

  useEffect(() => fetchTeams(), [setTeamsList]);

  const currentDataCount = () => {
    const firstPageIndex = multiply(currentPage - 1, itemsPerPage);
    const lastPageIndex = add(firstPageIndex, itemsPerPage);
    return teamsList |> slice(firstPageIndex, lastPageIndex);
  };

  const currentData = currentDataCount();

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Section>
        <SectionTitle>Teams list</SectionTitle>
        <div>
          {!loading && !error && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={length(teamsList)}
              paginate={handlePaginate}
              currentPage={currentPage}
              adjacentPages={3}
            />
          )}
          {error && (
            <SectionState>
              <Error onClick={() => fetchTeams()} />
            </SectionState>
          )}
          {loading ? (
            <SectionState>
              <Loading />
            </SectionState>
          ) : (
            !error && <TeamsList list={currentData} />
          )}
        </div>
      </Section>
    </div>
  );
};

export default Teams;
