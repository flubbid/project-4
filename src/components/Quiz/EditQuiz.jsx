import React from 'react';
import { connect } from 'react-redux';
import { getQuizzes, createQuiz, updateQuiz } from '../../store/actions';
import history from '../../utils/history';

class EditQuiz extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeQuizName = this.onChangeQuizName.bind(this);
        this.onChangeQuizDescription = this.onChangeQuizDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            quiz_name: '',
            quiz_description: '',
        }
    }

    componentDidMount() {
        if (this.props.match.params && this.props.match.params.id) {
            if (this.props.location.state) {
                this.setState({
                    editId: this.props.match.params.id,
                    quiz_name: this.props.location.state.name,
                    quiz_description: this.props.location.state.description,
                })
            } else {
                history.replace('/create');
            }
        }
    }

    onChangeQuizName(e) {
        this.setState({
            quiz_name: e.target.value
        })
    }
    onChangeQuizDescription(e) {
        this.setState({
            quiz_description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.editId) {
            this.props.updateQuiz(this.state.editId, {
                description: this.state.quiz_description,
                name: this.state.quiz_name
            })
        } else {
            this.props.createQuiz({
                description: this.state.quiz_description,
                name: this.state.quiz_name
            });
        }

        this.setState({
            quiz_name: '',
            quiz_description: '',
        })

        history.push('/');

        setTimeout(() => {
            this.props.getQuizzes();
        }, 500);
    }

    render() {
        return (
            <div style={{ margin: 20 }}>
                <h3>Create new Quiz</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" value={this.state.quiz_name} onChange={this.onChangeQuizName} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" className="form-control" value={this.state.quiz_description} onChange={this.onChangeQuizDescription} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">{this.state.editId ? 'Save Quiz' : 'Create Quiz'}</button>
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    if (!state.user) {
        history.push('/');
        return {};
    }

    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { createQuiz, updateQuiz, getQuizzes })(EditQuiz);