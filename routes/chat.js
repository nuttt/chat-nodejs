exports.index = function(req, res){
  res.render('chat', { title: req.params.user_id + " - " + req.params.group_id });
};