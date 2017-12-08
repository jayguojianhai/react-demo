import '../common/lib';
import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';
import App from '../component/App';
import Index from '../component/index/App';
import Task from '../component/task/App';
import App_edit from '../component/task/Edit';
import PassWord from '../component/password/App';
import Roof from '../component/roof/Edit';
// dev2分支修改
const rootRoute = {
    component: App,
    childRoutes: [//路由配置
      {
          path: '/',
          onEnter(nextState, replaceState) {
              replaceState(null, '/index');
          },
      },
      {
          path: '/index',
          component: Index,
      },
      {
         path: '/task',
         component:Task, 
      },
      {
          path: '/edit',
          component: App_edit,
      },
      {
          path: '/edit/:orderId',
          component: App_edit,
      },
      {
          path: '/password',
          component: PassWord,
      },{
         path: '/roof',
         component:Roof, 
      }
  ],
};
ReactDom.render((
    <Router>{rootRoute}</Router>
), document.getElementById('react-content'));