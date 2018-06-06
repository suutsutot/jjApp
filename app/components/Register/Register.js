import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text, Image} from 'react-native';
import {CardSection, Button} from 'app/pureComponents';
import {SocialIcon} from 'react-native-elements';
import {TextField} from 'react-native-material-textfield';
import {authorizationActions} from 'app/data/authorization';
import {trim} from 'lodash';
import styles from './styles';


export class Register extends Component {

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

    redirect(route) {
        this.props.navigation.navigate(route);
    }

    renderSocialButtons() {
        return <View>
            <SocialIcon
                title='Sign Up With Facebook'
                button
                type='facebook'
                style={{height: 40}}
                onPress={this.onLoginWithFacebook.bind(this)}
            />

            <SocialIcon
                title='Sign Up With Google'
                button
                type='google-plus-official'
                style={{height: 40}}
                onPress={this.onLoginWithGoogle.bind(this)}
            />
        </View>
    }

    renderInputs() {
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
                labelHeight={15}
            />
            <TextField
                secureTextEntry
                label="Password"
                tintColor="#00bcd4"
                onChangeText={this.onPasswordChange.bind(this)}
                value={passwordInput}
                error={passwordInputError !== ''}
                helperText={passwordInputError}
                labelHeight={15}
            />
        </View>
    }

    renderRegisterButton() {
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
                <Button onPress={this.onSignUp.bind(this)}>
                    Sign up
                </Button>
            </CardSection>
        )
    }

    renderLoginButton() {
        return <View>
            <Text style={{textAlign: 'center',}}>You already have an account?</Text>
            <CardSection style={styles.buttons}>
                <Button onPress={() => this.redirect('Login')}>
                    Login
                </Button>
            </CardSection>
        </View>

    }

    onLoginWithFacebook() {
        const {loginViaFacebook} = this.props;
        loginViaFacebook();
    }

    onLoginWithGoogle() {
        const {loginViaGoogle} = this.props;
        loginViaGoogle();
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

    onSignUp() {
        const {register} = this.props;
        const {emailInput, passwordInput} = this.state;

        if (trim(emailInput) === '') {
            this.setState({
                emailInputError: 'Field is required.'
            });
            return
        }

        if (trim(passwordInput) === '') {
            this.setState({
                passwordInputError: 'Field is required.'
            });
            return
        }

        register(emailInput, passwordInput)
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
                    <Text style={{textAlign: 'center',}}>or</Text>
                    {this.renderInputs()}
                    <View style={{height: 15}}/>
                    {this.renderRegisterButton()}
                    {this.renderLoginButton()}
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: (email, password) => dispatch(authorizationActions.dbSignUp(email, password)),
        loginViaFacebook: () => dispatch(authorizationActions.dbLoginViaFacebook()),
        loginViaGoogle: () => dispatch(authorizationActions.dbLoginViaGoogle()),
    }
};

const mapStateToProps = ({global}) => {
    const {error, loading} = global;
    return {error, loading}
};


export default connect(mapStateToProps, mapDispatchToProps)(Register)
