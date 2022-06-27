import React, { useEffect, useState } from "react";
import { prop, sortBy, length, slice, andThen, pipe, otherwise } from "ramda";
import { delay, getPlayers } from "../../API/getFakePlayersAndTeams";
import Pagination from "../components/pagination";
import PersonsList from "../components/personsList";
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

const Players = () => {
  const [playersList, setPlayersList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const sortBySurname = sortBy(prop("surname"));
  const sortByName = sortBy(prop("name"));

  const fetchPlayers = () => {
    setLoading(true);
    setError(false);
    encaseP(delay)()
      |> fork(() => {
        setError(true);
        setLoading(false);
      })(() => {
        encaseP(getPlayers)(2000)
          |> fork((rej) => {
            setError(true);
            setLoading(false);
          })((res) => {
            setPlayersList(sortBySurname(sortByName(res)));
            setLoading(false);
          });
      });
  };

  useEffect(() => {
    fetchPlayers();
  }, [setPlayersList]);

  const currentDataCount = () => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return slice(firstPageIndex, lastPageIndex, playersList);
  };

  const currentData = currentDataCount();

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Section>
        <SectionTitle>Players list</SectionTitle>
        <div>
          {!loading && !error && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={length(playersList)}
              paginate={handlePaginate}
              currentPage={currentPage}
              adjacentPages={3}
            />
          )}
          {error && (
            <SectionState>
              <Error onClick={() => fetchPlayers()} />
            </SectionState>
          )}
          {loading ? (
            <SectionState>
              <Loading />
            </SectionState>
          ) : (
            !error && <PersonsList list={currentData} />
          )}
        </div>
      </Section>
    </div>
  );
};

export default Players;
