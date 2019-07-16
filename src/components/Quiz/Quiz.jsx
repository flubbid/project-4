import React from 'react';
import { connect } from 'react-redux';
import { getQuiz } from '../../store/actions';
import _ from 'lodash';

class Quiz extends React.Component {
    state = {
        currentQuestion: 0,
        answered: []
    }

    componentWillMount() {
        this.props.getQuiz(this.props.match.params.id);
    }

    handleAnswer(v) {
        const answered = Array.prototype.slice.call(this.state.answered);

        answered[this.state.currentQuestion] = v;

        this.setState({ answered });
    }

    nextQuestion(e) {
        e.preventDefault();

        if (this.state.currentQuestion + 1 === this.props.quiz.questions.length) {
            this.setState({
                showResults: true
            })
            return;
        }

        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
    }

    renderResults() {
        return (
            <div className="card shadow m-auto" style={{ maxWidth: 400, border: 'none' }}>
                <div className="card-header">
                    <h4 className="card-title">Results</h4>
                </div>
                <div className="card-body">
                    {
                        _.map(this.props.quiz.questions, (v, i) => (
                            <p>
                                {i + 1}: {v.question} - {
                                    this.state.answered[i] === _.find(v.answers, { correct: true }).answer
                                        ? <strong className="text-success">Correct</strong>
                                        : <strong className="text-danger">Incorrect</strong>
                                }
                            </p>
                        ))
                    }

                    <div className="text-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();

                                this.setState({
                                    showResults: false,
                                    currentQuestion: 0,
                                    answered: []
                                })
                            }}
                            className="btn btn-block btn-danger">Try again</button>
                    </div>
                </div>
            </div>
        )
    }

    renderQuestion(v) {
        return (
            <div className="card shadow m-auto" style={{ maxWidth: 400, border: 'none' }}>
                <div className="card-header">
                    <h5 className="card-title">
                        {v.question}
                    </h5>
                </div>
                <ul class="list-group list-group-flush text-left">
                    {
                        _.map(v.answers, (v, i) => (
                            <li class="list-group-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" onChange={(e) => this.handleAnswer(e.target.value)} name={`answer`} id={`answer_${i}`} value={v.answer} />
                                    <label class="form-check-label" htmlFor={`answer_${i}`}>
                                        {v.answer}
                                    </label>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <div className="card-body text-center">
                    <button
                        onClick={this.nextQuestion.bind(this)}
                        disabled={!this.state.answered[this.state.currentQuestion]}
                        className="btn btn-block btn-success">Next</button>
                </div>
            </div>
        )
    }

    render() {
        const { quiz } = this.props;

        if (!quiz) {
            return <div className="text-center p-5">Loading..</div>;
        }

        return (
            <div className={'text-center'}>
                <div className="mb-4">
                    <h1>{quiz.name}</h1>
                    <p className="text-muted">{quiz.description}</p>

                    {
                        !this.state.showResults && (
                            <h2 className={'h6'}>Question {this.state.currentQuestion + 1} / {quiz.questions.length}</h2>
                        )
                    }
                </div>

                {
                    this.state.showResults
                        ? this.renderResults()
                        : this.renderQuestion(quiz.questions[this.state.currentQuestion])
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quiz: state.quiz
    }
}

export default connect(mapStateToProps, { getQuiz })(Quiz);