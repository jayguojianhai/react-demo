import React from 'react';
import {Form,Input,Button,Row,Col,DatePicker,InputNumber,Select,message,Radio,Modal} from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
import COMMON from '../../common/common';
let FormEdit =React.createClass({
  getInitialState() {
    return {
      demoForm:this.props.demoForm,
      loading:this.props.loading
    };
  },
  componentWillReceiveProps(props){
      this.setState({
        loading:props.loading
      });
  },
  gotoList(){
    location.href="#/index";
  },
  handleChange(name,obj){

  },
  testMobile(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        setTimeout(() => {
          if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i.test(value))
      {
        callback([new Error('抱歉，手机号码不合法。')]);
          } else {
            callback();
          }
        }, 200);
      }
  },
  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()) {
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
    }
  },
  handleSubmit(e) {
    e.preventDefault();
      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }else{
          this.setState({loading:true});
          for (var key in values) {
            if(values[key] instanceof Date){
              values[key]=COMMON.changeDateToString(values[key],true);
            }
          }
          this.props.handleSubmit(values);
        }
    });
  },
  render() {
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6 },
    };
    let data = this.props.data;
    let formItems=this.state.demoForm.items;
    let formItemList=[];
    formItems.map((item)=>{
      let oneItem;
      switch(item.htmlType){
        case "input":
          let inputProps;
          if(item.valids.validType==='string'){
            inputProps=getFieldProps(item.key, {
              initialValue:data&&data[item.key]?data[item.key]:"",
              rules: [{
                required:item.valids.required,
                type:item.valids.validType,
                message:'不能为空！'}]
            })
          }else if(item.valids.validType==='email'){
            inputProps=getFieldProps(item.key, {
              initialValue:data&&data[item.key]?data[item.key]:"",
              validate: [{
                rules: [{required:true,message:'请输入邮箱地址！'}],
                trigger:['onBlur','onChange'],
              },{
                rules:[{type:'email',message:'请输入正确的邮箱地址！'}],
                trigger:['onBlur','onChange'],
              }]
            })
          }else if(item.valids.validType==='tel'){
            inputProps=getFieldProps(item.key, {
              initialValue:data&&data[item.key]?data[item.key]:"",
              rules: [
                { required: true, message: '请输入手机号码！' },
                { validator: this.testMobile },
              ]
            })
          }
          oneItem=<FormItem key={item.key} {...formItemLayout} label={item.name+"："}>
            <Input name={item.key} {...inputProps} />
          </FormItem>;
          break;
        case "select":
          let options=[];
          if(item.options){
            item.options.map((option)=>{
              options.push(<Option key={option.value} value={option.value}>{option.name}</Option>)
            })
          }
          oneItem=<FormItem key={item.key} {...formItemLayout} label={item.name+"："}>
            <Select style={{width:80}} {
              ...getFieldProps(item.key, {
                  initialValue:data&&data[item.key]?data[item.key]:"",
                  onChange:this.handleChange.bind(this,"select"),
                  rules: [
                      {required:item.valids.required,message: '不能为空！'}, 
                  ]
              })}>
              {options}
            </Select>
          </FormItem>;
          break;
        case "date":
          oneItem=<FormItem key={item.key} {...formItemLayout} label={item.name+"："}>
              <DatePicker 
                {...getFieldProps(item.key, {
                  initialValue:data&&data[item.key]?new Date(data[item.key]):null,
                  onChange:this.handleChange.bind(this,"date"),
                  rules: [
                    {required:item.valids.required,type:item.valids.validType,message: '不能为空！'}
                  ]
              })} />
            </FormItem>;
            break;
        default :
          break;
      }
      formItemList.push(oneItem);
    });
    return (
    	<Form horizontal form={this.props.form}>
          {formItemList}
          <Row>
            <Col span="12" className="text-center">
                <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>提交</Button>
                <Button onClick={this.gotoList}>返回</Button>
            </Col>
          </Row>
        </Form>
    );
  }
})
// FormEdit = createForm()(FormEdit);
// export default FormEdit;
export default createForm({
  mapPropsToFields(props) {
    return props.data;
  },
  onFieldsChange(props, fields) {
    props.userActions.updateUserForm(fields);
  },
})(FormEdit);