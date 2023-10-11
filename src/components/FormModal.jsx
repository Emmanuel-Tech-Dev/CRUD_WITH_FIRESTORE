import React, { useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CrudContext } from "../crudContext";
import { app, database } from "/firebaseConfig";

import { collection, addDoc } from "firebase/firestore";
import Loader from "./Loader";

const FormModal = () => {

const [submit , setSubmit] = useState(false)
  const {data , setData ,  openModal, setOpenModal } = useContext(CrudContext);
  const collectionRef = collection(database, "products");

  const handleInput = (e) => {
    let newInput = {[e.target.name] : e.target.value };

    setData({ ...data, ...newInput });
  };

  const handleSubmit = async () => {
    try {
    setSubmit(true); // Disable the button during submission
      await addDoc(collectionRef, {
        productName: data.productName,
        category: data.category,
        price: data.price,
      });
      setOpenModal(false); // Close the modal after successful submission
    } catch (error) {
      console.log(error.message);
    } finally {
      submit(false); // Enable the button after submission (success or failure)
    }
  };





  return (
    <>
      {openModal && (
        <div className='modal min-w-[100%] bg-black/75 absolute h-[100vh] top-[0] z-10'>
          <div className='container max-w-[30%] mx-auto bg-white mt-[10%] rounded p-6'>
            <form action=''>
              <AiOutlineCloseCircle
                className='float-right cursor-pointer'
                size={24}
                onClick={() => setOpenModal(false)}
              />
              <h1 className='text-center font-bold text-xl mb-10'>
                Add New Data Entry
              </h1>

              <div className='flex flex-col'>
                <label className='text-[14px] font-semibold'>
                  Product Name
                </label>
                <input
                  name='productName'
                  type='text'
                  placeholder='Enter product name'
                  className='border indent-3 py-2 rounded-[4px] mt-1 focus:outline-none'
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className='flex flex-col my-4'>
                <label className='text-[14px] font-semibold'>Category</label>
                <input
                  type='text'
                  name='category'
                  placeholder='Enter category'
                  className='border indent-3 py-2 rounded-[4px] mt-1 focus:outline-none'
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[14px] font-semibold'>Price</label>
                <input
                  type='text'
                  name='price'
                  placeholder='Enter product price'
                  className='border indent-3 py-2 rounded-[4px] mt-1 focus:outline-none'
                  onChange={(e) => handleInput(e)}
                />
              </div>

              <button
                type='button'
                className='w-[100%] bg-blue-600 mt-5 py-2 rounded-[4px] text-white'
                onClick={handleSubmit}>
              {submit ?<Loader/> : "Submit New Entry" }
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
