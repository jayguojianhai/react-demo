import React from 'react';
import {Form,Select, Input, Button,message,Row,Col,Collapse } from 'antd';
const Panel = Collapse.Panel;
const Option = Select.Option;
const FormItem = Form.Item;
const Querybar = React.createClass({
    render() {
    	return (
    		<div id="querybar">
		        <Collapse defaultActiveKey="1">
			        <Panel header={'查询条件'} key="1">
			          <Form horizontal className="advanced-search-form">
						  <Row>
						    <Col span="8">
						      <FormItem
						        label="搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						      <FormItem
						        label="较长搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						      <FormItem
						        label="搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						    </Col>
						    <Col span="8">
						      <FormItem
						        label="搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						      <FormItem
						        label="较长搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						      <FormItem
						        label="搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						    </Col>
						    <Col span="8">
						      <FormItem
						        label="搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						      <FormItem
						        label="较长搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						      <FormItem
						        label="搜索名称："
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        <Input placeholder="请输入搜索名称" />
						      </FormItem>
						    </Col>
						  </Row>
						  <Row>
						    <Col className="text-center">
						      <Button type="primary" htmlType="submit">搜索</Button>
						      <Button>清除条件</Button>
						    </Col>
						  </Row>
						</Form>
			        </Panel>
		        </Collapse>
			</div>
        )
    }       
});
export default Querybar;