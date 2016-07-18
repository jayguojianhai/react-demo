import React from 'react';
import CONFIG from '../../config/config';
import COMMON from '../../common/common';
import {Menu,Icon,Modal} from 'antd';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuBar = React.createClass({
    getInitialState() {
    	let url=CONFIG.GETUMENULIST;
        COMMON.ajax(url,{},(d)=>{
          if(d.statu){
            this.setState({menulist:d.data});
          }else{
            Modal.error({
              title:'提示',
              content: d.message
            })
          }
        });
	    return {
	      current: '0',
	      openKeys: ['sub1'],
	      menulist:[]
	    };
	},
	handleClick(e) {
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
		    return (
		    	<SubMenu key={subMenu.key} title={<span><Icon type="appstore" /><span>{subMenu.title}</span></span>}>
			      	{
				      	subMenu.items?subMenu.items.map(item=>{
				        	return <Menu.Item key={item.key}><Link to={"/"+item.href}>{item.title}</Link></Menu.Item>
				        }):null
			  		}
			    </SubMenu>
			)
			})
    	return (
			<Menu onClick={this.handleClick} openKeys={this.state.openKeys} onOpen={this.onToggle} onClose={this.onToggle} selectedKeys={[this.state.current]} mode="inline">
	      		<Menu.Item key="0"><Link to="/"><Icon type="home" />首页</Link></Menu.Item>
	      		{MenuList}
	        </Menu>
        )
    }    
});
export default MenuBar;