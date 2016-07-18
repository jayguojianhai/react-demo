import React from 'react';
import { createRootContainer } from '@alipay/roof';
import CONFIG from '../../config/config';
import BASE from '../../config/base';
import AppEdit from '../edit/App_roof';
const App = React.createClass({
  getInitialState() {
    return {
      orderId:this.props.params.orderId//订单id
    };
  },
  render() {
    const orderId=this.state.orderId;
    let url=CONFIG.GETFORMINFO;
    const demoForm=BASE.demoForm;
    return (
    	<AppEdit orderId={orderId} demoForm={demoForm} url={url} />
    );
  }
});
//export default App;
export default createRootContainer({
    data: {}
})(App);