import React from 'react';
import {Table,Button} from 'antd';
import CONFIG from '../../config/config';
import COMMON from '../../common/common';
import FormEdit from './Form';
import * as userActions from '../../actions/user';
const App = React.createClass({
  getInitialState() {
    return {
      demoForm:this.props.demoForm,//详情页面配置
      orderId:this.props.orderId,//订单id
      url:this.props.url,
      loading:false
    };
  },
  componentDidMount(){
    if(this.props.orderId){
      this.getData({orderId:this.props.orderId});
    }
  },
  getData(obj){
    let url=this.state.url;
    let that=this;
    COMMON.ajax(url,obj,(d)=>{
      if(d.statu){
        that.setState({data:d.data});
      }else{
        Modal.error({
          title:'提示',
          content: d.message
        })
      }
    });
  },
  handleSubmit(values) {
    let url=this.state.data.submitUrl;
    COMMON.ajax(url,values,(d)=>{
      if(d.statu){
        message.success("提交成功");
        this.setState({data:d.data,loading:false});
        his.setStoreState({data:d.data});
      }else{
        Modal.error({
          title:'提示',
          content: d.message
        })
      }
    },()=>{
      this.setState({loading:false});
    });
  },
  render() {
    return (
      <FormEdit {...this.state} handleSubmit={this.handleSubmit} />
    );
  }
});
export default App;