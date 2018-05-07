import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, ScrollView} from 'react-native'

import styles from './../styles'

export class ThirdStep extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        let {data} = this.props;

        return (
            <ScrollView>
                <View style={styles.description}>
                    <Text>Registration requires a few more details. Please
                        introduce yourself to proceed. This will help us adjust service just for
                        you.</Text>
                </View>
                <View style={styles.page}>
                    <Text>{data}</Text>
                </View>
            </ScrollView>
        )

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep)