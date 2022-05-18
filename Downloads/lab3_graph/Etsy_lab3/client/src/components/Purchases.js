import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFinalCart } from "../features/cartItemsSlice";
import { selectUser } from "../features/userSlice";
import { gql, useQuery } from "@apollo/client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import cookie from "react-cookies";
import Pagination from "./Pagination";
import { GET_PURCHASED_ITEMS } from "../GraphQL/Queries";

function Purchases() {
  const user = useSelector(selectUser);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { data } = useQuery(GET_PURCHASED_ITEMS(user.id));

  useEffect(() => {
    if (data) {
      if (data.getPurchasedItems) {
        setPurchasedProducts(data.getPurchasedItems);
      }
    }
  }, [data]);
  //Get current posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPurchasedItems = purchasedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  let renderPurchases = null;

  if (purchasedProducts.length === 0) {
    renderPurchases = () => {
      return <div>No Purchases till now...</div>;
    };
  } else {
  }

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="purchases_header">
        <h2 style={{ marginLeft: "110px" }}>Purchases Page</h2>
        <div style={{ width: "20%" }}>
          <label htmlFor="itemsPerPage" style={{ marginRight: "10px" }}>
            Items per page
          </label>
          <select
            style={{ width: "25%", height: "30px", marginTop: "5px" }}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
            }}
            id="itemsPerPage"
          >
            <option></option>
            <option value="2"> 2 </option>
            <option value="5" selected>
              5
            </option>
            <option value="10"> 10 </option>
          </select>
        </div>
      </div>
      <div className="profile_favourites">
        <div className="container-fluid mx-1">
          <div className="row mt-5 mx-1">
            <div className="col-md-9">
              <div className="row">
                {purchasedProducts &&
                  purchasedProducts.map((pro) => {
                    return (
                      <div className="home_cards mb-4">
                        <div className="home_card card">
                          <div
                            className="purchase_item_header"
                            style={{ backgroundColor: "rgb(243, 234, 223)" }}
                          >
                            <p className="purchase_item_price">
                              Item Price ${pro.itemPrice}
                            </p>
                            <p className="purchase_item_price">
                              Ship To {cookie.load("user")}
                            </p>
                            <p
                              style={{ width: "40%" }}
                              className="purchase_item_price"
                            >
                              Order Id #{pro._id}
                            </p>
                            <p
                              style={{ width: "30%" }}
                              className="purchase_item_price"
                            >
                              {/* Order Date: {pro.createdAt} */}
                              {/* {pro.createdAt.split("T")[0]} */}
                            </p>
                            <p
                              style={{ width: "30%" }}
                              className="purchase_item_price"
                            >
                              {/* Order Time: {pro.createdAt} */}
                              {/* {pro.createdAt.substr(11, 5)} */}
                            </p>
                          </div>

                          <hr style={{ marginTop: "-2px" }}></hr>
                          <div className="item">
                            <img
                              src={pro.itemImage}
                              className="card-img-left"
                              alt="..."
                            />

                            <div
                              style={{ marginLeft: "10px" }}
                              className="item-details"
                            >
                              <h5 className="card-title">{pro.itemName}</h5>

                              <p className="card-text">{pro.itemDescription}</p>
                              <p className="card-text">Quantity: {pro.qty}</p>

                              {pro.giftMessage !== "" ? (
                                <p className="card-text">
                                  Gift Message: {pro.giftMessage}
                                </p>
                              ) : (
                                <p className="card-text"></p>
                              )}

                              {/* <button className="btn-sm btn-dark">Edit</button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={purchasedProducts.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Purchases;
