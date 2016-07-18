import React from 'react';
import CONFIG from '../../config/config';
import COMMON from '../../common/common';
import {Icon,Modal,Dropdown,Menu} from 'antd';
import '../style/Header.less';
const Header = React.createClass({
    getInitialState: function() {
        let url=CONFIG.GETUSERNAME;
        COMMON.ajax(url,{},(d)=>{
          if(d.statu){
            this.setState({userName:d.name});
          }else{
            Modal.error({
              title:'提示',
              content: d.message
            })
          }
        });
        return {
            userName:undefined
        }
    },
    render() {
        const menu = (
          <Menu>
            <Menu.Item key="0">
              <a href=".#/Password">修改密码</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="./login.html">退出登录</a>
            </Menu.Item>
          </Menu>
        );
    	return (
            <header id="header">
                <h1 className="logo"></h1>
                <div className="user-info">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#"><i className="iconfont icon-yonghu"></i>{this.state.userName}<Icon type="down" /></a>
                    </Dropdown>
                </div>
            </header>
        )
    }
});
export default Header;