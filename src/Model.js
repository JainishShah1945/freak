import React from "react";
import ReactDom from "react-dom";

const ModelStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(34,34,34)",
  transform: "translate(-50%,-50%)  ",
  zIndex: 1000,
  height: "90%",
  width: "90%",
};

const OverlayStyles = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};

function Model({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OverlayStyles}></div>
      <div style={ModelStyles}>
        <button
          className="btn btn-danger fs-4"
          style={{ marginLeft: "90%", marginTop: "-35px" }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
export default Model;
