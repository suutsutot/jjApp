import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, ScrollView} from 'react-native'
import {CardSection, Button} from './../../layouts'

import Header from './../Header'

import styles from './styles'

import * as authorizeActions from './../../actions/authorizeActions'

export class Settings extends Component {

    onLogoutButton() {
        const {logout} = this.props;
        logout()
    }

    renderButton() {
        const {navigation} = this.props;

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
                <Header title={'Settings'}/>
                <ScrollView>
                    <View>{this.renderButton()}</View>

                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(authorizeActions.dbLogout())
    }
};

const mapStateToProps = ({global}) => {
    const {error, loading, loggedIn} = global;
    return {error, loading, loggedIn}
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)