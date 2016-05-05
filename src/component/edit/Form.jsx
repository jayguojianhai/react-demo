import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../../config/config';
import {Form,Input,Button,Row,Col,DatePicker,InputNumber,Select,message,Radio} from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
import Header from '../Header';
import MenuBar from '../MenuBar';
import '../App.less';
let FormEdit =React.createClass({
  getInitialState() {
    if(this.props.orderId){
      ajax({
        url: CONFIG.GETFORMINFO,
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
    }
    return {
      data:null,
      loading:false
    };
  },
  gotoList(){
    location.href="#/";
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
            message.success("提交成功");
            this.setState({loading: false});
          }
      });
    },
  render() {
    let data = this.state.data?this.state.data:{};
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    return (
    	<Form horizontal form={this.props.form}>
          <Row>
            <Col span="12">
              <FormItem label="支付宝ID：" labelCol={{span:2}} wrapperCol={{span:12}} hasFeedback>
                <Input
                  {...getFieldProps('userId', {
                    initialValue:data.userId,
                    validate: [{
                      rules: [
                        { required: true ,message: '不能为空！'},
                      ],
                      trigger: ['onBlur', 'onChange'],
                    }]
                })} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="姓名：" labelCol={{span:2}} wrapperCol={{span:12}} hasFeedback>
                <Input
                  {...getFieldProps('userName', {
                    initialValue:data.userName,
                    validate: [{
                      rules: [
                        { required: true ,message: '不能为空！'},
                      ],
                      trigger: ['onBlur', 'onChange'],
                    }]
                })} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="手机号码：" labelCol={{span:2}} wrapperCol={{span:12}} hasFeedback>
                <Input
                  {...getFieldProps('tel', {
                    initialValue:data.tel,
                    rules: [
                        { required: true, message: '请输入手机号码！' },
                        { validator: this.testMobile },
                    ]
                })} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="E-mail：" labelCol={{span:2}} wrapperCol={{span:12}} hasFeedback>
                <Input type="email"
                  {...getFieldProps('email', {
                    initialValue:data.email,
                    validate: [{
                    rules: [
                          {required:true,message:'请输入邮箱地址！'},
                        ],
                        trigger:'onBlur',
                      }, {
                        rules:[
                          {type:'email',message:'请输入正确的邮箱地址！'},
                        ],
                        trigger:['onBlur','onChange'],
                      }]
                })} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="生日：" labelCol={{span:2}} wrapperCol={{span:12}} hasFeedback>
                <DatePicker {...getFieldProps('birthday', {
                  initialValue:data.birthday,
                  rules: [
                    {
                      required: true,
                      type: 'date',
                      message: '你的生日是什么呢?',
                    }, {
                      validator: this.checkBirthday,
                    }
                  ]
                })} />
              </FormItem>
            </Col>
          </Row>
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
FormEdit = createForm()(FormEdit);
export default FormEdit;
