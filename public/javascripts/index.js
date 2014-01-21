$(function(){
	$('#login').click(function(e){
		e.preventDefault();
		window.location.pathname = '/list/'+$('#msg').val();
	});
});