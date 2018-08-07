import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import styles from './styles';



export class UserCommunitiesList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>UserCommunitiesList</Text>
            </View>
        );
    }


}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}

};

const mapStateToProps = ({}) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(UserCommunitiesList)
