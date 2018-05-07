import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Animated, ScrollView, View, Text, Image, ImageBackground, Platform} from 'react-native'
import {TabViewAnimated, TabBar, TabViewPagerScroll, TabViewPagerPan} from 'react-native-tab-view'
import {SocialIcon, ListItem} from 'react-native-elements'

import styles from './styles'

import * as userActions from './../../actions/userActions'

import Header from './../Header'

export class Profile extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        tabs: {
            index: 0,
            routes: [
                {key: '1', title: 'Activities', count: '0'},
                {key: '2', title: 'Events', count: '0'},
                {key: '3', title: 'Following', count: '0'},
                {key: '4', title: 'Followers', count: '0'},
            ],
        },
    };

    renderContactHeader = () => {
        const {avatar, avatarBackground, name, address: {city, country}} = this.props;

        return (
            <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={{
                    uri: avatarBackground,
                }}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.userRow}>
                        <Image
                            style={styles.userImage}
                            source={{
                                uri: avatar,
                            }}
                        />
                        <View style={styles.userNameRow}>
                            <Text style={styles.userNameText}>{name}</Text>
                        </View>
                        <View style={styles.userPlaceRow}>
                            <Text style={styles.userPlaceText}>{city}, {country}</Text>
                        </View>
                    </View>
                    <View style={styles.socialRow}>
                        <View>
                            <SocialIcon
                                style={styles.iconSize}
                                iconSize={12}
                                type='facebook'
                                onPress={() => console.log('facebook')}
                            />
                        </View>
                        <View style={styles.socialIcon}>
                            <SocialIcon
                                style={styles.iconSize}
                                iconSize={20}
                                type='google-plus-official'
                                onPress={() => console.log('google')}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    };

    _renderScene = ({route: {key}}) => {
        const {activities} = this.props;

        switch (key) {
            case '1':
                return <View containerStyle={{marginBottom: 20}}>
                    {
                        activities.map((activity, i) => (
                            <ListItem
                                // avatar={{source: {uri: activitiesList ? activitiesList[activity.type].location : ''}}}
                                key={i}
                                title={activity.name}
                                subtitle={activity.level ? activity.level : 'none'}
                            />
                        ))
                    }
                </View>;
            case '2':
                return <Text>2</Text>;
            case '3':
                return <Text>3</Text>;
            case '4':
                return <Text>4</Text>;
            case '5':
                return <Text>5</Text>;
            default:
                return <View />
        }
    };

    _renderPager = props => {
        return Platform.OS === 'ios' ? (
            <TabViewPagerScroll {...props} />
        ) : (
            <TabViewPagerPan {...props} />
        )
    };

    _renderLabel = props => ({route, index}) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(
            inputIndex => (inputIndex === index ? 'black' : 'gray')
        );
        const color = props.position.interpolate({
            inputRange,
            outputRange,
        });

        return (
            <View>
                <Animated.Text style={[styles.tabLabelText, {color}]}>
                    {route.count}
                </Animated.Text>
                <Animated.Text style={[styles.tabLabelNumber, {color}]}>
                    {route.title}
                </Animated.Text>
            </View>
        )
    };

    _renderHeader = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={styles.indicatorTab}
                renderLabel={this._renderLabel(props)}
                pressOpacity={0.8}
                style={styles.tabBar}
            />
        )
    };

    _handleIndexChange = index => {
        this.setState({
            tabs: {
                ...this.state.tabs,
                index,
            },
        })
    };

    render() {
        const {name} = this.props;

        return (
            <ScrollView style={styles.scroll}>
                <Header title={name}/>
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        {this.renderContactHeader()}
                        <TabViewAnimated
                            style={styles.tabContainer}
                            navigationState={this.state.tabs}
                            renderScene={this._renderScene}
                            renderPager={this._renderPager}
                            renderHeader={this._renderHeader}
                            onIndexChange={this._handleIndexChange}
                        />
                    </View>
                </View>
            </ScrollView>
        )

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        loadUserProfile: (userId) => {
            dispatch(userActions.dbGetUserInfo(userId))
        },
    }

};

const mapStateToProps = (state, ownProps) => {
    const loaded = state.user.loaded;

    let profile = {};
    if (loaded) profile = state.user.profile;

    return {
        name: loaded && profile && profile.firstName && profile.lastName ? profile.firstName + ' ' + profile.lastName : profile.email,
        avatar: loaded && profile ? profile.pic : '',
        avatarBackground: loaded && profile ? profile.backgroundPic : '',
        address: {
            city: loaded && profile && profile.location && profile.location.details ? profile.location.details.city : '',
            country: loaded && profile && profile.location && profile.location.details ? profile.location.details.country : '',
        },
        activities: loaded && profile ? profile.activities : [],
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile)