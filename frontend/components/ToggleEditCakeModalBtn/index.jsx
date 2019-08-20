import React from "react";
import PropTypes from "prop-types";
import { Fab, Zoom } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { TOGGLE_CAKE_MODAL_OPEN } from "../../graphql/mutations.graphql";
import { useMutation } from "@apollo/react-hooks";
import { useTheme } from "@material-ui/styles";
const ToggleEditCakeModalBtn = ({ id, theme }) => {
  const [toggleEditCakeModal, { data }] = useMutation(TOGGLE_CAKE_MODAL_OPEN);
  const {
    transitions: {
      duration: { enteringScreen: enter, leavingScreen: exit }
    }
  } = theme;
  return (
    <Zoom
      in
      timeout={{ enter, exit }}
      style={{
        transitionDelay: exit
      }}
      unmountOnExit
    >
      <Fab
        aria-label="Edit Cake"
        color="secondary"
        size="small"
        onClick={e => {
          e.preventDefault();
          toggleEditCakeModal();
        }}
      >
        <EditIcon />
      </Fab>
    </Zoom>
  );
};

ToggleEditCakeModalBtn.propTypes = {
  theme: PropTypes.object.isRequired
};

export default ToggleEditCakeModalBtn;
