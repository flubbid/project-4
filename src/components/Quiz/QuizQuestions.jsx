import React from 'react';
import { connect } from 'react-redux';
import { getQuiz, createQuestion, deleteQuestion } from '../../store/actions';
import _ from 'lodash';
import history from '../../utils/history';

class QuizQuestions extends React.Component {
    state = {
        newQuestion: false,
        question: '',
        answers: []
    }

    componentDidMount() {
        this.setState({
            quiz: this.props.match.params.id
        }, () => {
            this.props.getQuiz(this.state.quiz);
        });
    }

    handleAnswerChange(field, i, v) {
        const answers = Array.prototype.slice.call(this.state.answers);

        answers[i][field] = v;

        this.setState({ answers });
    }

    submit(e) {
        e.preventDefault();

        this.props.createQuestion(this.state.quiz, this.state);

        this.setState({
            newQuestion: false
        });
        setTimeout(()=>{
            this.props.getQuiz(this.state.quiz);
        }, 500
        )
    }

    renderNewQuestion() {
        return (
            <div>
                <form style={{ maxWidth: 600, margin: 'auto', marginTop: 30 }}>
                    <div className="form-group">
                        <label htmlFor="question">Question</label>
                        <input type="text" value={this.state.question} onChange={(e) => this.setState({ question: e.target.value })} className="form-control" />
                    </div>

                    {
                        _.map(this.state.answers, (v, i) => (
                            <div className="form-group" key={i}>
                                <label htmlFor="question">Answer #{i + 1}</label>
                                <div className="form-row align-items-center" key={i}>
                                    <div className="col-10">
                                        <input type="text" value={v.answer} onChange={(e) => this.handleAnswerChange('answer', i, e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" onChange={(e) => this.handleAnswerChange('correct', i, e.target.checked)} checked={v.correct} type="radio" id={`answer_${i}`} name={`answer`} />
                                            <label class="form-check-label" htmlFor={`answer_${i}`}>Correct</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    <div className="text-right">
                        <button
                            onClick={(e) => {
                                e.preventDefault();

                                const answers = Array.prototype.slice.call(this.state.answers);

                                answers.push({ answer: '', correct: false });

                                this.setState({ answers });
                            }}
                            className="btn btn-sm btn-outline-primary mr-2">Add answer</button>
                        <button
                            onClick={this.submit.bind(this)}
                            disabled={!this.state.question || this.state.answers.length <= 1 || !_.find(this.state.answers, { correct: true })}
                            className="btn btn-sm btn-success"
                        >Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    renderQuestions(questions) {
        return (
            questions && questions.length
                ? (
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Number of answers</th>
                                <th>Correct answer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.map(questions, (v, i) => (
                                    <tr key={i}>
                                        <td>{v.question}</td>
                                        <td>{v.answers.length}</td>
                                        <td>{_.find(v.answers, { correct: true }) ? _.find(v.answers, { correct: true }).answer : ''}</td>
                                        <td className={'text-right'}>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    this.props.deleteQuestion(this.state.quiz, v._id);

                                                    setTimeout(() => {
                                                        this.props.getQuiz(this.state.quiz);
                                                    }, 500);
                                                }}
                                                className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
                : (
                    <div className="text-center p-5">
                        No questions
                </div>
                )
        )
    }

    render() {
        const { quiz } = this.props;

        if (!quiz) {
            return <div className="text-center p-5">Loading..</div>;
        }

        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Questions for <strong>{quiz.name}</strong></h1>

                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();

                                this.setState({ newQuestion: !this.state.newQuestion })
                            }}
                            className="btn btn-sm btn-info mr-2">
                            {
                                this.state.newQuestion ? 'Cancel' : 'Add question'
                            }
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();

                                history.push(`/quiz/${this.state.quiz}`)
                            }}
                            className="btn btn-sm btn-success">Start quiz</button>
                    </div>

                </div>

                <div>
                    {
                        this.state.newQuestion ? this.renderNewQuestion() : this.renderQuestions(quiz.questions)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quiz: state.quiz
    }
}

export default connect(mapStateToProps, { getQuiz, createQuestion, deleteQuestion })(QuizQuestions);