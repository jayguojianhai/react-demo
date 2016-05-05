import React from 'react';
import ajax from '@alipay/ajax';
import CONFIG from '../config/config';
import {Menu,Icon,message} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuBar = React.createClass({
    getInitialState() {
    	ajax({
            url: CONFIG.GETUMENULIST,
            success: function(data) {
              if(data.state==="success"){
                this.setState({menulist:data.data});
              }
            }.bind(this),
            error: function(str) {
              message.error("error");
            }
        });
	    return {
	      current: '0',
	      openKeys: ['sub1'],
	      menulist:[]
	    };
	},
	handleClick(e) {
	    console.log('click ', e);
	    this.setState({
	      current: e.key,
	      openKeys: e.keyPath.slice(1)
	    });
	},
	onToggle(info) {
	    this.setState({
	      openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
	    });
	},
    render() {
    	const data=this.state.menulist;
        const MenuList=data.map(subMenu=>{
		   return <SubMenu key={subMenu.key} title={<span><Icon type="appstore" /><span>{subMenu.title}</span></span>}>
			      	{
				      	subMenu.items?subMenu.items.map(item=>{
				        	return <Menu.Item key={item.key}>{item.title}</Menu.Item>
				        }):null
			  		}
			    </SubMenu>
  			}
  		);
    	return (
    		<Menu onClick={this.handleClick} openKeys={this.state.openKeys} onOpen={this.onToggle} onClose={this.onToggle} selectedKeys={[this.state.current]} mode="inline" theme="dark">
	      		<Menu.Item key="0"><Icon type="home" />首页</Menu.Item>
	      		{MenuList}
	        </Menu>
        )
    }       
});
export default MenuBar;