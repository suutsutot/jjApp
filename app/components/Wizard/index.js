// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'

import Header from './../Header'

// - Import component styles
import styles from './styles'


export class Wizard extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <Header title="Wizard"/>
        )
    }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const mapStateToProps = ({}) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Wizard)