//jshint esversion:10

module.exports = (app) => {

    app.get('/overviewt', (req, res) => {
        if(!req.session.user){
            res.render('login', { typerror: "You haven't logged in or your're session might have ended" , success: ""});
        }
        else{
            if(req.session.user.type === 'student'){
                res.render('overview');
            }
            else if(req.session.user.type === 'teacher'){
                res.render('overviewt');  
            }
        }
    });
    
    app.get('/overview', (req, res) =>{
        if(!req.session.user){
            res.render('login', { typerror: "You haven't logged in or your're session might have ended" , success: ""});
        }
        else{
            if(req.session.user.type === 'student'){
                res.render('overview');
            }
            else if(req.session.user.type === 'teacher'){
                res.render('overviewt');  
            }
        }
    });

};