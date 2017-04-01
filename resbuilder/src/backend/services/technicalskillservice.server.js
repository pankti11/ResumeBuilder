/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/technicalskill", createTechnicalSkill);
    
    app.get("/api/technicalskill/:technicalSkillId", findTechnicalSkillById);
    app.get("/api/technicalskill/user/:userId", findTechnicalSkillForUser);
    app.put("/api/technicalskill/:technicalskillId", updateTechnicalSkill);
    app.delete("/api/technicalskill/:technicalskillId", deleteTechnicalSkill);



    var TechnicalSkillModel = mongooseAPI.technicalSkillModelAPI;

    
    
    
    /*
     *  Handlers
     */

    
    

    /*
     * Handler for POST call /api/technicalskill
     */
    function createTechnicalSkill(req, res) {

        var technicalSkill = req.body;

        if(null == technicalSkill){
            req.sendStatus(500).send("null/empty technical skill.");
            return;
        }


        // create user in db.
        TechnicalSkillModel.createTechnicalSkill(technicalSkill)
            .then(function (dbTechnicalSkill){

                if(null == dbTechnicalSkill){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbTechnicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        
    }
    



    /*
     *
     * Handler for find technical skill by id.
     *
     */
    function findTechnicalSkillById(req, res) {

        var technicalSkillId = req.params.technicalSkillId;

        if(technicalSkillId == null){
            res.sendStatus(500).send("null technicalSkillId.");
            return;
        }

        TechnicalSkillModel.findTechnicalSkillById(technicalSkillId)
            .then(function (technicalSkill) {

                if(null == technicalSkill){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(technicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }





    function findTechnicalSkillForUser(req, res) {
        
        var userId = req.params.userId;
        
        if(null == userId){
            res.sendStatus(500).send("null/empty userId");
            return;
        }
        


        TechnicalSkillModel.findTechnicalSkillForUser(userId)
            .then(function (technicalSkill) {
                if(null == technicalSkill){
                    res.sendStatus(500).send("can not find technical skill for user.");
                } else{
                    res.send(technicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    
    



    /*
     *
     * Handler for update user PUT call.
     */
    function updateTechnicalSkill(req, res) {

        var techicalSkill = req.body;
        var technicalSkillId = req.params.technicalskillId;

        if(null == techicalSkill){
            res.sendStatus(500).send("null/empty technicalSkill for update.");
            return;
        }

        TechnicalSkillModel.updateTechnicalSkill(technicalSkillId, techicalSkill)
            .then(function (dbTechnicalSkill) {

                if(null == dbTechnicalSkill){
                    res.sendStatus(500).send("Could not update technical skill.");
                } else {
                    res.send(techicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }




    /*
     * Handler for delete user DELETE call.
     */
    function deleteTechnicalSkill(req, res) {

        var technicalSkill = req.params.technicalskillId;

        if(null == technicalSkill){
            res.sendStatus(404);
            return;
        }

        TechnicalSkillModel.deleteTechnicalSkill(technicalSkill)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}