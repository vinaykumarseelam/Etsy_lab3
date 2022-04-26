import React from "react";
import Product from "./Product";
import "./Dashboard.css";
import cookie from "react-cookies";

function Dashboard() {
  return (
    <div>
      <h1 className="title">
        {cookie.load("user")
          ? `Welcome to Etsy, ${cookie.load("user")}!`
          : "Explore one-of-a-kind finds from independent makers"}
      </h1>

      <div className="home__page">
        <div className="text__center">
          {/* <h1>Explore one-of-a-kind finds from independent makers</h1> */}
        </div>
        <div className="home">
          <img
            className="home__image"
            src="https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_300x300.2426681051_mocv.jpg"
            alt=""
          />

          <img
            className="home__image"
            src="https://i.etsystatic.com/10172112/r/il/b85c64/1172658536/il_300x300.1172658536_ep7c.jpg"
            alt=""
          />
          <img
            className="home__image"
            src="https://i.etsystatic.com/8928370/r/il/f32f25/3376320499/il_300x300.3376320499_7sqq.jpg"
            alt=""
          />
          <img
            className="home__image"
            src="https://i.etsystatic.com/5395361/r/il/5bb896/3641190222/il_300x300.3641190222_fydq.jpg"
            alt=""
          />
          <img
            className="home__image"
            src="https://i.etsystatic.com/7362571/r/il/ff7268/2993515527/il_300x300.2993515527_2pmh.jpg "
            alt=""
          />
        </div>
        <div className="home__row">
          <Product
            id="1231"
            title="Anniversery Gifts"
            price={11.96}
            rating={5}
            image="https://i.etsystatic.com/34679210/r/il/062e48/3807277857/il_340x270.3807277857_cnkq.jpg"
          />
          <Product
            id="1232"
            title="Personalised Gifts"
            price={15.96}
            rating={4}
            image="https://i.etsystatic.com/9985237/r/il/06e543/3701881300/il_340x270.3701881300_8r71.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="1233"
            title="Mordern Farm House"
            price={126.0}
            rating={5}
            image="https://i.etsystatic.com/10664644/c/1694/1347/304/1021/il/187135/2333975199/il_680x540.2333975199_lsxx.jpg"
          />
          <Product
            id="1234"
            title="Electic Decor"
            price={99.56}
            rating={1}
            image="https://i.etsystatic.com/10682957/r/il/a37c3f/2314688277/il_680x540.2314688277_k48l.jpg"
          />
          <Product
            id="1235"
            title="Kitchen Boutique"
            price={112.96}
            rating={2}
            image="https://i.etsystatic.com/15587988/c/2000/1589/0/358/il/16d482/2836223841/il_340x270.2836223841_c4b1.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="1236"
            title="Boho Decor"
            price={186.0}
            rating={5}
            image="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
