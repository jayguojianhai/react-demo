import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../config/config';
import {Icon,message} from 'antd';
import './Header.less';
const Header = React.createClass({
    getInitialState: function() {
        ajax({
            url: CONFIG.GETUSERNAME,
            success: function(data) {
              if(data.state==="success"){
                this.setState({userName:data.name});
              }
            }.bind(this),
            error: function(str) {
              message.error("error");
            }
        });
        return {
            userName:undefined
        }
    },
    render() {
    	return (
            <header id="header">
                <h1 className="logo"></h1>
                <ul className="user-info">
                    <li><i className="iconfont icon-yonghu"></i>{this.state.userName}</li>
                    <li><i className="iconfont icon-shuxian"></i></li>
                    <li><a href="#">退出</a></li>
                </ul>
            </header>
        )
    }       
});
export default Header;