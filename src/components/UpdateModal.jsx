import React, { useContext } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CrudContext } from '../crudContext';
import { database } from '../../firebaseConfig';
import { updateDoc , doc, collection } from 'firebase/firestore';
const UpdateModal = () => {
    const {openUpdateModal , setUpdateModal ,upData , setUData} = useContext(CrudContext)
 const collectionRef = collection(database , 'products');
   

 const handleUpdateChange = (e) => {
   let newUpdate = {[e.target.name] : e.target.value }

   setUData({ ...upData, ...newUpdate });
 }

 console.log(upData)

    const updateData = async (id) => {

      const docToUpdate = doc(collectionRef , id)
      try{  
       await updateDoc(docToUpdate, {
         productName: upData.productName,
         category: upData.category,
         price: upData.price,
       });
       alert("Data updated Successfully")
       setUpdateModal(false)
      }catch(error){
        console.log(error.message)
      }
      
    }

  return (
    <>
      {openUpdateModal && (
        <div className='modal min-w-[100%] bg-black/75 absolute h-[100vh] top-[0] z-10'>
          <div className='container max-w-[30%] mx-auto bg-white mt-[10%] rounded p-6'>
            <form action=''>
              <AiOutlineCloseCircle
                className='float-right cursor-pointer'
                size={24}
                onClick={() => setUpdateModal(false)}
              />
              <h1 className='text-center font-bold text-xl mb-10'>
                Update Data Entry
              </h1>
              <input
                type='text'
                hidden
                value={upData.id}
                onChange={(e) => handleUpdateChange(e)}
                className='border indent-3 py-2 rounded-[4px] mt-1 focus:outline-none'
              />
              <div className='flex flex-col'>
                <label className='text-[14px] font-semibold'>
                  Product Name
                </label>
                <input
                  type='text'
                  placeholder='Enter product name'
                  value={upData.productName}
                  onChange={(e) => handleUpdateChange(e)}
                  className='border indent-3 py-2 rounded-[4px] mt-1 focus:outline-none'
                />
              </div>
              <div className='flex flex-col my-4'>
                <label className='text-[14px] font-semibold'>Category</label>
                <input
                  type='text'
                  placeholder='Enter category'
                  value={upData.category}
                  onChange={(e) => handleUpdateChange(e)}
                  className='border indent-3 py-2 rounded-[4px] mt-1 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[14px] font-semibold'>Price</label>
                <input
                  type='text'
                  placeholder='Enter product price'
                  value={upData.price}
                  onChange={(e) => handleUpdateChange(e)}
                  className='border indent-3 py-2 rounded-[4px] mt-1 focus:outline-none'
                />
              </div>

              <button
                className='w-[100%] bg-blue-600 mt-5 py-2 rounded-[4px] text-white'
                onClick={() => updateData()}>
                Update Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateModal
