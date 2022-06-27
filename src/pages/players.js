import React, { useEffect, useState } from "react";
import { prop, sortBy, length, slice, andThen, pipe, otherwise } from "ramda";
import { delay, getPlayers } from "../../API/getFakePlayersAndTeams";
import Pagination from "../components/pagination";
import PersonsList from "../components/personsList";
import Error from "../components/error";
import Loading from "../components/loading";
import { encaseP, fork } from "fluture";

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
      <section className="section">
        <h3 className="section__title">Players list</h3>
        <div className="section__content">
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Error onClick={() => fetchPlayers()} />
            </div>
          )}
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Loading />
            </div>
          ) : (
            !error && <PersonsList list={currentData} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Players;
