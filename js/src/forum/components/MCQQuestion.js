import Component from 'flarum/Component';
import Button from 'flarum/components/Button';

export default class MCQQuestion extends Component {
    oninit(vnode) {
        super.oninit(vnode);
        this.answered = false;
        this.selectedAnswer = null;
        this.isCorrect = false;
    }

    view() {
        const {question} = this.attrs;

        return (
            <div className="mcq-question">
                <div className="mcq-header">
                    <h3>{question.title}</h3>
                    <div className="mcq-knowledge-point">{question.knowledgePoint}</div>
                </div>
                
                <div className="mcq-content">
                    <div className="mcq-question-text">{question.questionText}</div>
                    
                    <div className="mcq-options">
                        {question.options.map((option, index) => (
                            <Button
                                className={this.getOptionClassName(index)}
                                onclick={() => this.selectAnswer(index)}
                                disabled={this.answered}
                            >
                                {`${String.fromCharCode(65 + index)}) ${option}`}
                            </Button>
                        ))}
                    </div>
                </div>

                {this.answered && (
                    <div className="mcq-result">
                        <div className={`mcq-feedback ${this.isCorrect ? 'correct' : 'incorrect'}`}>
                            {this.isCorrect ? '回答正确！' : '回答错误！'}
                        </div>
                        <div className="mcq-explanation">
                            <div className="mcq-correct-answer">
                                <strong>正确答案：</strong> {question.correctAnswer}
                            </div>
                            <div className="mcq-reference">
                                <strong>原文依据：</strong> {question.reference}
                            </div>
                            <div className="mcq-explanation-text">
                                <strong>解析：</strong> {question.explanation}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    getOptionClassName(index) {
        if (!this.answered) return 'mcq-option';
        
        const isSelected = this.selectedAnswer === index;
        const isCorrect = String.fromCharCode(65 + index) === this.attrs.question.correctAnswer;
        
        return `mcq-option ${isSelected ? 'selected' : ''} ${
            this.answered ? (isCorrect ? 'correct' : isSelected ? 'incorrect' : '') : ''
        }`;
    }

    selectAnswer(index) {
        this.selectedAnswer = index;
        this.answered = true;
        this.isCorrect = String.fromCharCode(65 + index) === this.attrs.question.correctAnswer;
        m.redraw();
    }
} 