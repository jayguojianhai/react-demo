import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../../config/config';
import {Table,Button,message,Popconfirm} from 'antd';
import Header from '../Header';
import MenuBar from '../MenuBar';
import QueryBar from '../QueryBar';
import Footer from '../Footer';
import '../App.less';
const App_list = React.createClass({
  getInitialState() {
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
      loading:true,
      selectedRowKeys: [],  // 这里配置默认勾选列
      data:[]
    };
  },
  onSelectChange(selectedRowKeys) {
    //console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },
  handleNew(){
    location.href="#/Edit";
  },
  handleDelete(){
    alert('删除成功');
  },
  render() {
    const columns = [{
        title: '交易ID',
        dataIndex: 'orderId',
        key:'orderId'
      },{
        title: '交易时间',
        dataIndex: 'time',
        key: 'time'
      }, {
        title: '交易类型',
        dataIndex: 'type',
        key:'type',
        filters: [{
          text: '赚钱交易',
          value: '赚',
        }, {
          text: '赔钱交易',
          value: '赔',
        }],
        // 指定确定筛选的条件函数
        // 这里是名字中第一个字是 value
        onFilter: (value, record) => {
          return record.type.indexOf(value) === 0;
        }
      }, {
        title: '交易金额',
        dataIndex: 'money',
        key:'money'
      },{
        title: '操作',
        dataIndex: 'remind',
        key:'remind',
        render:(text, record)=> {
          return (
            <span>
              <a href={"#/Edit/"+record.orderId}>编辑{record.name}</a>
              <span className="ant-divider"></span>
              <Popconfirm title="确定删除吗？" onConfirm={this.handleDelete.bind(this,"btn-delete")}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          );
        }
      }];
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
          <div id="content">
            <div id="left-bar">
              <MenuBar />
            </div>
            <div id="right-bar">
              <QueryBar />
              <div id="toolbar">
                <Button className="btn-new" type="primary" onClick={this.handleNew}>新建</Button>
                <Popconfirm title="确定删除吗？" onConfirm={this.handleDelete.bind(this,"btn-delete")}>
                  <Button>删除</Button>
                </Popconfirm>
              </div>
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered loading={this.state.loading} pagination={pagination} />
            </div>
          </div>
          <Footer />
    	</div>
    );
  }
});
export default App_list;
