import React, {Component} from 'react'
import './hero.css'

export default class Hero extends Component {
    constructor() {
        super()

        this.state = {

        }
    }
    render() {
        return (
            <div className="hero">
                <div className="hero-img">
                    <div className="register-form">
                        <h2>Register Account</h2>
                        <input placeholder="Email" type="text"/>
                        <input placeholder="Name" type="text"/>
                        <input placeholder="Password" type="password"/>
                        <input placeholder="RepeatPassword" type="password"/>
                    </div>
                </div>
            </div>
        )
    }
}