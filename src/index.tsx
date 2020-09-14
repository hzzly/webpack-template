import 'es6-promise/auto';
import 'core-js/es/map';
import 'core-js/es/set';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

import '@/scss/global.scss';

ReactDOM.render(<App />, document.getElementById('app'));
