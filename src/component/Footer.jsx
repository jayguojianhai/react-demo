import React from 'react';
const Footer = React.createClass({
    getInitialState: function() {
        return {userData:this.props.userData}
    },
    render() {
    	return (
            <footer id="footer"></footer>
        );
    }       
});
export default Footer;