import 'es6-promise/auto';
import 'core-js/es/map';
import 'core-js/es/set';

import React from 'react';
import { render } from 'react-dom';

import App from './app';

import '@/scss/global.scss';

render(<App />, document.getElementById('app'));
