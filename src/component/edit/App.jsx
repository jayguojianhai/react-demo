import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../../config/config';
import {Table,Button,message} from 'antd';
import Header from '../Header';
import MenuBar from '../MenuBar';
import FormEdit from './Form';
import Footer from '../Footer';
import '../App.less';
const App_list = React.createClass({
  getInitialState() {
    this.setState({loading:true});
    ajax({
        url: CONFIG.GETDATAS,
        success: function(data) {
          if(data.state==="success"){
            this.setState({data:data.data,loading:false});
          }
        }.bind(this),
        error: function(str) {
          message.error("error");
          this.setState({loading:false});
        }
    });
    return {
      loading:false,
      selectedRowKeys: [],  // 这里配置默认勾选列
      orderId:this.props.params.orderId,//订单id
      data:[]
    };
  },
  start() {
    this.setState({ loading: true });
    // 模拟 ajax 请求，完成后清空
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  },
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },
  render() {
    const data = this.state.data;
    const pagination = {
      total: data.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      }
    };
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
    	<div id="wrap">
          <Header />
          <div id="left-bar">
            <MenuBar />
          </div>
          <div id="right-bar">
            <FormEdit orderId={this.state.orderId} />
          </div>
          <Footer />
    	</div>
    );
  }
});
export default App_list;
