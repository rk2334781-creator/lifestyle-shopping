function displayProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="100">
      <h3 contenteditable="true" onblur="editProduct(${index}, 'name', this.innerText)">${product.name}</h3>
      <p contenteditable="true" onblur="editProduct(${index}, 'price', this.innerText)">₹${product.price}</p>
      <input type="text" value="${product.image}" onchange="editProduct(${index}, 'image', this.value)" />
      <br><br>
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    productList.appendChild(div);
  });
}
function editProduct(index, key, value) {
  if (key === "price") {
    value = parseFloat(value.replace(/[₹,]/g, "")) || 0;
  }
  products[index][key] = value;
  localStorage.setItem("products", JSON.stringify(products));
}
function displayOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderList = document.getElementById("adminOrderList");

  if (!orderList) return;

  if (orders.length === 0) {
    orderList.innerHTML = "<p>No orders placed yet.</p>";
  } else {
    orders.reverse().forEach(order => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>Order ID: ${order.id}</h3>
        <p><strong>Date:</strong> ${order.date}</p>
        <ul>
          ${order.items.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('')}
        </ul>
      `;
      orderList.appendChild(div);
    });
  }
}
displayProducts();
displayOrders();
