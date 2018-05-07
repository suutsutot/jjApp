import React, {Component} from 'react'
import {connect} from 'react-redux'

import Header from './../Header'

import styles from './styles'


export class Search extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Header title={'Messages'}/>
        );
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {

    return {}

};

const mapStateToProps = ({authorize, global, user, activity}) => {

    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Search)