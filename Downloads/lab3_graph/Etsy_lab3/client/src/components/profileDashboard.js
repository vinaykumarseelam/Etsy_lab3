import React, { useState, useEffect } from "react";
import { PhotoCameraOutlined, EditOutlined } from "@material-ui/icons";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {
  favouritesList,
  getAllFavourites,
  updateFavourites,
} from "../features/productsSlice";
import { GET_FAVOUTITES } from "../GraphQL/Queries";
import { Navigate } from "react-router-dom";
import Favorite from "@mui/icons-material/Favorite";
import { useLazyQuery, useQuery } from "@apollo/client";

function profileDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [favProds, setFavProds] = useState([]);

  const [getFavourites, { loading, data }] = useLazyQuery(
    GET_FAVOUTITES(user.id)
  );

  useEffect(() => {
    getFavourites();
  }, []);

  const favouriteResponseHandler = (favourites) => {
    let response = [];
    favourites.map((fav) => {
      const { _id, userId, itemId } = fav;
      response.push({
        _id,
        userId: JSON.parse(userId),
        itemId: JSON.parse(itemId),
      });
    });
    return response;
  };

  useEffect(() => {
    if (data && data.getFavourites) {
      let favoutires = favouriteResponseHandler(data.getFavourites);
      setFavProds(favoutires);
      dispatch(favouritesList(favoutires));
    }
  }, [data]);

  const editProfile = () => {
    navigate("/updateProfile");
  };

  const deleteFavoutireHandler = (favId) => {
    Axios.delete(
      `${process.env.REACT_APP_ENDPOINT}/api/users/favourites/remove/${favId}`
    ).then((response) => {
      if (response.data.success === true) {
        window.location.href = "/profile";
      }
    });
  };

  const testFunction = () => {
    return <>Working</>;
  };

  let redirectVar = null;
  if (user === null || !cookie.load("user")) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <div>
      {redirectVar}
      {/* <h1>{favProdS}</h1> */}

      <div className="profile_dashboard">
        <img
          className="profile_image"
          src={user.profilePic}
          alt="profile pic"
        />

        <div className="profile_name">{cookie.load("user")}</div>
        <div className="edit_profileIcon">
          <span onClick={editProfile} className="edit_icon">
            <EditOutlined />
          </span>
        </div>

        <div className="profile_favourites">
          <h2 style={{ fontSize: "30px" }}>Favourites</h2>
          <div className="container-fluid mx-1">
            <div className="row mt-5 mx-1">
              <div className="col-md-9">
                <div className="row">
                  {" "}
                  {favProds && favProds.length === 0 && (
                    <div className="text-center py-3">
                      <p>No Favourites added</p>
                    </div>
                  )}
                  {favProds &&
                    favProds.map((fav) => {
                      const { itemId } = fav;
                      if (!itemId) return null;
                      return (
                        <div className="home_cards col-md-4 mb-4">
                          <div className="home_card card">
                            <div
                              style={{
                                backgroundColor: "white",
                                borderRadius: "50%",
                                padding: "5px",
                              }}
                              className="favourite_icon"
                              onClick={() => {
                                deleteFavoutireHandler(fav._id);
                              }}
                            >
                              <Favorite />
                            </div>
                            <img
                              src={itemId["itemImage"]}
                              className="card-img-top"
                              alt="..."
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {itemId["itemName"]}
                              </h5>
                              <h6>Price: ${itemId["itemPrice"]}</h6>
                              <p className="card-text">
                                {itemId["itemDescription"]}
                              </p>
                              {/* <button className="btn-sm btn-dark">Edit</button> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profileDashboard;
