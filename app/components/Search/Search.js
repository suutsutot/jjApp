// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {View, Platform} from 'react-native'
import {SearchBar} from 'react-native-elements'

import Header from './../Header'

// - Import component styles 
import styles from './styles'


export class Search extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        // const {loadData} = this.props;
        // loadData()
    }

    componentDidMount() {
    }


    _renderHeaderSearch = props => {
        if (Platform.OS === 'ios') {
            return (
                <SearchBar
                    showLoading
                    platform="ios"
                    cancelButtonTitle="Cancel"
                    placeholder='Search'/>
            )
        }
        else {
            return (
                <SearchBar
                    showLoading
                    platform="android"
                    placeholder='Search'/>
            )
        }
    };

    render() {
        return (
            <View>
                {this._renderHeaderSearch()}
            </View>

        );
    }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        // loadData: () => {
        //     dispatch(userActions.dbGetUserInfo());
        //     dispatch(eventActions.dbGetEventsList());
        //     dispatch(activityActions.dbGetActivitiesList());
        //
        // },
        // clearData: () => {
        //     dispatch(userActions.clearAllData())
        //
        // },
    }

};

const mapStateToProps = ({authorize, global, user, activity}) => {

    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Search)