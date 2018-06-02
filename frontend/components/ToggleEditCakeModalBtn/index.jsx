import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import { TOGGLE_CAKE_MODAL_OPEN } from '../../graphql/mutations.graphql';
import { Mutation } from 'react-apollo';
class ToggleEditCakeModalBtn extends Component {
  render() {
    const { theme, id } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };
    return (
      <Zoom
        in
        timeout={transitionDuration}
        style={{
          transitionDelay: transitionDuration.exit
        }}
        unmountOnExit
      >
        <Mutation mutation={TOGGLE_CAKE_MODAL_OPEN}>
          {toggleEditCakeModal => (
            <Button
              aria-label="Edit Cake"
              color="secondary"
              variant="fab"
              mini
              onClick={e => {
                e.preventDefault();
                toggleEditCakeModal();
              }}
            >
              <EditIcon />
            </Button>
          )}
        </Mutation>
      </Zoom>
    );
  }
}

ToggleEditCakeModalBtn.propTypes = {
  theme: PropTypes.object.isRequired
};

export default ToggleEditCakeModalBtn;
