import React, { memo } from 'react';

type Props = {
  price: number;
};

export default memo(({ price }: Props) => {
  const formattedPrice = `${price}`
    .split('')
    .reverse()
    .reduce((prev, cur, curIdx) => {
      if (curIdx !== 0 && curIdx % 3 === 0) {
        return cur + ',' + prev;
      }

      return cur + prev;
    }, '');

  return <span>{formattedPrice}</span>;
});
