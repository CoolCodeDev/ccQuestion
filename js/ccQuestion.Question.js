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
                value.setTime(value.getTime() + getTimezoneOffsetCompensation(value));
                question.answer = value.toISOString().substr(0,10);
            } else {
                question.answer = value;
            }
        };

        question.answer = question.options.getDefaultAnswer();
    }

    function getTimezoneOffsetCompensation(date){
        return (Math.abs(date.getTimezoneOffset())/60)*60*60*1000;
    }
})();
