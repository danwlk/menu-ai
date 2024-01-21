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
  { name: "Caesar Salad", price: 6.5, category: "salad", count: 0 },
  { name: "BBQ Chicken Salad", price: 13.99, category: "salad", count: 0 },
  { name: "Garden Salad", price: 9.99, category: "salad", count: 0 },
  { name: "Veggie Lasagna", price: 17.99, category: "pasta", count: 0 },
  {
    name: "Spaghetti and Meatballs",
    price: 17.99,
    category: "pasta",
    count: 0,
  },
  { name: "Fettuccine Alfredo", price: 17.99, category: "pasta", count: 0 },
];

intent("show me the menu", (p) => {
  p.play({ command: "getMenu", data: menuItems });
  p.play("Here is the menu");
});

intent("Order by $(ORDER_BY name|price|category)", (p) => {
  const orderByField = p.ORDER_BY.value;
  let orderedMenuItems = menuItems;

  switch (orderByField) {
    case "name":
      orderedMenuItems = menuItems.sort((p1, p2) =>
        p1.name.localeCompare(p2.name)
      );
      break;
    case "category":
      orderedMenuItems = menuItems.sort((p1, p2) =>
        p1.category.localeCompare(p2.category)
      );
      break;
    case "price":
      orderedMenuItems = menuItems.sort((p1, p2) => p1.price - p2.price);
      break;
  }

  p.play({ command: "getMenu", data: orderedMenuItems });
  p.play(`Ordering by ${p.ORDER_BY.value}`);
});

const menuItemsNames = menuItems.map((item) => item.name).join("|");

intent(`Add $(ITEM ${menuItemsNames})`, "Add $(UNAVAILABLE_ITEM* .*)", (p) => {
  if (p.UNAVAILABLE_ITEM) {
    p.play("That item is unavailable");
  } else {
    const itemName = p.ITEM.value;
    const itemToGoInCart = menuItems.find((menuItem) => {
      return menuItem.name.toLowerCase() === itemName.toLowerCase();
    });

    p.play({ command: "addToCart", data: itemToGoInCart });
    p.play(`Adding ${p.ITEM.value} to the cart`);
  }
});
