// import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './src/sassStyles/_global.scss';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(App());
