import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import fetchApi from "./fetchApi.js";

export default function Contributors() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchApi("http://localhost:3001/api/get-contributors")
      .then((data) => {
        // console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.error("error fetching api...");
        console.error(err.message);
      });
  }, []);

  return (
    <div className="body">
      <div className="search-bar">
        <SearchBox filterText={filterText} onFilterTextChange={setFilterText} />
        <button className="search-box">+</button>
      </div>
      <ContributorsList data={data} filterText={filterText} />
    </div>
  );
}

function SearchBox({ filterText, onFilterTextChange }) {
  return (
    <div className="search-box">
      <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      <input
        autoFocus
        value={filterText}
        className="input-search"
        placeholder="Search"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </div>
  );
}

function ContributorsList({ data, filterText }) {
  const list = [];

  data.forEach((contributor) => {
    if (
      contributor.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    ) {
      return;
    } else {
      list.push(
        <ContributorCard
          key={contributor._id}
          name={contributor.name}
          path={contributor.path}
        />
      );
    }
  });

  return <div className="contributors-list">{list}</div>;
}

function ContributorCard({ name, path }) {
  return (
    <Link to={`/contributors/${path}`} className="contributor-card">
      {name}
    </Link>
  );
}
