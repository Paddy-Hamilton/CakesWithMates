import React,{useState} from "react";
import {
  EDIT_CAKE_MODAL_OPEN,
  CAKES,
  CAKE
} from "../../graphql/queries.graphql";
import {
  TOGGLE_CAKE_MODAL_OPEN,
  EDIT_CAKE,
  ADD_CAKE
} from "../../graphql/mutations.graphql";
import { useMutation, useQuery } from "@apollo/react-hooks";
const EditCakeModalContainer = ({ children,id, ...props }) => {

  const [toggleEditCakeModal, { data: toggleData }] = useMutation(
    TOGGLE_CAKE_MODAL_OPEN
  );
  const [editCake, { data: editData }] = useMutation(EDIT_CAKE, {
    refetchQueries: [{ query: CAKES }, { query: CAKES }]
  });
  const [addCake, { data: addData }] = useMutation(ADD_CAKE, {
    refetchQueries: [{ query: CAKES }, { query: CAKES }]
  });

  const {
    loading: isOpenLoading,
    error: isOpenError,
    data: isOpenData
  } = useQuery(EDIT_CAKE_MODAL_OPEN);
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  const [editForm, setEditForm] = useState({
    name: props.name || "",
    comment: props.comment || "",
    imageUrl: props.imageUrl || "",
    yumFactor: props.yumFactor || 0
  });

  const handleOnChange = (name, e) => {
    e.persist();
    setEditForm(current => ({ ...current, [name]: e.target.value }));
  };
  const handleClearSnackbar = () => {
    setSnackbar({
      message: "",
      type: ""
    });
  };
  const handleSave = e => {
    e.preventDefault();
    const variables = { ...editForm };
    const func = id ? editCake : addCake;
    if (id) {
      variables["id"] = id;
    }
    return func({
      variables
    })
      .then(res => {
        if (res.data) {
          toggleEditCakeModal();
          setSnackbar({
            message: id ? "Cake updated" : "New cake saved",
            type: "success"
          });
        }
      })
      .catch(err => {
        console.error(err);
        setSnackbar({
          message: `Error whilst trying to save cake: ${err} `,
          type: "warning"
        });
      });
  };
  return children({
    ...props,
    addCake,
    editCake,
    toggleEditCakeModal,
    handleSave,
    handleClearSnackbar,
    handleOnChange,
    editForm,
    snackbar,
    isOpenData,
    isOpenLoading,
    isOpenError
  });
};

export default EditCakeModalContainer;
