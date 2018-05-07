import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

import styles from './styles'
import Header from "./../Header";

import FirstStep from './steps/FirstStep'
import SecondStep from './steps/SecondStep'
import ThirdStep from './steps/ThirdStep'


const PAGES = ['FirstPage', 'SecondPage', 'ThirdPage'];

export class Wizard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
        };
    }

    componentWillMount() {
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
    };

    render() {
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const mapStateToProps = ({user}) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Wizard)