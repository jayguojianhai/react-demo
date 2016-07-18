module.exports = {
  // Mock 数据返回
  'GET /users': [{name:'sorrycc'}, {name:'pigcan'}],
  'GET /users/1': {name:'jaredleechn'},

  // Mock 数据，基于 mockjs
  'GET /users': require('mockjs').mock({
    success: true,
    data: [{name:'@Name'}],
  }),

  // 通过自定义函数替换请求
  '/custom-func/:action': function(req, res) {
    res.json({
      action: req.params.action,
      query: req.query,
    });
  },
};