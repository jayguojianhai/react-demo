import React from 'react';
import CONFIG from '../../config/config';
import BASE from '../../config/base';
import List from '../list/App';
const App = React.createClass({
  getInitialState() {
    return {
    };
  },
  //<AppList data={this.state.data} loading={this.state.loading} getData={this.getData} handleDelete={this.handleDelete} handleNew={this.handleNew} searchItems={searchItems} toolbar={{delete:true,edit:true}} />
  render() {
    const searchItems=BASE.searchItems;
    let url=CONFIG.GETDATAS;
    return (
    	<List searchItems={searchItems} toolbar={{delete:true,edit:true}} url={url} />
    );
  }
});
export default App
