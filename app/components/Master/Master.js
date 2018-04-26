// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Dimensions, AsyncStorage} from 'react-native'

// - Import Actions
import * as globalActions from './../../actions/globalActions'
import * as authorizeActions from './../../actions/authorizeActions'

// - Import app components
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
            let userId;
            if (stores[0][1]) userId = stores[0][1];
            else userId = null;

            let email;
            if (stores[1][1]) email = stores[1][1];
            else email = null;

            getUserId(userId, email);
        });
    }

    render() {
        return <Router />;
    }
}

// - Map dispatch to props
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