// - Import react components
import React, {Component} from 'react'

import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import {List, ListItem} from 'react-native-elements';
import IOSIcon from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons'


// - Import component styles 
import styles from './styles'

/**
 * Create component class
 *
 * @export
 * @class Login
 * @extends {Component}
 */
export class Events extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        const {navigate} = navigation;
        return {
            title: "Events",
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <IOSIcon name="ios-menu" size={30} style={{color: 'white'}}/>
                </TouchableOpacity>
            ),
            headerStyle: {paddingRight: 10, paddingLeft: 10, backgroundColor: '#00bcd4'},
            headerTintColor: 'white',

            // header: false
        }
    };

    render() {
        const {avatar, name, tagLine, banner, windowSize, events} = this.props;

        // console.log('events123', events);
        const list = [
            {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Vice President'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            },
            {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Vice President'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            },
            {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Vice President'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            }
        ];

        return (
            <View style={styles.profile}>
                <ScrollView>
                    <Text>Events</Text>
                    <List containerStyle={{marginBottom: 20}}>
                        {
                            events.joined.map((l, i) => (
                                <ListItem
                                    roundAvatar
                                    avatar={{uri: l.backgroundPic}}
                                    key={i}
                                    title={l.title}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        )
    }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
    // console.log('state123', state.events.events);

    const {uid} = state.authorize;
    const {windowSize} = state.global;
    const userId = uid;
    const events = state.events.info[userId];
    return {
        avatar: state.user.info && state.user.info[userId] ? state.user.info[userId].pic || '' : '',
        name: state.user.info && state.user.info[userId] ? state.user.info[userId].firstName || '' : '',
        tagLine: state.user.info && state.user.info[userId] ? state.user.info[userId].tagLine || '' : '',
        banner: state.user.info && state.user.info[userId] ? state.user.info[userId].banner || '' : '',
        // posts: state.post.userPosts ? state.post.userPosts[userId] : {},
        isAuthedUser: userId === uid,
        events: events,
        userId,
        windowSize

    }
};

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps)(Events)


