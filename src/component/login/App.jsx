import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../../config/config';
import {Button,message} from 'antd';
import FormLogin from './Form';
import '../style/Login.less';
const Login = React.createClass({
  getInitialState() {
    ajax({
        url: CONFIG.GETDATAS,
        success: (data)=>{
          if(data.statu){
            this.setState({data:data.data,columns:data.columns,loading:false});
          }
        }.bind(this),
        error: ()=>{
          message.error("error");
          this.setState({loading:false});
        }
    });
    return {
      loading:true,
      selectedRowKeys: [],  // 这里配置默认勾选列
      data:[],
      columns:[]
    };
  },
  render() {
    return (
    	<div id="wrap">
          <header id="header">
            <h1 className="logo"></h1>
          </header>
          <div id="content">
            <div id="login-box">
              <div id="login-left"></div>
              <div id="login-split"></div>
              <dl id="login-right">
                <dt>用户登录</dt>
                <dd><FormLogin /></dd>
              </dl>
            </div>
          </div>
          <footer id="footer">
            仁聚汇通
          </footer>
    	</div>
    );
  }
});
export default Login;
