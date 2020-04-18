import Box from '@material-ui/core/Box';
import React from 'react';
import BasePicture from './Picture';
import {boolean, number, text} from '@storybook/addon-knobs';

export default {
    title: 'Components',
    parameters: {
        component: BasePicture,
    },
};

const img = require('./assets/test.jpg');

export function Picture() {
   return (
      <Box width={300}>
         <BasePicture
             src={text('src', img)}
             aspectRatio={number('aspectRatio', 1200 / 800)}
             disableError={boolean('disableError', false)}
             disableSpinner={boolean('disableSpinner', false)}
             disableTransition
         />
         <BasePicture src={'static/media/test.68275464.jp'} aspectRatio={1200 / 800} />
         <BasePicture src={img} aspectRatio={1200 / 800} loading />
      </Box>
   );
}
