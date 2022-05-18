import React, { useState } from "react";

function searchFeature(props) {
  const [searchTerms, setSearchTerms] = useState();

  const onChangeSearchEvent = (e) => {
    setSearchTerms(e.target.value);
    props.refreshFunction(e.target.value);
  };

  return (
    <div className="d-flex align-items-center">
      <label className="me-3">Search: </label>
      <input
        type="text"
        className="form-control"
        value={searchTerms}
        onChange={onChangeSearchEvent}
        placeholder="Search by typing.."
      />
    </div>
  );
}

export default searchFeature;
