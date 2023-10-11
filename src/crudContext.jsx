import { useState, createContext } from "react";

export const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState({});
  const [getData, setGetData] = useState([]);
  const [upData, setUData] = useState({});

  return (
    <CrudContext.Provider
      value={{
        openModal,
        setOpenModal,
        openUpdateModal,
        setUpdateModal,
        data,
        setData,
        getData,
        setGetData,
        upData,
         setUData
      }}>
      {children}
    </CrudContext.Provider>
  );
};
