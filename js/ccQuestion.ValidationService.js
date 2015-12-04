"use strict";
(function(){
    ccQuestion.ValidationService = ValidationService;
    function ValidationService(Validators, ErrorReporter){
        var service = {
            validate: validate
        };
        return service;

        function validate(question){
            if(question.isVisible()){
                if(question.isRequired()){
                    validateWithValidator(Validators.getRequiredValidator(), question);
                }
                if(question.restrictions.min() && !ErrorReporter.hasErrorsFor(question.id)){
                    validateWithValidator(Validators.getMinValidator(question), question);
                }
                if(question.restrictions.max() && !ErrorReporter.hasErrorsFor(question.id)){
                    validateWithValidator(Validators.getMaxValidator(question), question);
                }
                if(question.restrictions.getValidator() && !ErrorReporter.hasErrorsFor(question.id)){
                    validateWithValidator(question.restrictions.getValidator(), question);
                }
            }
        }

        function validateWithValidator(validator, question){
            var result = validator.validate(question);
            if(!result.valid){
                ErrorReporter.addError(question.id, result.message);
            }
        }
    }
})();