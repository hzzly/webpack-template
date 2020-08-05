import 'es6-promise/auto';
import 'core-js/es/map';
import 'core-js/es/set';

import { h, render } from 'preact';

import App from './app';

import '@/scss/global.scss';

render(<App />, document.getElementById('app'));
