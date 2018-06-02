import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const styles = theme => ({
  success: {
    backgroundColor: theme.palette.success
  },
  warning: {
    backgroundColor: theme.palette.error.main
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class SnackBarNotification extends Component {
  state = {
    open: true
  };
  default = {
    type: 'success'
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.props.onClose();
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.message !== this.props.message;
  }

  render() {
    const { classes, message, type } = this.props;
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          TransitionComponent={props => <Slide {...props} direction="right" />}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
        >
          <SnackbarContent
            message={<span id="message-id">{message}</span>}
            className={classes[type]}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </>
    );
  }
}

SnackBarNotification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClose: PropTypes.func
};

export default withStyles(styles)(SnackBarNotification);
