exports.home = function(req,res){
	if(req.session.user){
		return res.redirect('/dashboard');
	}
	return res.render('home.ejs');
};

exports.login = function(req,res){
	var message ="";
	if(req.session.user){
		res.redirect('/dashboard');
		return;
	}
	if (req.method == "POST"){
		var body = req.body;
		var email = body.email;
		var pass= body.password;
		
		var sql = "SELECT * FROM users WHERE email = '"+email+"' and password = '"+pass+"'";
		db.query(sql,function(err ,results){
		console.log(results);
			if(!err){
				req.session.userId = results[0].id;
				req.session.user = results[0];
			
				return res.redirect("/dashboard");
				}
			else{
				console.log(err);
				message = "Wrong Username or Password";
				return res.render('login.ejs',{message:  message});
				}
			});
	}
	else{
		return res.render('login.ejs',{message : message});
		}
		
};

exports.signup = function(req,res){
	var message ="";
	if(req.session.user){
		return res.redirect('/dashboard');
	}
	if(req.method=="POST"){
		var body = req.body;
		console.log(body);
		var name = body.username;
		var pass = body.password;
		var email = body.email;
		var fname = body.firstname;
		var lname = body.lastname;
	
		var sql = "INSERT INTO users(first_name,last_name,email,user_name,password) VALUES('"+fname+"','"+lname+"','"+email+"','"+name+"','"+pass+"')";
	
		db.query(sql,function(err ,results){
			if(err){
				console.log(err);
				message = "Can't Register right now";
				return res.render('signup.ejs',{message : message});
			}else{
			
				message = "Registered Successfully!";
				return res.redirect("/login");
			}
		});
	}
	else{
		res.render('signup.ejs',{message : message});
	}
};

exports.dashboard = function(req,res){
	var userId = req.session.userId;
	var user = req.session.user;
	if(!userId){
		res.redirect('/login');
		return;
	}
	var sql = "SELECT * FROM users WHERE id = "+userId+"";
	db.query(sql,function(err,results){
		if(err){
		res.redirect('/login');
		}else{
			res.render('dashboard.ejs',{user : user});
		}
	});
};
exports.logout = function(req,res){
	var message = "";
	if(!req.session.user){
		return res.redirect('/login');

	}else{
		req.session.destroy(function(err){
		if(err){
			console.log(err);
			message = "Error Logging Out";
			return res.render('logout.ejs',{message : message});
		}
		else{
			message = "Logged Out Successfully";
			return res.render('logout.ejs',{message : message});
			}
		});
			
		}
};
