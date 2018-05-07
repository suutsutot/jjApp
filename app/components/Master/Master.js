import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Dimensions, AsyncStorage} from 'react-native'

import * as globalActions from './../../actions/globalActions'
import * as authorizeActions from './../../actions/authorizeActions'

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
        AsyncStorage.multiGet(['userId', 'email'], (err, stores) => {

            const [[userId], [email]] = stores;
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
        getUserId: (userId, email) => dispatch(authorizeActions.getUserId(userId, email))
    }
};

const mapStateToProps = ({global}) => {
    const {windowSize} = global;
    return {windowSize}
};

export default connect(mapStateToProps, mapDispatchToProps)(Master)
