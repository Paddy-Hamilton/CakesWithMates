import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import StarList from '../StartList';
const styles = theme => ({
  cake: {
    cursor: 'pointer',
    '&:hover,&:focus': {
      '& $media': {
        mixBlendMode: 'screen',
        filter: 'grayscale(1) contrast(1.5)'
      }
    }
  },
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out'
  },
  media: {
    height: '100%',
    paddingTop: '56.25%'
  },
  mediaContainer: {
    height: '56.25%',
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.light} 90%)`
  },
  contentItem: {
    flexBasis: '100%'
  },
  cakeTextContainer: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit * 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: 'rgba(255, 255, 255, 0.2)'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rating: {
    position: 'absolute',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3
  },
  star: {
    color: theme.palette.secondary.dark
  }
});

const formatDateTime = dt => {
  return moment(dt).format('l');
};

const CakeCard = ({ cake: { imageUrl, name, comment, id, yumFactor }, classes, theme }) => {
  return (
    <Link as={`/a/${id}`} href={`/cake?id=${id}`}>
      <Card className={classes.cake}>
        <div className={classes.mediaContainer}>
          <CardMedia className={classes.media} image={imageUrl} title="Cake image" />
        </div>

        <CardContent className={classes.content}>
          <Typography variant="headline" component="h2">
            {name}
          </Typography>
          <Typography variant="body1" component="p">
            <StarList className={classes.star} count={yumFactor} />
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

CakeCard.propTypes = {
  cake: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CakeCard);
