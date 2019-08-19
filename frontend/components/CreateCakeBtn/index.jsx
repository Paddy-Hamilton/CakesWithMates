import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Fab, Icon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Mutation } from "react-apollo";
import { TOGGLE_CAKE_MODAL_OPEN } from "../../graphql/mutations.graphql";
const styles = theme => ({
  btn: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
});

const CreateCakeBtn = ({ classes }) => {
  return (
    <React.Fragment>
      <Mutation mutation={TOGGLE_CAKE_MODAL_OPEN}>
        {toggleEditCakeModal => (
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.btn}
            onClick={toggleEditCakeModal}
          >
            <AddIcon />
          </Fab>
        )}
      </Mutation>
    </React.Fragment>
  );
};

export default withStyles(styles)(CreateCakeBtn);
