import React, {Component} from 'react'
import CartGames from './CartGames'

export default class Cart extends Component {
    constructor() {
        super()

        this.state = {

        }
    }
    render() {
        return (
            <div className="cart">
                Cart
                <CartGames />
            </div>
        )
    }
}