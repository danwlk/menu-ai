import React, { useState } from "react";

const menuItems = [
  { name: "Angus Burger", price: 8.99, category: "burger", count: 0 },
  { name: "Tuna Steak Burger", price: 15.0, category: "burger", count: 0 },
  { name: "Bacon Burger", price: 11.5, category: "burger", count: 0 },
  { name: "Southwest Chicken Burger", price: 9.99, category: "burger", count: 0 },
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

  const addToCart = (item) => {
    item.count++;
    if (item.count === 1) {
      setCart((oldCart) => {
        return [...oldCart, item]
      })
    } else {
      setCart([...cart]);
    }
  }

  const clearCart = () => {
    setCart([]);
  }

  const deleteItem = (item) => {
    if (item.count === 1) {
      item.count = 0;
      setCart((oldCart) => {
        return oldCart.filter((oldItem) => {
          return oldItem.name !== item.name
        })
      })
    } else {
      item.count--;
      setCart([...cart]);
    }
  }

  return (
    <div className="App">
      <h1>Menu</h1>
      <ol>
        {menuItems.map((item) => {
          return (
            <li key={item.name}>
              {item.name} - ${item.price} - {item.category}
              <br />
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </li>
          );
        })}
      </ol>
      
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => {
          return <li key={item.category}>
            {item.count} - {item.name} - ${item.price} - {item.category}
            <br />
            <button onClick={() => deleteItem(item)}>Delete</button>
          </li>
        })}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default App;
