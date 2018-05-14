import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Dimensions, AsyncStorage} from 'react-native'
import * as globalActions from './../../actions/globalActions'
import { authorizationActions } from 'app/data/authorization'

import socket from 'app/config/socketStore'

import Router from './../../routes/Router'

export class Master extends Component {

    constructor(props) {
        super(props);


    }

    resize = ({window}) => {
        const {windowResize} = this.props;
        windowResize(window.height, window.width)
    };

    componentDidMount() {
        Dimensions.addEventListener('change', this.resize);
        const window = Dimensions.get('window');
        this.resize({window});

        const {getUserId} = this.props;
        AsyncStorage.multiGet(['userId', 'email', 'idToken'], (err, stores) => {

            const [[, userId], [, email], [, idToken]] = stores;
            socket(idToken)
            getUserId(userId, email);
        });
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.resize);
    }

    render() {
        return <Router />;
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        windowResize: (height, width) => {
            dispatch(globalActions.changeWindowSize(height, width))
        },
        getUserId: (userId, email) => dispatch(authorizationActions.getUserId(userId, email))
    }
};

const mapStateToProps = ({global}) => {
    const {windowSize} = global;
    return {windowSize}
};

export default connect(mapStateToProps, mapDispatchToProps)(Master)
