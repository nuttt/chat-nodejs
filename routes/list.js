exports.index = function(req, res){
  res.render('list', { title: req.params.user_id });
};