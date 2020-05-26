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

    const aspectRatio = number('aspectRatio', 1.7);
    const disableError = boolean('disableError', false);
    const disableLoading = boolean('disableSpinner', false);

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
                    aspectRatio={aspectRatio}
                    disableError={disableError}
                    disableSpinner={disableLoading}
                    loading={loading1}
                    onLoad={console.log}
                />
            </Grid>
            <Grid item xs={4}>
                <BasePicture
                    src={undefined}
                    aspectRatio={aspectRatio}
                    disableError={disableError}
                    disableSpinner={disableLoading}
                    loading={loading2}
                />
            </Grid>
            <Grid item xs={4}>
                <BasePicture
                    src={img}
                    aspectRatio={aspectRatio}
                    disableError={disableError}
                    disableSpinner={disableLoading}
                    loading
                />
            </Grid>
        </Grid>
    );
}
