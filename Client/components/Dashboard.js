import React from "react";
import cookie from "react-cookies";

function Dashboard() {
  return (
    <div>
      <div className="dash_board">
        <h1 className="title">
          {cookie.load("user")
            ? `Welcome to Etsy, ${cookie.load("user")}!`
            : "Explore one-of-a-kind finds from independent makers"}
        </h1>
        <div className="dashboard_items">
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://i.etsystatic.com/10172112/r/il/b85c64/1172658536/il_300x300.1172658536_ep7c.jpg"
              alt="home"
            ></img>
            <h3 style={{ marginTop: "10px", fontSize: "20px" }}>
              Outdoor Furniture
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://i.etsystatic.com/17162579/r/il/a74027/3289331136/il_300x300.3289331136_o5wr.jpg"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "-10%",
              }}
            >
              Unique Decore
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://i.etsystatic.com/18454161/r/il/86bba1/2741516539/il_300x300.2741516539_ee6d.jpg"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "-10%",
              }}
            >
              Wedding
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/3981763/pexels-photo-3981763.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{ marginTop: "10px", fontSize: "20px", marginLeft: "1%" }}
            >
              Accessories
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "-10%",
              }}
            >
              Wedding Decor
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "15%",
              }}
            >
              Gadgets
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
