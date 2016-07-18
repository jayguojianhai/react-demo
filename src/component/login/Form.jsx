import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../../config/config';
import {Form,Input,Button,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
let FormLogin =React.createClass({
  handleSubmit(e) {
      e.preventDefault();
        this.props.form.validateFields((errors, values) => {
          if (!!errors) {
            return;
          }else{
            location.href='./index.html';
          }
      });
    },
  render() {
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    return (
    	<Form horizontal form={this.props.form}>
        <FormItem hasFeedback>
          <Input placeholder='用户名' size="large"
            {...getFieldProps('userName', {
              validate: [{
                rules: [
                  { required:true,type:'string',message: '不能为空！'},
                ],
                trigger: ['onBlur', 'onChange'],
              }]
          })} />
        </FormItem>
        <FormItem hasFeedback>
          <Input placeholder='密码' size="large"
            {...getFieldProps('passWord', {
              validate: [{
                rules: [
                  { required: true,type:'string' ,message: '不能为空！'},
                ],
                trigger: ['onBlur', 'onChange'],
              }]
          })} />
        </FormItem>
        <Button className="btn-login" type="primary" onClick={this.handleSubmit}>登 录</Button>
      </Form>
    );
  }
})
FormLogin = createForm()(FormLogin);
export default FormLogin;
