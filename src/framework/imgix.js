import param from 'jquery-param';
import { compose, join, split, drop } from 'ramda';

import getLocation from './getLocation';

const types = {
  list: {
    fit: 'max',
    w: 320,
    h: 320
  }
};

export default (url, type) => {
  const location = getLocation(url);
  if (!location) {
    return null;
  }

  const filepath = compose(
    join('/'),
    drop(2),
    split('/')
  )(location.pathname);
  const imgixPath = `http://justjoin.imgix.net/${filepath}?${param(types[type])}`;
  return imgixPath;
};
