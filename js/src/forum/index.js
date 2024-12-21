import app from 'flarum/app';
import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';
import MCQQuestion from './components/MCQQuestion';
import QuestionParser from './QuestionParser';

app.initializers.add('your-name/mcq-quiz', () => {
    extend(CommentPost.prototype, 'content', function(vnode) {
        if (!vnode.children || !vnode.children.length) return;

        const content = vnode.children[0].text;
        if (!content) return;

        const questions = QuestionParser.parse(content);
        if (!questions.length) return;

        // 替换原始内容
        vnode.children = questions.map(question => 
            <MCQQuestion question={question} />
        );
    });
}); 