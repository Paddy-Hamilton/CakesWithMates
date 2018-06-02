import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PageLayout from '../components/PageLayout';
import { withStyles } from '@material-ui/core/styles';
import withData from '../lib/withData';
const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
    margin: '0 auto'
  }
});
class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <PageLayout>
        <div className={classes.root}>
          <Typography>This is the about page, I am making this because I want to, because I want to.</Typography>
        </div>
      </PageLayout>
    );
  }
}

export default withStyles(styles)(About);
