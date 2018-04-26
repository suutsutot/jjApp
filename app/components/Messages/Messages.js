// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'

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


    render() {
        // const {state, activities} = this.props;
        // state.tabs.routes[0].count = activities.length;

        return (
            <Header title={'Messages'}  />
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

    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Search)