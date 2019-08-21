import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Modal,
  Button,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core/";
import EditCakeModalContainer from "./Container";
import SnackBarNotification from "../SnackBarNotification";
import StartList from "../StartList";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing(1) * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  submit: {
    marginTop: theme.spacing(2),
    float: "right"
  },
  star: {
    color: theme.palette.secondary.dark
  }
});
const EditCakeModal = ({
  classes,
  id,
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
}) => {
  if (isOpenLoading) return null;
  if (isOpenError) return null;
  const { message, type } = snackbar;
  const { imageUrl, name, comment, yumFactor } = editForm;
  return (
    <div>
      <Modal
        className="test-cxt"
        aria-labelledby={`${id ? "Edit" : "Create"} cake`}
        aria-describedby={`${id ? "Edit" : "Create and publish"} a cake`}
        open={isOpenData.editCakeModalOpen}
        onClose={toggleEditCakeModal}
      >
        <div className={classes.paper}>
          <Typography variant="h1" className="title" gutterBottom>
            {`${id ? "Edit" : "Create"} cake`}
          </Typography>
          <form onSubmit={handleSave}>
            <TextField
              id="cake-name"
              label="Name"
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={e => handleOnChange("name", e)}
            />
            <TextField
              id="cake-comment"
              label="Comment"
              margin="normal"
              required
              fullWidth
              value={comment}
              multiline
              rowsMax="10"
              onChange={e => handleOnChange("comment", e)}
            />
            <TextField
              id="cake-image-url"
              label="Image Url"
              margin="normal"
              fullWidth
              required
              value={imageUrl}
              onChange={e => handleOnChange("imageUrl", e)}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="yumFactor">Yum Factor</InputLabel>
              <Select
                value={yumFactor}
                onChange={e => handleOnChange("yumFactor", e)}
                inputProps={{
                  name: "yumFactor",
                  id: "yumFactor"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                <MenuItem value={1}>
                  <StartList count={1} className={classes.star} />
                </MenuItem>
                <MenuItem value={2}>
                  <StartList count={2} className={classes.star} />
                </MenuItem>
                <MenuItem value={3}>
                  <StartList count={3} className={classes.star} />
                </MenuItem>
                <MenuItem value={4}>
                  <StartList count={4} className={classes.star} />
                </MenuItem>
                <MenuItem value={5}>
                  <StartList count={5} className={classes.star} />
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>
      {message && (
        <SnackBarNotification
          message={message}
          type={type}
          onClose={handleClearSnackbar}
        />
      )}
    </div>
  );
};

EditCakeModal.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.string,
  imageUrl: PropTypes.string,
  id: PropTypes.string,
  yumFactor: PropTypes.number,
  isOpen: PropTypes.object,
  toggle: PropTypes.func,
  editCake: PropTypes.func,
  addCake: PropTypes.func
};
// create a styled component that i can test without testing apollo and data fetching. therefore i can test the data fetching independatly
export const EditCakeModalStyled = withStyles(styles)(EditCakeModal);
export default props => (
  <EditCakeModalContainer {...props}>
    {containerProps => <EditCakeModalStyled {...containerProps} {...props} />}
  </EditCakeModalContainer>
);
