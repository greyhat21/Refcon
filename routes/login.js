//jshint esversion:10

module.exports = (app, md5, RefconStudent, RefconTeacher) => {
    app.get(["/", "/login"], (req, res) => {
        if(!req.session.user){
            res.render('login', {typerror: "", success: ""});
        }
        else{
            if(req.session.user.type === 'student'){
                console.log(req.session.user);
                res.render('overview');
            }
            else if(req.session.user.type === 'teacher'){
                console.log(req.session.user);
                res.render('overviewt');
            }
        }
    });

    app.post(["/", "/login"], (req, res) => {
        const email = req.body.email;
        const password = md5(req.body.password);
    
        if(!req.session.user){
            RefconStudent.findOne({$and: [{email: email}, {password: password}]}, (err, data) => {
            if(err){
                console.log(err);
            }
            else{
                if(data){                        
                    req.session.user = data;
                    res.render('overview');
                }
                else{
                    RefconTeacher.findOne({$and: [{email: email}, {password: password}]}, (err, data) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            if(data){                
                                req.session.user = data;
                                res.render('overviewt');
                            }
                            else{
                                res.render('login', { typerror: "Incorrect Email ID or password." , success: ""});
                            }            
                        }
                        });
                }            
            }
            });
        }
        else{
            res.render('overview');
        }
        
    });
};