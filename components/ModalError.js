import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";


const Modal = ({ show, onClose, children, title }) => {
    console.log(show);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div
    className="fixed   inset-0 overflow-y-auto h-full w-full"
	id="my-modal"
>
    <div
    className="fixed top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2  mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
  >
    <div className="mt-3 text-center">
      <div
        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
      >
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <div className="mt-2 px-7 py-3">
        <p className="text-sm text-gray-500">
          {children}
        </p>
      </div>
      <div className="items-center px-4 py-3">
        <button onClick={ handleCloseClick}
          id="ok-btn"
          className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          OK
        </button>
      </div>
    </div>
  </div>
  </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};


export default Modal;