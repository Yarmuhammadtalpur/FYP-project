module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }   req.flash("error", "Please log in to view this resources")
        res.redirect('/login')
    }
}