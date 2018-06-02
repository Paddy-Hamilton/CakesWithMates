import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import uuid from 'uuid/v4';
import SnackBarNotification from '../SnackBarNotification';
import StartList from '../StartList';
import { EditCakeModalContainer } from './Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    float: 'right'
  },
  star: {
    color: theme.palette.secondary.dark
  }
});
class EditCakeModal extends Component {
  constructor(props) {
    super(props);
    const { imageUrl, name, comment, yumFactor } = props;
    this.state = {
      name: name || '',
      comment: comment || '',
      imageUrl: imageUrl || '',
      yumFactor: yumFactor || 0,
      snackbar: {
        message: '',
        type: ''
      }
    };
  }
  handleOnChange = name => e => {
    e.preventDefault();
    this.setState({ [name]: e.target.value });
  };
  handleClearSnackbar = () => {
    this.setState({
      snackbar: {
        message: '',
        type: ''
      }
    });
  };
  handleSave = (addCake, variables, toggle, message) => {
    return addCake({ variables })
      .then(res => {
        if (res.data) {
          toggle();
          this.setState({
            snackbar: {
              message,
              type: 'success'
            }
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          snackbar: {
            message: `Error whilst trying to save cake: ${err} `,
            type: 'warning'
          }
        });
      });
  };
  render() {
    const { classes, id, isOpen, toggle, editCake, addCake } = this.props;
    const {
      imageUrl,
      name,
      comment,
      yumFactor,
      snackbar: { message, type }
    } = this.state;
    const saveVars = id ? { imageUrl, name, comment, yumFactor, id } : { imageUrl, name, comment, yumFactor };
    if (isOpen.loading) return null;
    if (isOpen.error) return null;
    return (
      <div>
        <Modal
          className="test-cxt"
          aria-labelledby={`${id ? 'Edit' : 'Create'} cake`}
          aria-describedby={`${id ? 'Edit' : 'Create and publish'} a cake`}
          open={isOpen.data.editCakeModalOpen}
          onClose={toggle}
        >
          <div className={classes.paper}>
            <Typography variant="title" className="title" gutterBottom>
              {`${id ? 'Edit' : 'Create'} cake`}
            </Typography>
            <form
              onSubmit={e => {
                e.preventDefault();
                return id
                  ? this.handleSave(editCake, saveVars, toggle, 'Cake updated')
                  : this.handleSave(addCake, saveVars, toggle, 'New cake saved');
              }}
            >
              <TextField
                id="cake-name"
                label="Name"
                margin="normal"
                required
                fullWidth
                value={name}
                onChange={this.handleOnChange('name')}
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
                onChange={this.handleOnChange('comment')}
              />
              <TextField
                id="cake-image-url"
                label="Image Url"
                margin="normal"
                fullWidth
                value={imageUrl}
                onChange={this.handleOnChange('imageUrl')}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="yumFactor">Yum Factor</InputLabel>
                <Select
                  value={yumFactor}
                  onChange={this.handleOnChange('yumFactor')}
                  inputProps={{
                    name: 'yumFactor',
                    id: 'yumFactor'
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

              <Button variant="raised" type="submit" color="primary" className={classes.submit}>
                Save
              </Button>
            </form>
          </div>
        </Modal>
        {message && <SnackBarNotification message={message} type={type} onClose={this.handleClearSnackbar} />}
      </div>
    );
  }
}

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
export default ({ ...props }) => (
  <EditCakeModalContainer>
    {({ ...containerProps }) => <EditCakeModalStyled {...containerProps} {...props} />}
  </EditCakeModalContainer>
);
