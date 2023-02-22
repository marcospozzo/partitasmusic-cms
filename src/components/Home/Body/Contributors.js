import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import fetchApi from "../../../utils/fetchApi.js";
import { toast } from "react-toastify";

export default function Contributors() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchApi(`${process.env.REACT_APP_API_URL}api/get-contributors`)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching API. Try again...", {
          toastId: "error1",
        });
      });
  }, []);

  return (
    <div className="body">
      <div className="search-bar">
        <SearchBox filterText={filterText} onFilterTextChange={setFilterText} />
        <PlusButton />
      </div>
      <ContributorsList data={data} filterText={filterText} />
    </div>
  );
}

function SearchBox({ filterText, onFilterTextChange }) {
  return (
    <div className="input-box">
      <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      <input
        autoFocus
        value={filterText}
        placeholder="Search"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </div>
  );
}

function PlusButton() {
  return (
    <Link to={`/new-contributor`} className="input-box plus-button">
      <FontAwesomeIcon
        style={{ marginRight: "0" }}
        className="icon"
        icon={faPlus}
      />
    </Link>
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
