import React from 'react';
import BasePicture from './index';
import {boolean, number, text} from '@storybook/addon-knobs';
import Grid from "@material-ui/core/Grid";

export default {
    title: 'Components',
    parameters: {
        component: BasePicture,
    },
};

const img = require('./assets/test.jpg');

export function Picture() {
    const [loading1, setLoading1] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading1(false);
        }, 500);
        setTimeout(() => {
            setLoading2(false);
        }, 750);
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <BasePicture
                    src={text('src', img)}
                    aspectRatio={number('aspectRatio', 1200 / 800)}
                    disableError={boolean('disableError', false)}
                    disableSpinner={boolean('disableSpinner', false)}
                    loading={loading1}
                />
            </Grid>
            <Grid item xs={4}>
                <BasePicture
                    src={'static/media/test.68275464.jp'}
                    aspectRatio={1200 / 800}
                    loading={loading2}
                />
            </Grid>
            <Grid item xs={4}>
                <BasePicture
                    src={img}
                    aspectRatio={1200 / 800}
                    loading
                />
            </Grid>
        </Grid>
    );
}
