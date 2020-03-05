//jshint esversion:10

module.exports = (app) => {
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if(err){
                res.write("500 Internal Server Error");
            }
            res.redirect("/");
        });
    });
}