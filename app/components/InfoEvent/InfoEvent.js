// - Import react components
import React, {Component} from 'react'

import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, ScrollView, ImageBackground} from 'react-native'
import {ListItem} from 'react-native-elements';
import IOSIcon from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons'


// - Import component styles 
import styles from './styles'

export class Events extends Component {

    renderContactHeader = (img) => {
        // const { img } = this.props
        return (
            <View style={styles.headerContainer}>
                <View style={styles.coverContainer}>
                    <ImageBackground
                        source={{
                            uri: img,
                        }}
                        style={styles.coverImage}
                    >
                        {/*<PhotoButton />*/}
                    </ImageBackground>
                </View>
            </View>
        )
    }

    render() {
        const { params } = this.props.navigation.state;
        let event = params.event;
        console.log('event1', event)

        return (
            <View style={styles.mainviewStyle}>
                <ScrollView style={styles.scroll}>
                    <View style={[styles.container, this.props.containerStyle]}>
                        <View style={styles.cardContainer}>
                            <Text>Event page</Text>
                            {this.renderContactHeader(event.backgroundPic)}
                        </View>
                    </View>
                    {/*<View style={styles.productRow}>{this.renderDescription()}</View>*/}
                    {/*<View style={styles.productRow}>{this.renderNavigator()}</View>*/}
                    {/*<View style={styles.productRow}>{this.renderDetail()}</View>*/}
                </ScrollView>
                {/*<View style={styles.footer}>*/}
                    {/*<TouchableOpacity style={styles.buttonFooter}>*/}
                        {/*<Text style={styles.textFooter}>CALL</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<View style={styles.borderCenter} />*/}
                    {/*<TouchableOpacity style={styles.buttonFooter}>*/}
                        {/*<Text style={styles.textFooter}>EMAIL</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    const {uid} = state.authorize;
    const {windowSize} = state.global;
    const userId = uid;
    const events = state.events.info[userId];
    return {
        // avatar: state.user.info && state.user.info[userId] ? state.user.info[userId].pic || '' : '',
        // name: state.user.info && state.user.info[userId] ? state.user.info[userId].firstName || '' : '',
        // tagLine: state.user.info && state.user.info[userId] ? state.user.info[userId].tagLine || '' : '',
        // banner: state.user.info && state.user.info[userId] ? state.user.info[userId].banner || '' : '',
        // // posts: state.post.userPosts ? state.post.userPosts[userId] : {},
        // isAuthedUser: userId === uid,
        // events: events,
        // userId,
        // windowSize

    }
};


export default connect()(Events)