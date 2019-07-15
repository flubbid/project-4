import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { connect } from 'react-redux';
import { login } from '../../store/actions';

import history from '../../utils/history';

class LoginPage extends Component {

    state = {
        email: '',
        pw: ''
    };

    handleChange = (e) => {
        this.setState({
            // Using ES2015 Computed Property Names
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        this.props.login(this.state);
    }

    render() {
        return (
            <div className="LoginPage">
                {
                    !!this.props.error && (
                        <div className="alert alert-danger">
                            {this.props.error}
                        </div>
                    )
                }
                <header className="header-footer">Log In</header>
                <form
                    className="form-horizontal"
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.handleSubmit()
                    }} >
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
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

export default connect(mapStateToProps, { login })(LoginPage);