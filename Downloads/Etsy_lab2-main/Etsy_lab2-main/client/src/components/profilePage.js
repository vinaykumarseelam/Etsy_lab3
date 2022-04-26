import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
import ProfileDashboard from "./profileDashboard";
import { Navigate } from "react-router-dom";
import SearchFeature from "./Features/searchFeature";
import Axios from "axios";

function profilePage() {
  const user = useSelector(selectUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProds, setShowProds] = useState(false);
  const [limit, setLimit] = useState(3);
  const [Skip, setSkip] = useState(0);
  const [filters, setFilters] = useState("");
  const [products, setProducts] = useState([]);
  let redirectVar = null;

  if (!user) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }

  var viewItems = (variables) => {
    console.log(variables["searchTerm"] + "------------ getting viewItems");
    setShowProds(true);
    console.log("---------------in view Items-------------------");
    Axios.post(
      "http://54.82.11.107:4000/api/products/getAllProducts/" + user.id,
      {
        searchTerm: variables["searchTerm"],
      }
    ).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...products, ...response.data.result]);
          console.log(products);
        } else {
          setProducts(response.data.result);
        }
        console.log(user.id);
      } else {
        console.log("Failed in ");
      }
    });
  };

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log(newSearchTerm + ".........................");

    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
      searchTerm: searchTerm,
    };
    setSkip(0);
    viewItems(variables);
  };

  return (
    <div>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <ProfileDashboard />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10%",
          marginTop: "-3.5%",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>
    </div>
  );
}

export default profilePage;
