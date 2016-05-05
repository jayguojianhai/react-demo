import '../common/lib';
import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';
import App from '../component/App';
import App_list from '../component/list/App';
import App_edit from '../component/edit/App';
const rootRoute = {
    component: App,
    childRoutes: [
        {
            path: '/',
            onEnter(nextState, replaceState) {
                replaceState(null, '/index');
            },
        },
        {
            path: '/index',
            component: App_list,
        },
        {
            path: '/edit',
            component: App_edit,
        },
        {
            path: '/edit/:orderId',
            component: App_edit,
        }
    ],
};
ReactDom.render((
    <Router>{rootRoute}</Router>
), document.getElementById('react-content'));