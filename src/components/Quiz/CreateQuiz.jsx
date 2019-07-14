import React, { Component } from 'react';
import axios from 'axios';

class CreateQuiz extends React.Component {

    constructor(props){
        super(props);

        this.onChangeQuizName = this.onChangeQuizName.bind(this);
        this.onChangeQuizDescription = this.onChangeQuizDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            quiz_name: '',
            quiz_description: '',
        }
    }

        onChangeQuizName(e){
            this.setState({
                quiz_name: e.target.value
            })
        }
        onChangeQuizDescription(e){
            this.setState({
                quiz_description: e.target.value
            })
        }

        onSubmit(e){
            e.preventDefault();

            console.log('Form Submitted')
            console.log(`Quiz Name ${this.state.quiz_name}`);
            console.log(`Quiz Description ${this.state.quiz_description}`);
            
            const newQuiz = {
                description: this.state.quiz_description,
                name: this.state.quiz_name
            }

            axios.post('http://localhost:3001/quiz/add', newQuiz).then(res => console.log(res.data));

            this.setState({
                quiz_name: '',
                quiz_description: '',
            })
        }

    render() {
        return (
            <div style={{margin: 20}}>
                <h3>Create new Quiz</h3>                
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" value={this.state.todo_name} onChange={this.onChangeQuizName}/>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeQuizDescription}/>
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Create Quiz" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }

}

export default CreateQuiz;