import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TouchableOpacity, View, ScrollView, Image} from 'react-native'
import {CardSection, Button, HeaderSection} from 'app/pureComponents'

import styles from './styles'

import { authorizationActions } from 'app/data/authorization'

export class Settings extends Component {

    onLogoutButton() {
        const {logout} = this.props;
        logout()
    }

    renderProfile = () => {
        return <TouchableOpacity
            style={[styles.TouchableOpacityStyles, styles.backgroundColorContentWhite]}
            onPress={() => {
                this.goToEvent(event._id)
            }}
        >
            <View style={[styles.layoutRow]}>
                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 60, width: 60, borderRadius: 50}} containerStyle={{height: 60, width: 60}}  source={{uri: event.backgroundPic}}/>*/}
                <Image style={{ alignSelf: 'center', height: 60, width: 60, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                {/*<View style={[styles.layoutColumn, styles.leftPaddingText]}>*/}
                    {/*<View style={[styles.layoutRow]}>*/}
                        {/*<Text*/}
                            {/*style={styles.blackColorText}>{event.title ? event.title : event.activity.name}</Text>*/}
                        {/*<Text style={styles.grayColorText}>*/}
                            {/*{' on ' + moment(event.eventDates.startDate).format('Do MMM')}</Text>*/}
                    {/*</View>*/}
                    {/*<View style={[styles.layoutColumn]}>*/}
                        {/*<Text style={styles.grayColorText}>{event.activity.name}</Text>*/}
                        {/*<Text style={[styles.grayColorText]}>{event.participants.length} participants</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}
            </View>
        </TouchableOpacity>
    }

    renderButton() {

        return (
            <CardSection style={styles.buttons}>
                <Button onPress={this.onLogoutButton.bind(this)}>
                    Logout
                </Button>
            </CardSection>
        )
    }

    render() {
        return (
            <View style={styles.profile}>
                <HeaderSection title={'Settings'}/>
                <ScrollView>
                    {this.renderProfile()}
                    <View style={{alignItems: 'center'}}>{this.renderButton()}</View>
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(authorizationActions.dbLogout())
    }
};

const mapStateToProps = ({global}) => {
    const {error, loading, loggedIn} = global;
    return {error, loading, loggedIn}
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
