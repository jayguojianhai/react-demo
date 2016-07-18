import React from 'react';
import { Breadcrumb } from 'antd';
import Header from './common/Header';
import MenuBar from './common/MenuBar';
import Footer from './common/Footer';
import './style/App.less';
let currentMenu = ()=>{
  let path = '';

  if(location.hash){
    path = location.hash.split('/')[1].split('?')[0]
  }

  return path || 'index';
}
const App = React.createClass({
  propTypes: {
    children: React.PropTypes.any,
  },
  nameRender(breadcrumbName, route, params){
    console.log(breadcrumbName)
  },
  render() {
    const children = this.props.children;
    return (            
        <div id="wrap">
          <Header />
          <div id="left-bar">
            <MenuBar />
          </div>
          <div id="right-bar">
            <Breadcrumb className="breadcrumb" nameRender={this.nameRender}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>{currentMenu()}</Breadcrumb.Item>
          </Breadcrumb>
            {children}
          </div>
          <Footer />
      </div>
    );
  },
});

export default App;
