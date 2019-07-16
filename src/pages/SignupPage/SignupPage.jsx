import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/actions';
import { Link } from 'react-router-dom';
import history from '../../utils/history';

class SignupPage extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.props.signup(this.state);
    }

    isFormInvalid() {
        return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
    }

    render() {
        return (
            <div>
                {
                    !!this.props.error && (
                        <div className="alert alert-danger">
                            {this.props.error}
                        </div>
                    )
                }
                <header className="header-footer">Sign Up</header>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);

    if (state.user) {
        console.log('redirected');

        history.push('/');

        return {};
    }

    return {
        user: state.user,
        error: state.loginError
    }
}

export default connect(mapStateToProps, { signup })(SignupPage);