import React from 'react';
import {Table,Button,Popconfirm,Modal,message,Input} from 'antd';
import COMMON from '../../common/common';
import QueryBar from './QueryBar';
const App_list = React.createClass({
  getInitialState() {
    return {
      searchItems:this.props.searchItems,// 这里配置搜索条内容
      toolbar:this.props.toolbar,
      loading:false,
      selectedRowKeys: [],  // 这里配置默认勾选列
      data:[],
      columns:[],
      url:this.props.url
    };
  },
  componentDidMount(){
    this.getData({});
  },
  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  },
  getData(obj){
    this.setState({loading:true});
    let url=this.state.url;
    COMMON.ajax(url,obj,(d)=>{
      if(d.statu){
        let {columns,toolbar}=this.state;
        if(toolbar){
          let tool={
            "title": "操作",
            "dataIndex": "operation",
            "render":(text,record)=>{
              return (
                <span className='tableList-toolbar-aBtn'>
                  {
                    'edit' in toolbar?(<a key={record.orderId} href={"#/Edit/"+record.orderId}>编辑</a>):null
                  }
                  {
                    'delete' in toolbar?(
                      <Popconfirm title="确定删除吗？" onConfirm={this.handleDelete.bind(this,record.key)}>
                          <a key={record.orderId} href="javascript:;">删除</a>
                      </Popconfirm>
                    ):null
                  }
                </span>
              )
            }
          }
          d.columns.push(tool);
        };
        this.setState({data:d.data,columns:d.columns,loading:false});
      }else{
        Modal.error({
          title:'提示',
          content: d.message
        });
        this.setState({loading:false});
      }
    },()=>{
      message.error("error");
      this.setState({loading:false});
    });
  },
  handleNew(){
    location.href="#/Edit";
  },
  handleDelete(key){
    let data=this.props.getStoreState().data;
    let selectedRowKeys=key?[key]:this.state.selectedRowKeys;
    selectedRowKeys.map((s,i)=>{//提交后台删除数据 完了重新请求数据
      data.map((o,j)=>{
        if(s===o.key){
          data.splice(j,1);
        }
      })
    })
    this.props.setStoreState({data:Object.assign([], this.props.data, data)});
  },
  render() {
    let {columns,data}=this.state;
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
    const {loading,selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const searchItems=this.state.searchItems?this.state.searchItems:undefined;
    return (
    	<div>
        {
          searchItems?(
            <QueryBar searchItems={searchItems} getData={this.getData} />
          ):null
        }
        <div id="toolbar">
          <Button type="primary" onClick={this.handleNew}>新建</Button>
          <Popconfirm title="确定删除吗？" onConfirm={this.handleDelete}>
            <Button>删除</Button>
          </Popconfirm>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered loading={this.state.loading} pagination={pagination} />
    	</div>
    );
  }
});
export default App_list;
