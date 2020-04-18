import SvgIcon, {SvgIconProps} from '@material-ui/core/SvgIcon';
import CardMedia, {CardMediaProps} from '@material-ui/core/CardMedia';
import CircularProgress, {CircularProgressProps} from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import React from 'react';
import {Omit, StandardProps} from "@material-ui/core";

const styles = () => ({
    root: {
        width: '100%',
        position: 'relative' as const,
        overflow: 'hidden',
        paddingTop: ({aspectRatio}: Omit<PictureProps, 'classes'>) => `calc(1 / ${aspectRatio || 1} * 100%)`
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute' as const,
        top: 0,
        left: 0,
        transition: ({disableTransition}: Omit<PictureProps, 'classes'>) => disableTransition ? undefined : `
                filterBrightness ${600 * 0.75}ms cubic-bezier(0.4, 0.0, 0.2, 1),
                filterSaturate ${600}ms cubic-bezier(0.4, 0.0, 0.2, 1),
                opacity ${600 / 2}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
    },
    empty: {
        opacity: 0,
    },
    status: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    progress: {},
    error: {
        color: '#000000e0',
        fontSize: 40,
    },
});

export type PictureClassKey = 'root' | 'image' | 'empty' | 'status' | 'progress' | 'error';

export interface PictureProps extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    PictureClassKey> {
    src: string;

    className?: string;
    style?: React.CSSProperties;
    aspectRatio?: number;

    disableError?: boolean;
    disableSpinner?: boolean;
    disableTransition?: boolean;
    loading?: boolean;

    renderLoading?: () => React.ReactNode
    renderError?: () => React.ReactNode

    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onLoad?: () => void;
    onError?: () => void;

    ContainerProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'className'>;
    MediaProps?: Omit<CardMediaProps<'img'>, 'src' | 'component' | 'onLoad' | 'onError'>;
    ProgressProps?: CircularProgressProps;
    ErrorProps?: SvgIconProps;
}

function Component(props: PictureProps) {
    const { disableError, disableSpinner, onClick} = props;
    const classes = props.classes as Required<PictureProps>['classes'];

    const [state, setState] = React.useState({src: '', error: false, loaded: false});

    React.useEffect(() => {
        setState({src: props.src, error: false, loaded: false});
    }, [props.src]);

    const handleLoadImage = () => {
        setState({...state, loaded: true});

        if (props.onLoad) {
            props.onLoad();
        }
    };
    const handleImageError = () => {
        setState({...state, loaded: false, error: true});

        if (props.onError) {
            props.onError();
        }
    };

    const showLoading = (!disableSpinner && !state.loaded && !state.error) || props.loading;
    const showError = !disableError && state.error;

    return (
        <div
            {...props.ContainerProps}
            className={clsx(classes.root,
                props.className,
            )}
            onClick={onClick}
        >
            <img/>
            {
                (state.src && !props.loading && !state.error) && (
                    <CardMedia
                        component='img'
                        {...props.MediaProps}
                        className={
                            clsx(
                                classes.image, {
                                    [classes.empty as string]: !state.loaded,
                                }, props.MediaProps && props.MediaProps.className,
                            )
                        }
                        src={state.src}
                        onLoad={handleLoadImage}
                        onError={handleImageError}
                    />
                )
            }
            {
                (showLoading || showError) && (
                    <div className={classes.status}>
                        {
                            showLoading && (
                                <div className={classes.status}>
                                    {
                                        props.renderLoading ?
                                            props.renderLoading() :
                                            <CircularProgress
                                                {...props.ProgressProps}
                                                className={
                                                    clsx(classes.progress,
                                                        props.ProgressProps && props.ProgressProps.className,
                                                    )
                                                }
                                            />
                                    }
                                </div>
                            )
                        }
                        {
                            showError && (
                                <>
                                    {
                                        props.renderError ?
                                            props.renderError() :
                                            <SvgIcon
                                                viewBox="0 0 384 384" width="40" height="40"
                                                {...props.ErrorProps}
                                                className={
                                                    clsx(classes.status, classes.error,
                                                        props.ErrorProps && props.ErrorProps.className,
                                                    )
                                                }
                                            >
                                                <path
                                                    d="M234.667,264.533L149.333,179.2L64,264.533l-64-64v140.8C0,364.8,19.2,384,42.667,384h298.667     C364.8,384,384,364.8,384,341.333V243.2l-64-64L234.667,264.533z"/>
                                                <path
                                                    d="M341.333,0H42.667C19.2,0,0,19.2,0,42.667V140.8l64,64l85.333-85.333l85.333,85.333L320,119.467l64,64v-140.8     C384,19.2,364.8,0,341.333,0z"/>
                                            </SvgIcon>
                                    }
                                </>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

const Picture = React.memo(withStyles(styles, {name: 'Picture'})(Component));

export default Picture;
