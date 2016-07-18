export function updateUserForm(payload, { setState, getState }) {
  let obj={};
  for(let key in payload){
  	obj[key]=payload[key].value;
  }
  setState({
    data: Object.assign(getState().data, obj),
  });
}