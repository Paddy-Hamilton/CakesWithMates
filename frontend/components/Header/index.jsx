import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${
      theme.palette.secondary.light
    } 90%)`,
    color: "#fff"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignitems: "center"
  }
});

const Header = ({ classes, name, children }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" color="inherit">
            {name}
          </Typography>
          <div>{children}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);
