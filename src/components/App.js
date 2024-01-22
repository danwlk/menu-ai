import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useState, useEffect, useRef } from "react";
import FloatingTextbox from "./FloatingTextbox/FloatingTextbox";

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const menuItemsRef = useRef([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const showMenu = menuItems.length !== 0;
  const showClear = cart.length !== 0;
  const [isTextboxVisible, setTextboxVisibility] = useState(true);

  // keep menu items updated for voice commands
  useEffect(() => {
    menuItemsRef.current = menuItems;
  }, [menuItems]);

  // alan ai voice commands
  useEffect(() => {
    alanBtn({
      key: "5fd23dd7184cc6231434588bb3f113a12e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setMenuItems(commandData.data);
        } else if (commandData.command === "addToCart") {
          addToCart(
            menuItemsRef.current.find(
              (item) => item.name === commandData.data.name
            )
          );
        } else if (commandData.command === "deleteFromCart") {
          handleDelete(
            menuItemsRef.current.find(
              (item) => item.name === commandData.data.name
            )
          );
        } else if (commandData.command === "deleteAllFromCart") {
          handleDeleteAll(
            menuItemsRef.current.find(
              (item) => item.name === commandData.data.name
            )
          );
        } else if (commandData.command === "clearCart") {
          handleClearCart();
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // adding to cart
  const addToCart = (item) => {
    item.count++;
    if (item.count === 1) {
      setCart((oldcart) => {
        return [...oldcart, item]; // append to cart
      });
    } else {
      setCart((oldcart) => [...oldcart]); // keeps the cart same but increments count by 1
    }
    setTotalPrice((oldPrice) => oldPrice + item.price); // updates the total price
  };

  const handleDelete = (item) => {
    // item is not in the cart
    if (item.count === 0) {
      alert("This item is not in the cart");
      return;
    }

    // delete the item from the cart
    if (item.count === 1) {
      item.count = 0;
      setCart((oldcart) => {
        return oldcart.filter((oldItem) => { // remove item from cart
          return oldItem.name !== item.name;
        });
      });
      setTotalPrice((oldPrice) => oldPrice - item.price); // updates the total price
    } else {
      item.count--;
      setCart((cart) => [...cart]); // keeps the cart same but decrements count by 1
      setTotalPrice((oldPrice) => oldPrice - item.price); // updates the total price
    }
  };

  const handleDeleteAll = (item) => {
    // item is not in the cart
    if (item.count === 0) {
      alert("This item is not in the cart");
      return;
    }

    const itemCount = item.count;
    item.count = 0;

    setCart((oldcart) => {
      return oldcart.filter((olditem) => { // remove item from cart
        return olditem.name !== item.name;
      });
    });
    setTotalPrice((oldPrice) => oldPrice - item.price * itemCount); // updates the total price
  };

  const handleClearCart = () => {
    setCart((oldcart) => {
      oldcart.map((olditem) => {
        return (olditem.count = 0); // sets every item's count to 0
      });
      return []; // returns empty array to cart
    });
    setTotalPrice(0.0); // set price to 0
  };

  return (
    <div className="App">
      <button
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: "1000",
        }}
        onClick={() => setTextboxVisibility(!isTextboxVisible)}
      >
        {isTextboxVisible ? "Hide Instructions" : "Show Instructions"}
      </button>
      <FloatingTextbox isVisible={isTextboxVisible}>
        <h4>Commands:</h4>
        <p>Click the microphone button and speak the following commands</p>
        <ul>
          <li>Show me the menu</li>
          <li>Order by name/price/category</li>
          <li>Add (product name)</li>
          <li>Delete (product name)</li>
          <li>Delete all (product name)</li>
          <li>Clear cart</li>
        </ul>
      </FloatingTextbox>

      <h1>Menu</h1>
      {showMenu ? (
        <ol>
          {menuItems.map((item) => {
            return (
              <li key={item.name}>
                {item.name} - ${item.price} - {item.category}
                <br />
                <button onClick={() => addToCart(item)}>Add</button>
              </li>
            );
          })}
        </ol>
      ) : (
        'Start by saying the command "show me the menu"'
      )}

      <h2>Cart</h2>
      <ul>
        {cart.map((item) => {
          return (
            <li key={item.name}>
              {item.count} - {item.name} - ${item.price}
              <br />
              <button onClick={() => handleDelete(item)}>Delete</button>
              <button onClick={() => handleDeleteAll(item)}>Delete All</button>
            </li>
          );
        })}
      </ul>
      {showClear && (
        <button onClick={() => handleClearCart()}>Clear Cart</button>
      )}
      <h3>Total: ${Math.round((totalPrice + Number.EPSILON) * 100) / 100}</h3>
    </div>
  );
}

export default App;
