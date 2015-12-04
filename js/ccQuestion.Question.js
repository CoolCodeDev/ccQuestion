"use strict";
(function(){
    ccQuestion.Question = Question;
    function Question(id, type, textRoot, options, restrictions, ValidationService){
        var question = this;
        question.id = id;
        question.type = type;
        question.textRoot = textRoot;
        question.options = options;
        question.restrictions = restrictions;
        question.isVisible = options.isVisible;
        question.isRequired = restrictions.isRequired;
        question.validate = function(){ValidationService.validate(question)};
        question.setAnswer = function(value){
            if(value instanceof Date){
                //TODO: compensate for timezoneoffset before substringing.
                //if value was created right after midnight and timezoneoffset is negative,
                //the day will be behind by 1 day
                question.answer = value.toISOString().substr(0,10);
            } else {
                question.answer = value;
            }
        };

        question.answer = question.options.getDefaultAnswer();
    }
})();
