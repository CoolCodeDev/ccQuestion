"use strict";
(function(){
    ccQuestion.ErrorReporter = ErrorReporter;
    function ErrorReporter(){
        var errors = {};
        var messages = [];
        var service = {
            addError: addError,
            getErrors: getErrors,
            hasErrorsFor: hasErrorsFor,
            clearErrors: clearErrors
        };

        return service;

        function addError(id, message){
            errors[id] = message;
            messages.push(message)
        }

        function getErrors(){
            return errors;
        }

        function hasErrorsFor(id){
            return !! errors[id];
        }

        function clearErrors(){
            errors = {};
            messages = [];
        }
    }
})();