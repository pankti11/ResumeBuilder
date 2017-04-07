/*
*  API for Project schema in mongoose db.
*
* */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var MessageSchema = require('./message.schema.server')(app, mongoose);
    var MessageModel = mongoose.model('Message', MessageSchema);


    var api = {

        createMessage:createMessage,
        findMessageById:findMessageById,
        findMessageByUserId:findMessageByUserId,
        findMessageByRecruiterId:findMessageByRecruiterId,
        updateIsReadForMessage: updateIsReadForMessage
    };

    return api;


    /*
     * createMessage: Creates a new Message in mongo db.
     * returns: promise.
     */

    function createMessage(message) {


        var deferred = q.defer();

        MessageModel.create(message, function (err, dbMessage) {

            if(err){
                logger.error('Unable to create message.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbMessage);
            }

        });

        return deferred.promise;
    }




    /*
     * findMessageById : find message by message id.
     * params: messageId
     * returns: promise
     */
    function findMessageById(messageId) {

        var deferred = q.defer();

        MessageModel.findById(messageId, function (err, dbMessage) {

            if(err){
                logger.error('Unable to find recruiter. Id: ' + messageId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }



    /* find messages by user id.*/
    function findMessageByUserId(userId){
        var deferred = q.defer();

        MessageModel.find({userId:userId}, function (err, dbMessage) {

            if(err){
                logger.error('Unable to find message by user id'  + userId + ". Error: " + err);
                deferred.reject(err);
            } else {

                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }


    /* find messages by recruiter id.*/
    function findMessageByRecruiterId(recruiterId){
        var deferred = q.defer();

        MessageModel.find({recruiterId:recruiterId}, function (err, dbMessage) {

            if(err){
                logger.error('Unable to find message by recruiter id'  + recruiterId + ". Error: " + err);
                deferred.reject(err);
            } else {

                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }



    function updateIsReadForMessage(messageId, isReadBoolean) {
        var deferred = q.defer();

        MessageModel.update({_id: messageId}, {$set: {isRead: isReadBoolean}}, function (err, count) {
           if(err){
               logger.error("Could not update message with id : " + messageId + " Error : " + err);
               deferred.reject(err);
           } else {
               deferred.resolve(count);
           }
        });

        return deferred.promise;
    }

}
