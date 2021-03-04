import 'es6-promise/auto';
import 'core-js/es/map';
import 'core-js/es/set';
import 'react-app-polyfill/ie9';

import React from 'react';
import { render } from 'react-dom';

import App from '@/containers/Home';

import '@/scss/global.scss';

render(<App />, document.getElementById('app'));
