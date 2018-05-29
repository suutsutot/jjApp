import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator, ScrollView} from 'react-native';
import {HeaderSection, Button} from 'app/pureComponents';
import {userActions} from 'app/data/user';
import styles from './styles';
import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';


export class Wizard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 0,
        };
    }

    componentWillMount() {
        const {getProfile} = this.props;
        getProfile();
    }

    goToHome = () => {
        this.props.navigation.navigate('Tabs')
    };

    saveUser = (i) => {
        const {updateProfile, userProfile} = this.props;
        updateProfile(userProfile);
        if (i === 1) {
            this.setState({pageIndex: i});
        }
        else {
            this.goToHome()
        }
    };

    renderWizard = () => {
        const {userProfile} = this.props;
        const {pageIndex} = this.state;

        if (pageIndex === 0) return <ScrollView><FirstStep userProfile={userProfile}/></ScrollView>;
        else return <View style={{flex: 1}}><SecondStep userProfile={userProfile}/></View>
    };

    renderFirstButton = () => {
        return <View style={{marginVertical: 20}}>
            <Button onPress={this.saveUser.bind(this, 1)}>
                Next
            </Button>
        </View>
    };

    renderSecondButton = () => {
        return <View style={{marginVertical: 20}}>
            <Button onPress={this.saveUser.bind(this)}>
                Save
            </Button>
        </View>
    };

    renderProcess = () => {
        return <View style={styles.containerProcess}>
            <View>
                <ActivityIndicator size="large" color="#00bcd4"/>
            </View>
        </View>
    };

    render() {
        const {loaded} = this.props;
        const {pageIndex} = this.state;

        return (
            <View style={styles.container}>
                <HeaderSection title="Welcome to JustJoin!"/>
                {loaded ? this.renderWizard() : this.renderProcess()}
                {loaded && pageIndex === 0 ? this.renderFirstButton() : null}
                {pageIndex === 1 ? this.renderSecondButton() : null}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfile: () => {
            dispatch(userActions.dbGetProfile())
        },
        updateProfile: (data, i) => {
            dispatch(userActions.dbUpdateUser(data, i))
        },
    }
};

const mapStateToProps = ({user}) => {
    const {profile, loaded} = user;

    return {
        userProfile: loaded ? profile : {},
        loaded
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Wizard)
