import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header} from 'react-native-elements'

export class HeaderPage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let {title} = this.props;

        return (
            <Header
                backgroundColor='#00bcd4'
                centerComponent={{text: title, style: {color: '#fff'}}}
            />
        )

    }
}

export default connect()(HeaderPage)
