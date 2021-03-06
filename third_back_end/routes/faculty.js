var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/User");
var Faculty = require("../models/faculty");
var middlewareObj = require("../middleware");
var mongoose = require("mongoose");
var Institution = require("../models/institution");
var FacultyProfile = require("../models/facultyProfile");

// when user login, according to the userid to get the information of this faculty
router.get("/:id", middlewareObj.isLoggedIn, function(req, res, next) {
    // console.log("back end req" + req.params.id);
    var id = mongoose.Types.ObjectId(req.params.id);
    Faculty.findOne({"user_id": id}, function(err, faculty){
        if(err){
            console.log(err);
        } else {
        res.send(faculty);
        }
     });

})

// get the institution information of this faculty
router.get("/institution/:id", middlewareObj.isLoggedIn, function(req, res, next) {
    console.log("institution id:" + req.params.id);
    Institution.findById(req.params.id, function(err, foundInstitution) {
        res.send(foundInstitution);
    })
})


router.put("/edit/:id", middlewareObj.isLoggedIn, function(req, res) {
    console.log(req.body);
    
    console.log(req.params.id);
    
    Faculty.findByIdAndUpdate(req.params.id, req.body, function(err, updatedFaculty) {
        if (err) {
            res.send({'message':'something wrong'});
        } else {
            res.send({'message':'successful', 'id': updatedFaculty.user_id});
        }
    });
})
module.exports = router;