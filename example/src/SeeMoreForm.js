import React from 'react'
import axios from 'axios'

export default class SeeMoreForm extends React.Component {
    render() {
        return (
            <div>
                <input type="text" onFocus={this.props.onFocus} onBlur={this.props.onBlur} />
            </div>
        )
    }
}