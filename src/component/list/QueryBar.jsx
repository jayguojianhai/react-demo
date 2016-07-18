import React from 'react';
import COMMON from '../../common/common';
import {Form,Select,Input,Button,message,Row,Col,Collapse,DatePicker} from 'antd';
const Panel = Collapse.Panel;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
let Querybar =React.createClass({
	getInitialState() {
	    return {
	      searchItems:this.props.searchItems
	    };
	},
	handleReset(e) {
	    e.preventDefault();
	    this.props.form.resetFields();
	},
	handleSubmit() {
      	this.props.form.validateFields((errors, values) => {
	        if (!!errors) {
	        	return;
	        }else{
	        	for(var key in values){
	        		if(values[key] instanceof Date){//如果是时间类型的 转换成 XXXX-XX-XX
	        			values[key]=COMMON.changeDateToString(values[key],false);
	        		}
	        	}
	      		this.props.getData(values);
	        }
	    });
  	},
    render() {
    	const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    	let searchItems=this.state.searchItems;
    	let searchList=[];
    	searchItems.items.map((item)=>{
    		let oneItem;
    		switch(item.htmlType){
    			case "input":
    				oneItem=<FormItem key={item.key} label={item.name+"："}>
						<Input {
				        	...getFieldProps(item.key, {
					            rules: [
					                {required:item.valids.required,type:item.valids.validType,message:'不能为空！'}
					            ]
					    })} />
		        	</FormItem>;
			        break;
			    case "select":
			    	let options=[];
			    	if(item.options){
			    		item.options.map((option)=>{
				    		options.push(<Option key={option.value} value={option.value}>{option.name}</Option>)
				    	})
			    	}
			    	oneItem=<FormItem key={item.key} label={item.name+"："}>
						<Select style={{width:80}} {
				        	...getFieldProps(item.key, {
					            rules: [
					                {required:item.valids.required,message: '不能为空！'}, 
					            ]
					    	})}>
					    	{options}
				        </Select>
		        	</FormItem>;
			        break;
			    case "date":
			    	oneItem=<FormItem key={item.key} label={item.name+"："}>
						<DatePicker 
	                      {...getFieldProps(item.key, {
	                        rules: [
	                          {required:item.valids.required,type:item.valids.validType,message: '不能为空！'}
	                        ]
	                      })} />
		        	</FormItem>;
			        break;
			    default :
			    	break;
    		}
    		searchList.push(oneItem);
    	});
    	return (
    		<div id="querybar">
		        <Collapse defaultActiveKey="1">
			        <Panel header={'查询条件'} key="1">
				        <Form inline className="advanced-search-form" form={this.props.form}>
							{searchList}
							<Row style={{marginTop:20}}>
							    <Col className="text-center">
							      	<Button type="primary" onClick={this.handleSubmit}>搜索</Button>
							      	<Button onClick={this.handleReset}>清除条件</Button>
							    </Col>
						  </Row>
						</Form>
			        </Panel>
		        </Collapse>
			</div>
        )
    }       
});
Querybar = createForm()(Querybar);
export default Querybar;