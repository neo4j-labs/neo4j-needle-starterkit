import React from 'react';
import ReactDOMClient from 'react-dom/client';
// @ts-ignore
import singleSpaReact from 'single-spa-react';
import App from './App';
// @ts-ignore
import { cssLifecycle } from 'vite-plugin-single-spa/ex';

const lc = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent: App,
    errorBoundary(err: any, _info: any, _props: any) {
        return <div>Error: {err}</div>
    }
});

export const bootstrap = [cssLifecycle.bootstrap, lc.bootstrap];
export const mount = [cssLifecycle.mount, lc.mount];
export const unmount = [cssLifecycle.unmount, lc.unmount];