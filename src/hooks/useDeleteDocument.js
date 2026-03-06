import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  //lidar com vazamento de memória
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDisptach = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDisptach({
      type: "LOADING",
    });
    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      checkCancelBeforeDisptach({
        type: "DELETED_DOC",
        payload: deleteDocument,
      });
    } catch (error) {
      checkCancelBeforeDisptach({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};
