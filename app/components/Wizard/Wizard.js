// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import {Button} from './../../layouts'

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

import * as activityActions from './../../actions/activityActions'

// - Import component styles
import styles from './styles'
import Header from "./../Header";

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// steps
import FirstStep from './steps/FirstStep'
import SecondStep from './steps/SecondStep'
import ThirdStep from './steps/ThirdStep'


const PAGES = ['FirstPage', 'SecondPage', 'ThirdPage'];

export class Wizard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            birthDate: new Date(),
            isDateTimePickerVisible: false,

            currentPage: 0,
            firstStepDone: false
        }
    }

    componentWillMount() {
        const {getActivities} = this.props;
        getActivities();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }

    renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }

    renderViewPagerPage = (data, index) => {
        if (data === 'FirstPage') return (
            <View>
                <FirstStep data={data}/>
            </View>
        );
        else if (data === 'SecondPage') return (
            <View>
                <SecondStep />
            </View>
        );
        else if (data === 'ThirdPage') return (
            <View>
                <ThirdStep data={data}/>
            </View>
        );
        // return (<View>
        //     <View style={styles.description}>
        //         <Text>Registration requires a few more details. Please
        //             introduce yourself to proceed. This will help us adjust service just for
        //             you.</Text>
        //     </View>
        //     <View style={styles.page}>
        //         <Text>{data}</Text>
        //     </View>
        // </View>)
    };

    render() {
        // const {activitiesList, loading} = this.props;
        // console.log('activitiesList123', activitiesList);
        return (
            <View style={styles.container}>
                <Header title="Welcome to JustJoin!"/>
                <IndicatorViewPager
                    style={{height: 200, flexGrow: 1}}
                    ref={(viewPager) => {
                        this.viewPager = viewPager
                    }}
                    onPageSelected={(page) => {
                        this.setState({currentPage: page.position})
                    }}
                    indicator={this.renderDotIndicator()}
                >
                    {PAGES.map((page, index) => this.renderViewPagerPage(page, index))}
                </IndicatorViewPager>
            </View>
        )
    }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getActivities: () => dispatch(activityActions.dbGetActivitiesList())
    }
};

const mapStateToProps = ({activity}) => {
    console.log('activity555', activity.activitiesList ? activity.activitiesList[0] : '')
    // const {activitiesList, loading} = activity;
    return {
        // activities: activity.activitiesList ? activity.activitiesList[0] : ''
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Wizard)