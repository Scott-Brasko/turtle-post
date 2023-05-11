// import React from 'react';
import { createRoot } from 'react-dom/client';

import './src/sassStyles/_global.scss';
import * as bootstrap from 'bootstrap';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(App());
