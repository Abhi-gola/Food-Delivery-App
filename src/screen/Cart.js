import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your Cart is Empty!</h3>
        <h5 style={{ fontStyle: 'italic' }}>Add Your Favourite Food Here</h5>
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }
  const handleClearCart = async () => {
    dispatch({ type: "DROP" });
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container mt-5">
      <table className="table table-hover">
        <hr/>
        <thead>
          <tr className="text-secondary fs-4">
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <td className="text-black">{index + 1}</td>
              <td className="text-black">{food.name}</td>
              <td className="text-black">{food.qty}</td>
              <td className="text-black">{food.size}</td>
              <td className="text-black">₹{food.price}</td>
              <td>
                <button type="button" className="btn btn-primary justify-center" onClick={() => { dispatch({ type: "DECREASE", index: index }) }}>-</button>
              </td>
              <td>
                <button type="button" className="btn btn-primary justify-center" onClick={() => { dispatch({ type: "INCREASE", index: index }) }}>+</button>
              </td>
              <td>
                <button type="button" className="btn btn-danger justify-center" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-black h5">Total Price: ₹{totalPrice}/-</div>
      <div className="d-flex justify-content-end mb-5">
        <button className="btn btn-danger mt-1 me-1" onClick={handleClearCart}>Clear Cart</button>
        <button className="btn btn-primary mt-1" onClick={handleCheckOut}>Check Out</button>
      </div>

    </div>
  );
}


