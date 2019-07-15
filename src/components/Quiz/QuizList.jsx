import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/NavBar'


const Quiz = props => (
    <tr>
        <td>{props.quiz.name}</td>
        <td>{props.quiz.description}</td>
        <td>
            <Link to={'/edit/'+props.quiz._id}>Edit</Link>
        </td>
    </tr>
)

class QuizList extends React.Component{

    constructor(props){
        super(props);
        this.state = {quiz: []};
    }

    componentDidMount(){
        axios.get('http://localhost:3001/quiz/').then(response => {
            this.setState({quiz: response.data})
        })
        .catch(function(error){
            console.log(error);
        })
    }

    quizList(){
        return this.state.quiz.map(function(currentQuiz, i){
            return <Quiz quiz={currentQuiz} key={i} />;
        });
    }

    render(){
        return (
            <div>
            <NavBar user={this.props.user} handleLogout={this.props.handleLogout}/>
            <h3>Quiz List:</h3>
            <table className="table table-striped" style={{margin: 20}}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {this.quizList()}
            </tbody>

            </table>
            </div>
        )
    }

}

export default QuizList;