import React, { useState } from "react";

const menuItems = [
  { name: "Angus Burger", price: 8.99, category: "burger", count: 0 },
  { name: "Tuna Steak Burger", price: 15.0, category: "burger", count: 0 },
  { name: "Bacon Burger", price: 11.5, category: "burger", count: 0 },
  {
    name: "Southwest Chicken Burger",
    price: 9.99,
    category: "burger",
    count: 0,
  },
  { name: "Mozzarella Burger", price: 12.5, category: "burger", count: 0 },
  { name: "Cesar Salad", price: 6.5, category: "salad", count: 0 },
  { name: "BBQ Chicken Salad", price: 13.99, category: "salad", count: 0 },
  { name: "Garden Salad", price: 9.99, category: "salad", count: 0 },
  { name: "Veggie Lasagna", price: 17.99, category: "pasta", count: 0 },
  { name: "Spaghetti & Meatballs", price: 17.99, category: "pasta", count: 0 },
  { name: "Fettuccine Alfredo", price: 17.99, category: "pasta", count: 0 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const checkCartEmpty = cart.length !== 0;

  const addToCart = (item) => {
    item.count++;
    if (item.count === 1) {
      setCart((oldcart) => {
        return [...oldcart, item];
      });
    } else {
      setCart([...cart]);
    }
    setTotalPrice(totalPrice + item.price);
  };

  const handleDelete = (item) => {
    if (item.count === 1) {
      item.count = 0;
      setCart((oldcart) => {
        return oldcart.filter((oldItem) => {
          return oldItem.name !== item.name;
        });
      });
      setTotalPrice(totalPrice - item.price);
    } else {
      item.count--;
      setCart([...cart]);
      setTotalPrice(totalPrice - item.price);
    }
  };

  const handleDeleteAll = (item) => {
    setCart((oldcart) => {
      return oldcart.filter((olditem) => {
        return olditem.name !== item.name;
      });
    });
    setTotalPrice(totalPrice - item.price * item.count);
    item.count = 0;
  };

  const handleClearCart = () => {
    setCart((oldcart) => {
      oldcart.map((olditem) => {
        return olditem.count = 0;
      })
      return [];
    });
    setTotalPrice(0.0);
  };

  return (
    <div className="App">
      <h1>Menu</h1>
      <ol>
        {menuItems.map((item) => {
          return (
            <li key={item.name}>
              {item.name} - ${item.price}
              <br />
              <button onClick={() => addToCart(item)}>Add</button>
            </li>
          );
        })}
      </ol>

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
      {checkCartEmpty && <button onClick={() => handleClearCart()}>Clear Cart</button>}
      <h3>Total: ${Math.round((totalPrice + Number.EPSILON) * 100) / 100}</h3>
    </div>
  );
}

export default App;
