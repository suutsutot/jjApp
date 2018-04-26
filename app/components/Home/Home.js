// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'

import Header from './../Header'

// - Import Actions
import * as userActions from './../../actions/userActions'
import * as notifyActions from './../../actions/notifyActions'
import * as eventActions from './../../actions/eventActions'
import * as activityActions from './../../actions/activityActions'

// - Import component styles 
import styles from './styles'


export class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {loadData} = this.props;
        loadData();
    }

    componentDidMount() {
    }

    renderEventList = () => {
        const {events} = this.props;
        console.log('events123', events);

        return <View>
            {
                events.map((event, i) => (
                    <ListItem
                        key={i}
                        title={event.title ? event.title : event.activity.name}
                        leftIcon={{name: event.backgroundPic}}
                    />
                ))
            }
        </View>;
    };

    render() {
        return (
            <View>
                <Header title='Events'/>
                {this.renderEventList()}
            </View>
            )


    }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        loadData: () => {
            dispatch(userActions.dbGetProfile());
            // dispatch(notifyActions.dbGetNotifies());
            dispatch(eventActions.dbGetEventsList());
            // dispatch(activityActions.dbGetActivitiesList());

        },
    }

};

const mapStateToProps = ({events}) => {
    const {info, loading} = events;

    return {
        events: loading && info ? info : [],
        loading
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home)