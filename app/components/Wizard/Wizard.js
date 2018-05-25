import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {HeaderSection} from 'app/pureComponents';
import {userActions} from 'app/data/user';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import styles from './styles';
import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';
const PAGES = ['FirstPage', 'SecondPage'];


export class Wizard extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     currentPage: 0,
        // };
    }

    componentWillMount() {
        const {getProfile} = this.props;
        getProfile();
    }

    // componentWillReceiveProps(nextProps, nextState) {
    //     if (nextState.currentPage !== this.state.currentPage) {
    //         if (this.viewPager) {
    //             this.viewPager.setPage(nextState.currentPage)
    //         }
    //     }
    // }

    // renderDotIndicator() {
    //     return <PagerDotIndicator selectedDotStyle={{backgroundColor: '#00bcd4', width: 7, height: 7}} pageCount={2}/>;
    // }

    renderViewPagerPage = (data, index) => {
        const {userProfile} = this.props;
        if (data === 'FirstPage') return (
            <View>
                <FirstStep userProfile={userProfile}/>
            </View>
        );
        else if (data === 'SecondPage') return (
            <View>
                <SecondStep />
            </View>
        );
    };

    renderWizard = () => {
        return <IndicatorViewPager
            style={{ flexGrow: 1}}
            ref={(viewPager) => {
                this.viewPager = viewPager
            }}
            horizontalScroll={false}
            //onPageSelected={(page) => {this.setState({currentPage: page.position})}}
            //indicator={this.renderDotIndicator()}
        >
            {PAGES.map((page, index) => this.renderViewPagerPage(page, index))}
        </IndicatorViewPager>

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

        return (
            <View style={styles.container}>
                <HeaderSection title="Welcome to JustJoin!"/>
                {loaded ? this.renderWizard() : this.renderProcess()}

            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfile: () => {dispatch(userActions.dbGetProfile())},
    }
};

const mapStateToProps = ({user}) => {
    const {profile, loaded} = user;

    let userProfile = {
        firstName: null,
        lastName: null,
        gender: null,
        birthday: null,
        location: null
    };

    if (loaded) userProfile = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
        birthday: profile.birthday,
        location: profile.location
    };

    console.log('qeddw', userProfile)

    return {
        userProfile,
        loaded
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Wizard)
