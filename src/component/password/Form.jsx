import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../../config/config';
import {Form,Input,Button,message,Row,Col} from 'antd';
import classNames from 'classnames';
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
  return false;
}
let FormLogin =React.createClass({
  getInitialState() {
    return {
      passBarShow: false, // 是否显示密码强度提示条
      rePassBarShow: false,
      passStrength: 'L', // 密码强度
      rePassStrength: 'L',
    };
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
  handleReset(){
    this.props.form.resetFields();
  },
  getPassStrenth(value, type) {
    if (value) {
      let strength;
      // 密码强度的校验规则自定义，这里只是做个简单的示例
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      if (type === 'pass') {
        this.setState({ passBarShow: true, passStrength: strength });
      } else {
        this.setState({ rePassBarShow: true, rePassStrength: strength });
      }
    } else {
      if (type === 'pass') {
        this.setState({ passBarShow: false });
      } else {
        this.setState({ rePassBarShow: false });
      }
    }
  },
  checkPass(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'pass');

    if (form.getFieldValue('pass')) {
      form.validateFields(['rePass'], { force: true });
    }

    callback();
  },
  checkPass2(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'rePass');

    if (value && value !== form.getFieldValue('pass')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },
  renderPassStrengthBar(type) {
    const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
    const classSet = classNames({
      'ant-pwd-strength': true,
      'ant-pwd-strength-low': strength === 'L',
      'ant-pwd-strength-medium': strength === 'M',
      'ant-pwd-strength-high': strength === 'H',
    });
    const level = {
      L: '低',
      M: '中',
      H: '高',
    };
    return (
      <div>
        <ul className={classSet}>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
          <span className="ant-form-text">
            {level[strength]}
          </span>
        </ul>
      </div>
    );
  },
  render() {
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    const passProps = getFieldProps('pass', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass },
      ],
      onChange: (e) => {
        console.log('你的密码就是这样被盗的：', e.target.value);
      },
    });
    const rePassProps = getFieldProps('rePass', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2,
      }],
    });
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
    	<Form horizontal form={this.props.form}>
        <Row>
            <Col span="8">
              <FormItem label="旧密码：" {...formItemLayout} hasFeedback>
              <Input type="password"
                {...getFieldProps('oldPassword', {
                  validate: [{
                    rules: [
                      { required:true,type:'string',message: '不能为空！'},
                    ],
                    trigger: ['onBlur', 'onChange'],
                  }]
              })} />
            </FormItem>
          </Col>
        </Row>
        <Row>
            <Col span="8">
              <FormItem label="新密码：" {...formItemLayout} hasFeedback>
              <Input type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" id="pass"
                {...passProps} />
            </FormItem>
          </Col>
          <Col span="6">
            {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
          </Col>
        </Row>
        <Row>
            <Col span="8">
              <FormItem label="重复密码：" {...formItemLayout} hasFeedback>
              <Input type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" id="rePass"
                {...rePassProps} />
            </FormItem>
          </Col>
          <Col span="6">
            {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
          </Col>
        </Row>
        <Row>
          <Col span="12" className="text-center">
            <Button className="btn-login" type="primary" onClick={this.handleSubmit}>提 交</Button>
            <Button className="btn-login" type="gohst" onClick={this.handleReset}>重 置</Button>
          </Col>
        </Row>
      </Form>
    );
  }
})
FormLogin = createForm()(FormLogin);
export default FormLogin;
