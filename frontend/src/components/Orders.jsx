import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>My Orders</h1>

      {orders.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>No orders yet.</p>
      )}

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#fff",
            transition: "transform 0.2s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <h3 style={{ color: "#007bff" }}>Order ID: {order.orderId}</h3>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              Total: ${order.total.toFixed(2)}
            </span>
          </div>

          <p style={{ color: "#888", marginBottom: "15px" }}>
            Date: {new Date(order.timestamp).toLocaleString()}
          </p>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {order.items.map(item => (
              <li
                key={item.product}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>{item.name} x {item.qty}</span>
                <span>${item.subtotal.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
