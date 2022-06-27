import React, { useEffect, useState } from "react";
import { curryN, length, prop, slice, sortBy } from "ramda";
import { delay, getTeams } from "../../API/getFakePlayersAndTeams";
import Pagination from "../components/pagination";
import TeamsList from "../components/teamsList";
import Error from "../components/error";
import Loading from "../components/loading";
import { encase, encaseP, fork, pipe } from "fluture";

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
        const curriedGetTeams = curryN(2, getTeams);
        const fn = curriedGetTeams(20);
        encaseP(fn)(20)
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
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return slice(firstPageIndex, lastPageIndex, teamsList);
  };

  const currentData = currentDataCount();

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <section className="section">
        <h3 className="section__title">Teams list</h3>
        <div className="section__content">
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Error onClick={() => fetchTeams()} />
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
            !error && <TeamsList list={currentData} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Teams;
