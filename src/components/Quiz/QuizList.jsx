import React from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes, deleteQuiz } from '../../store/actions';
import history from '../../utils/history';

import { connect } from 'react-redux';


class QuizList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { quiz: [] };
    }

    componentDidMount() {
        this.props.getQuizzes();
    }

    render() {
        return (
            <div>
                <h3>Quiz List:</h3>

                {
                    this.props.quizzes && this.props.quizzes.length
                        ? (
                            <table className="table table-striped" style={{ margin: 20 }}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.quizzes.map((v, i) => (
                                            <tr>
                                                <td>{v.name}</td>
                                                <td>{v.description}</td>
                                                <td className='text-right'>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            history.push(`/edit/${v._id}`, v)
                                                        }}
                                                        className="btn btn-sm btn-info mr-2"
                                                    >Edit</button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();


                                                            this.props.deleteQuiz(v._id);

                                                            setTimeout(() => {
                                                                this.props.getQuizzes();
                                                            }, 1000);
                                                        }}
                                                        className="btn btn-sm btn-danger"
                                                    >Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        )
                        : (
                            <div className="text-center p-5">
                                You don't have any quizzes.
                        </div>
                        )
                }

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state);

    return {
        user: state.user,
        quizzes: state.quizzes,
        error: state.quizError
    }
}

export default connect(mapStateToProps, { getQuizzes, deleteQuiz: (data) => deleteQuiz(data) })(QuizList);