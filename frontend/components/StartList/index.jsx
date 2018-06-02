import React from 'react';
import StarIcon from '@material-ui/icons/Star';
const renderStars = count => {
  let starsMade = 0;
  let stars = [];
  while (starsMade < count) {
    stars.push(starsMade);
    starsMade++;
  }
  return stars;
};

const StartList = ({ count, ...props }) => {
  return renderStars(count).map(r => <StarIcon {...props} key={r} />);
};

export default StartList;
