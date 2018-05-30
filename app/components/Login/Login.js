import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text, Image} from 'react-native';
import {CardSection, Button} from 'app/pureComponents';
import {SocialIcon} from 'react-native-elements'
import {TextField} from 'react-native-material-textfield';
import {authorizationActions} from 'app/data/authorization';
import styles from './styles';


export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailInput: '',
            emailInputError: '',
            passwordInput: '',
            passwordInputError: '',
            loading: false,
            isLogin: false,
        }
    }

    componentDidMount() {
    }

    onEmailChange(text) {
        this.setState({
            emailInput: text,
            emailInputError: ''
        })
    }

    onPasswordChange(text) {
        this.setState({
            passwordInput: text,
            passwordInputError: ''
        })
    }

    onLoginButton() {
        const {login} = this.props;
        login()
    }

    onLoginWithFacebookButton() {
        console.log('facebook')
    }

    onLoginWithGoogleButton() {
        console.log('google')
    }

    renderSocialButtons() {
        return <View>
            <SocialIcon
                title='Log In With Facebook'
                button
                type='facebook'
                onPress={this.onLoginWithFacebookButton.bind(this)}
            />

            <SocialIcon
                title='Log In With Google'
                button
                type='google-plus-official'
                onPress={this.onLoginWithGoogleButton.bind(this)}
            />
        </View>
    }

    renderInput() {
        const {emailInput, emailInputError, passwordInput, passwordInputError} = this.state;

        return <View>
            <TextField
                label="Email"
                keyboardType='email-address'
                tintColor="#00bcd4"
                onChangeText={this.onEmailChange.bind(this)}
                value={emailInput}
                error={emailInputError !== ''}
                helperText={emailInputError}
            />
            <View style={{height: 20}}/>
            <TextField
                secureTextEntry
                label="Password"
                tintColor="#00bcd4"
                onChangeText={this.onPasswordChange.bind(this)}
                value={passwordInput}
                error={passwordInputError !== ''}
                helperText={passwordInputError}
            />
        </View>
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
                    {this.renderSocialButtons()}
                    {this.renderInput()}
                </ScrollView>
                <View>{this.renderButton()}</View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: () => dispatch(authorizationActions.dbLogin())
    }
};

const mapStateToProps = ({global}) => {
    const {error, loading} = global;
    return {error, loading}
};


export default connect(mapStateToProps, mapDispatchToProps)(Login)
