import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState, Dimensions, AsyncStorage} from 'react-native';
import {globalActions} from 'app/data/global';
import {authorizationActions} from 'app/data/authorization';
import {notificationActions} from 'app/data/notification';
import Router from 'app/routes/Router';

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

        const {getUserId, getNewNotifications} = this.props;
        getNewNotifications();
        AsyncStorage.multiGet(['userId', 'email'], (err, stores) => {
            const [[, userId], [, email]] = stores;
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
        windowResize: (height, width) => dispatch(globalActions.changeWindowSize(height, width)),
        getUserId: (userId, email) => dispatch(authorizationActions.getUserId(userId, email)),
        getNewNotifications: () => dispatch(notificationActions.dbGetNotifies())
    }
};

const mapStateToProps = ({global}) => {
    const {windowSize} = global;
    return {windowSize}
};

export default connect(mapStateToProps, mapDispatchToProps)(Master)
