import React from "react";
import { useCart, useDispatch } from "../ContextReducer";
import { MdDeleteForever } from "react-icons/md";

function Cart({ setcartview }) {
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:1000/app/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let data = useCart();
  let dispatch = useDispatch();
  if (data.length === 0) {
    return (
      <div className="container bg-white ">
        <div className="m-5 pt-5 text-center text-success fs-1 fw-bolder ">
          Your Cart Is Empty!
        </div>
        <hr />
        <div className="text-center">
          <button
            className="d-inlineblock container fs-4 w-30 mb-5 p-4 text-center"
            style={{ width: "200px", borderRadius: "15%" }}
            onClick={() => setcartview(false)}
          >
            Let's Order
          </button>
        </div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container">
        <table className="table text-success fs-4 ">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                #
              </th>
              <th scope="col" className="text-center">
                Item Name
              </th>
              <th scope="col" className="text-center">
                Qty
              </th>
              <th scope="col" className="text-center">
                Size
              </th>
              <th scope="col" className="text-center">
                Amount
              </th>
              <th scope="col" className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row" className="text-center">
                  {index + 1}
                </th>
                <td className="text-center">{food.name}</td>
                <td className="text-center">{food.qty}</td>
                <td className="text-center">{food.size}</td>
                <td className="text-center">{food.price}</td>
                <td className="text-center">
                  <button type="button" className=" btn p-0 fs-4">
                    <MdDeleteForever
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="fs-4 text-white">Total Price : {totalPrice}</div>
        <button className="btn btn-success fs-4" onClick={handleCheckOut}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
