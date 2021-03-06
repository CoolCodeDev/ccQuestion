"use strict";
(function(){
    ccQuestion.QuestionBuilder = QuestionBuilder;
    function QuestionBuilder(questionStorage, Question, Options, Restrictions, ValidationService){
        var builder = this;
        function init(){
            builder.id = set('id', builder);
            builder.type = set('type', builder);
            builder.textRoot = set('textRoot', builder);
            builder.defaultAnswer = set('defaultAnswer', builder);
            builder.values = set('values', builder);
            builder.placeholder = set('placeholder', builder);
            builder.onChange = set('onChange', builder);
            builder.visible = set('visible', builder);
            builder.required = set('required', builder);
            builder.validator = set('validator', builder);
            builder.min = set('min', builder);
            builder.max = set('max', builder);
            builder.createQuestion = function(){
                if(!questionStorage.contains(builder.id)){
                    var question = new Question(
                        value(builder.id),
                        value(builder.type),
                        value(builder.textRoot),
                        new Options(value(builder.defaultAnswer)||'', value(builder.visible)||true, value(builder.values)||[], value(builder.placeholder)||'', value(builder.onChange)),
                        new Restrictions(value(builder.required)||false, value(builder.validator), value(builder.min), value(builder.max)),
                        ValidationService
                    );
                    loadAnswer(question);
                    questionStorage.addQuestion(question);
                    init();
                    return question;
                } else {
                    var id = builder.id;
                    init();
                    throw new Error('Duplicate question id: '+id);
                }
            };
        }

        function set(name, builder){
            var setter = function(value){builder[name] = value; return builder;};
            setter.isBuilder = true;
            return setter;
        }

        function value(value){
            if(value && value.isBuilder){
                return undefined;
            } else {
                return value;
            }
        }

        function loadAnswer(question){
            var answer = questionStorage.loadAnswer(question.id);
            question.setAnswer(answer);
            question.options.onChange();
        }

        init();
    }
})();