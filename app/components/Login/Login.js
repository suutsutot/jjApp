import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, View, Text, Image} from 'react-native'
import {CardSection, Button} from './../../layouts'

import styles from './styles'

import * as authorizeActions from './../../actions/authorizeActions'


export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isLogin: false,
        }
    }

    componentDidMount() {}

    onLoginButton() {
        const { login } = this.props;
        login()
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <CardSection style={styles.buttons}>
                    <Button textStyle={styles.buttonText}>
                        Loading ...
                    </Button>
                </CardSection>
            )
        }

        return (
            <CardSection style={styles.buttons}>
                <Button onPress={this.onLoginButton.bind(this)}>
                    Log in
                </Button>
            </CardSection>
        )
    }

    render() {
            return (
                <View style={[styles.container]}>
                    <ScrollView style={styles.auth_content}>
                        <Image
                            style={styles.logo}
                            source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}
                        />
                        <View style={{height: 10}}/>
                        <Text style={styles.logo_title}>JustJoin</Text>
                        <View style={{height: 10}}/>
                    </ScrollView>
                    <View>{this.renderButton()}</View>
                </View>
            )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: () => dispatch(authorizeActions.dbLogin())
    }
};

const mapStateToProps = ({global}) => {
    const {error, loading} = global;
    return {error, loading}
};


export default connect(mapStateToProps, mapDispatchToProps)(Login)