import React, { Component } from 'react'
import './hero.css'
import axios from 'axios'
import swal from 'sweetalert2'

export default class Hero extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            name: '',
            password1: '',
            password2: ''
        }
    }

    async register() {
        const {email, name, password1, password2} = this.state
        if (password1 === password2) {
            const res = await axios.post('/auth/register', {email, name, password: password2})
            console.log(res)
        } else {
            swal.fire({type: 'error', text: `Passwords don't match.`})
        }
    }

    handleChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }

    render() {
        return (
            <div className="hero">
                <div className="hero-img">
                    <div className="register-form">
                        <h2>Register Account</h2>
                        <input value={this.state.email} onChange={e => this.handleChange(e, 'email')} placeholder="Email" type="text" />
                        <input value={this.state.name} onChange={e => this.handleChange(e, 'name')} placeholder="Name" type="text" />
                        <input value={this.state.password1} onChange={e => this.handleChange(e, 'password1')} placeholder="Password" type="password" />
                        <input value={this.state.password2} onChange={e => this.handleChange(e, 'password2')} placeholder="Repeat Password" type="password" />
                        <button onClick={() => this.register()}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}