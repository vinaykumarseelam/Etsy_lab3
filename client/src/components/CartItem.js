import "./CartItem.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFinalCart,
  createCartItem,
  removeCartItem,
  getCartItems,
} from "../features/cartItemsSlice";
import { Delete } from "@material-ui/icons";
import Axios from "axios";
import { selectUser } from "../features/userSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  console.log(item);
  const [giftOption, setGiftOption] = useState(false);
  const [giftDescription, setGiftDescription] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!item.itemId) return null;
    dispatch(
      createCartItem({
        userId: item.userId,
        itemId: item.itemId._id,
        itemName: item.itemId.itemName,
        itemPrice: item.itemId.itemPrice,
        itemImage: item.itemId.itemImage,
        itemDescription: item.itemId.itemDescription,
        qty: item.qty,
        itemCount: item.itemId.itemCount,
        giftMessage: "",
      })
    );
  }, []);

  const qtyChangeHandler = (id, qty) => {
    console.log(qty);
    console.log("item updation qty in axios");

    Axios.post("http://localhost:4000/api/products/addToCart", {
      itemId: item.itemId._id,
      userId: user.id,
      qty: Number(qty),
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("Items added to cart successfully" + Number(qty));
          // window.location.reload(true);
          // window.location.pathname = "/home";
          if (Number(qty) === 0) {
            Axios.delete(
              "http://localhost:4000/api/products/deleteCartItemByItemId/" +
                item.itemId._id
            ).then((response) => {
              console.log(response);
              if (response) {
                console.log("item deleted successfully");
                console.log(response.data);
                dispatch(removeCartItem(item.itemId._id));
                window.location.reload(true);
              }
            });
          } else {
            window.location.reload(true);
          }
          // window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeHandler = (id) => {
    console.log("remove");
    Axios.delete(
      "http://localhost:4000/api/products/deleteCartItem/" + id
    ).then((response) => {
      console.log(response.data);
      if (response.data.success === true) {
        console.log("item deleted successfully");
        console.log(response.data.res);
        window.location.reload(true);
      }
    });

    // dispatch(removeFromCart(id));
  };

  const giftOptions = (giftMessage, itemId) => {
    console.log("Added gift options");
    console.log(giftMessage + " " + itemId);
    dispatch(
      createCartItem({
        userId: item.userId,
        itemId: item.itemId._id,
        itemName: item.itemId.itemName,
        itemPrice: item.itemId.itemPrice,
        itemImage: item.itemId.itemImage,
        itemDescription: item.itemId.itemDescription,
        qty: item.qty,
        itemCount: item.itemId.itemCount,
        giftMessage: giftMessage,
      })
    );
  };

  return (
    <>
      {item.itemId && (
        <div
          className="cart_pag"
          style={{
            display: "flex",
            width: "100%",
            // backgroundColor: "green",
            height: "200px",
          }}
        >
          <div className="cartitem">
            <div className="cartitem__image">
              <img
                src={item.itemId.itemImage}
                alt={item.itemId.itemName}
                width={200}
                height={150}
              />
            </div>
            <div style={{ marginLeft: "50px" }} className="cartItem__name">
              <p>{item.itemId.itemName}</p>
              <input
                type="checkbox"
                id="gift"
                name="gift"
                onChange={() => {
                  setGiftOption(!giftOption);
                }}
              />
              <label for="gift"> This order contains gift</label>
              {giftOption ? (
                <>
                  <input
                    type="text"
                    style={{ width: "95%", paddingLeft: "5px" }}
                    placeholder="Enter gift message!!"
                    onChange={(event) => {
                      setGiftDescription(event.target.value);
                    }}
                  />
                  <button
                    style={{
                      borderRadius: "4px",
                      backgroundColor: "rgb(243, 234, 223)",
                      marginTop: "1px",
                      border: "1px solid black",
                    }}
                    onClick={() =>
                      giftOptions(giftDescription, item.itemId._id)
                    }
                  >
                    Save Gift Message
                  </button>
                </>
              ) : (
                <div></div>
              )}
            </div>
            <p className="cartitem__price">${item.itemId.itemPrice}</p>
            <select
              value={item.qty}
              onChange={(e) => qtyChangeHandler(item._id, e.target.value)}
              className="cartItem__select"
            >
              <option key={0} value={0}>
                0
              </option>
              {[...Array(item.itemId.itemCount).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>

            <button
              className="cartItem__deleteBtn"
              onClick={() => removeHandler(item._id)}
            >
              <Delete />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
