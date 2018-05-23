import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {HeaderSection} from 'app/pureComponents';
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
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderSection title="Welcome to JustJoin!"/>
                <IndicatorViewPager
                    style={{ flexGrow: 1}}
                    ref={(viewPager) => {
                        this.viewPager = viewPager
                    }}
                    //onPageSelected={(page) => {this.setState({currentPage: page.position})}}
                    //indicator={this.renderDotIndicator()}
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
