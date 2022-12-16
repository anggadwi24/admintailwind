import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import api from "../lib/Api";
import Modals from "./Modal";

import ModalLoading from "./ModalLoading";


const Modal = ({ show, onClose,setSuccess, children, title,url,...props }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [type,setType] = useState(null);
  const [message,setMessage] = useState(null);
  const [titles,setTitles] = useState(null);


 

  const [showModal,setShowModal] = useState(false);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
    setType(null);
    setShowModal(false);

  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSubmit = async () =>{
    setLoading(true);
    const token = Cookies.get('token');
      api.defaults.headers.Authorization = `Bearer ${token}`
      api
      .delete(url)
      .then((res) =>{
        onClose();
          setLoading(false);
          setShowModal(true);
          if(res.data.statusCode == 200){
              setType('success');
              setMessage('Users successfully deleted');
              setTitles('Successfull');  
              setSuccess(true);
              
             

            
          }else{
            setType('error');
            setMessage(res.data.message);
            setTitles('Warning!');  
            setSuccess(false);

           
            
          }
          
      })
  }
    
  

  const modalContent = show ? (
    <div
    className="fixed   inset-0 overflow-y-auto h-full w-full"
	id="my-modal"
>
    <div
    className="fixed top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2  mx-auto p-5 border w-96 shadow-2xl rounded-md bg-white"
  >
    <div className="mt-3 text-center">
      <div
        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100"
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>

      </div>
      <h3 className="text-lg mt-5 leading-6 font-medium text-gray-900">{title}</h3>
      <div className="mt- px-7 py-3">
        <p className="text-sm text-gray-500">
         {children}
        </p>
      </div>
      <div className="flex justify-between px-4 py-3">
        <button onClick={handleSubmit} className="px-4 py-2 bg-yellow-500 text-white text-base font-medium rounded-md w-1/3 shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">SURE</button>
        <button onClick={ handleCloseClick}
          id="ok-btn"
          className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-1/3 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
  </div>
  ) : null;

  
  if (isBrowser) {
    if(loading){
     

      return ReactDOM.createPortal(
        <ModalLoading  onClose={() => handleCloseClick(e)} show='true' ></ModalLoading>,
        document.getElementById("modal-root")
      );
    }else{
      if(showModal){

        if(type){
        

          return ReactDOM.createPortal(
            <Modals onClose={() => setShowModal(false)} show='true' title={titles} type={type} text={message} ></Modals>,
            document.getElementById("modal-root")
          );
        }else{
       

          return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
          );
        }
      }else{
        
        return ReactDOM.createPortal(
          modalContent,
          document.getElementById("modal-root")
        );
      }
     
     
    }
    
   
  } else {
    return null;
  }
};


export default Modal;