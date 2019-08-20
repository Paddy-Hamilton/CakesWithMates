import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import CakeCard from "../CakeCard";
import CakeGridContainer from "./container";
const styles = theme => ({
  root: {
    padding: "0 12px",
    margin: "0 auto"
  },
  grid: {
    marginTop: 0
  }
});

const CakeGrid = ({ cakes, classes }) => {
  return (
    <div className={classes.root} id="testr" >
      <Grid container spacing={3} className={classes.grid} alignItems="stretch">
        {cakes &&
          cakes.map((cake, i) => (
            <Grid item xs={12} md={6} lg={4} key={cake.id}>
              <CakeCard cake={cake} key={cake.id} />
            </Grid>
          ))}
        {cakes.length === 0 && (
          <Grid item xs={12}>
            <p>No items do display</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

CakeGrid.propTypes = {
  cakes: PropTypes.array.isRequired
};
export const CakeGridStyled = withStyles(styles)(CakeGrid);

export default () => (
  <CakeGridContainer render={cakes => <CakeGridStyled cakes={cakes} />} />
);
