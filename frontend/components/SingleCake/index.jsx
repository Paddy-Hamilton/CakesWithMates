import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import ToggleEditCakeModalBtn from '../ToggleEditCakeModalBtn';
import EditCakeModal from '../EditCakeModal';
import StartList from '../StartList';
import SingleCakeContainer from './Container';

const styles = theme => ({
  root: {
    margin: '0 auto'
  },
  gridWrapper: {
    padding: '0 12px',
    maxWidth: '700px',
    margin: '0 auto',
    position: 'relative'
  },

  header: {
    width: '100%',
    minHeight: '350px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginBottom: theme.spacing.unit * 4
  },
  grid: {
    marginTop: 0
  },
  cakeBody: {
    marginTop: theme.spacing.unit * 4
  },
  star: {
    color: theme.palette.secondary.dark
  },
  toggle: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'blocks'
  }
});

class SingleCake extends Component {
  handleEditClick = e => {
    e.preventDefault();
  };
  render() {
    const {
      classes,
      theme,
      cake: { id, imageUrl, name, comment, yumFactor }
    } = this.props;
    return (
      <div className={`${classes.root} test-cxt`}>
        <header style={{ backgroundImage: `url(${imageUrl})` }} className={classes.header} />
        <div className={classes.gridWrapper}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <span className={classes.toggle}>
                <ToggleEditCakeModalBtn theme={theme} />
              </span>
              <Typography variant="display1" gutterBottom>
                {name}
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.cakeBody}>
                <StartList count={yumFactor} />
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.cakeBody}>
                {comment}
              </Typography>
            </Grid>
          </Grid>
          <EditCakeModal id={id} name={name} comment={comment} imageUrl={imageUrl} yumFactor={yumFactor} />
        </div>
      </div>
    );
  }
}
export const SingleCakeStyled = withStyles(styles, { withTheme: true })(SingleCake);
export default ({ id }) => <SingleCakeContainer id={id} render={cake => <SingleCakeStyled cake={cake} />} />;
