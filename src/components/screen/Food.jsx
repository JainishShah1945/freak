import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useCart } from "../ContextReducer";

function Food(props) {
  let price = useRef();
  let dispatch = useDispatch();
  let [qty, setQty] = useState(1);
  let [size, setSize] = useState("");
  let foodsize = Object.keys(props.options);
  let data = useCart();


  
  let options = props.options;
  let finalprice = qty * parseInt(options[size]);
  const handleaddtocart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.fooditems._id) {
        food = item;
      }
      break;
    }
    if (food !== null) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.fooditems._id,
          price: finalprice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.fooditems._id,
          name: props.fooditems.name,
          qty: qty,
          size: size,
          price: finalprice,
        });

        return;
      }
    }
    await dispatch({
      type: "ADD",
      id: props.fooditems._id,
      name: props.fooditems.name,
      qty: qty,
      size: size,
      price: finalprice,
    });
  };
  useEffect(() => {
    setSize(price.current.value);
  }, []);

  return (
    <div
      className="d-flex card m-3"
      style={{ minWidth: "15rem", maxHeight: "420px" }}
    >
      <img
        style={{ height: "130px", objectFit: "fill" }}
        src={props.fooditems.img}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.fooditems.name}</h5>
        <p className="card-text">{props.fooditems.description}</p>
        <div className="d-flex w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return <option key={i + 1}>{i + 1}</option>;
            })}
          </select>

          <select
            className="m-2 h-100 bg-success rounded "
            ref={price}
            onChange={(e) => setSize(e.target.value)}
          >
            {foodsize.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5 mt-1">${finalprice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success w-10 container "
          onClick={handleaddtocart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Food;
