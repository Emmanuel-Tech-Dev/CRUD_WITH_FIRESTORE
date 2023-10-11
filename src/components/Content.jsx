import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../crudContext";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
const Content = () => {
  const { setUpdateModal, setOpenModal, getData, setGetData ,  setUData} =
    useContext(CrudContext);

  const handleEdit = (id) => {
    setUpdateModal(true);

    const selectedItem = getData.find((item) => item.id == id);

    if (selectedItem) {
      setUData({
        id: id,
        productName: selectedItem.productName,
        category: selectedItem.category,
        price: selectedItem.price,
      });
    }
    return;
  };



  const collectionRef = collection(database, "products");

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setGetData(data);
      });

      return () => unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
    };

    fetchData();
  }, []);

  const handleDeleteItem = async (itemId) => {
    const docRef = doc(collectionRef, itemId);

    await deleteDoc(docRef)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.log("Error deleting document: ", error.message);
      });
  };

  const handleDelete = (itemId) => {
    handleDeleteItem(itemId);
  };

  return (
    <>
      <h1 className='text-center mt-6 text-4xl font-bold'>
        CRUD OPERATION WITH FIREBASE/FIRESTORE
      </h1>

      <div className='max-w-2xl m-auto mt-32'>
        <div className='flex flex-col'>
          <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <div className='inline-block min-w-full align-middle'>
              <div className='overflow-y-scroll h-[500px] '>
                <table className='min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 '>
                  <thead className='bg-gray-100 dark:bg-gray-700 sticky top-[0]'>
                    <tr>
                      <th scope='col' className='p-4'>
                        <div className='flex items-center'>
                          <input
                            id='checkbox-all'
                            type='checkbox'
                            className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label htmlFor='checkbox-all' className='sr-only'>
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope='col'
                        className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'>
                        Product Name
                      </th>
                      <th
                        scope='col'
                        className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'>
                        Category
                      </th>
                      <th
                        scope='col'
                        className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'>
                        Price
                      </th>
                      <th>
                        <button
                          className='bg-white py-2 px-4 rounded'
                          onClick={() => setOpenModal(true)}>
                          Add New Entry
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                    {getData.map((item) => (
                      <tr
                        key={item?.id}
                        className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                        <td className='p-4 w-4'>
                          <div className='flex items-center'>
                            <input
                              id='checkbox-table-2'
                              type='checkbox'
                              className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />
                            <label
                              htmlFor='checkbox-table-2'
                              className='sr-only'>
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          {item?.productName}
                        </td>
                        <td className='py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white'>
                          {item?.category}
                        </td>
                        <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          ${item?.price}
                        </td>
                        <td className='py-4 px-6 text-sm font-medium text-right whitespace-nowrap'>
                          <button
                            className='text-blue-600 dark:text-blue-500 hover:underline'
                            onClick={() => handleEdit(item.id)}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className='text-red-600 ml-5 dark:text-red-500 hover:underline'>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
