// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    ScrollView,
    View,
    Text
} from 'react-native'
import {ListItem} from 'react-native-elements';
import Header from './../Header'

// - Import component styles 
import styles from './styles'


export class Notifications extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
    }

    componentDidMount() {
    }


    render() {
        const {notifications} = this.props;
        console.log('notifications123', notifications);

        return (
        <View>
            <Header title={'Notifications'}  />
            <ScrollView>
                    {
                        notifications.map((notification, i) => (
                            <ListItem
                                key={i}
                                title={notification._id}
                                // leftIcon={{ name: item.icon }}
                            />
                        ))
                    }
            </ScrollView>
        </View>

        );
    }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {

    return {}

};

const mapStateToProps = (state, ownProps) => {

    let notifications;
    if (state.notifications.loaded && state.notifications.userNotifies) notifications = state.notifications.userNotifies;

    return {
        notifications: notifications ? notifications : []
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)