"use strict";
(function(){
    ccQuestion.QuestionService = QuestionService;
    function QuestionService(QuestionBuilder, Question, Options, Restrictions, ValidationService, QuestionStorage){
        var service = {
            getQuestionBuilder: getQuestionBuilder,
            getQuestion: getQuestion
        };

        return service;

        function getQuestionBuilder(){
            return new QuestionBuilder(QuestionStorage, Question, Options, Restrictions, ValidationService);
        }

        function getQuestion(id){
            return QuestionStorage.getQuestion(id);
        }
    }
})();