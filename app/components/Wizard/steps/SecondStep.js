// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, ScrollView, TextInput,ListView} from 'react-native'
import  {ListItem} from 'react-native-elements'

import styles from './../styles'

export class SecondStep extends Component {

    constructor(props) {
        super(props)

        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(props.activities),
            text:'',
            activities: props.activities
        }
    }

    componentWillMount() {
        console.log('------------ USER PROFILE -------------------');
    }

    componentWillRecieveProps({ activities }) {
        this.setState({ activities });
    }

    onLearnMore = (rowData) => {
        this.props.navigation.navigate('Details', { ...rowData });
    };
    renderRow(rowData){
        console.log('rowData', rowData);

        if (rowData)
        return(
            <ListItem
                key={rowData.id}
                roundAvatar
                avatar={{ uri: rowData.location }}
                title={`${rowData.name.toUpperCase()}`}
                // subtitle={rowData.email}
                // onPress={() => this.onLearnMore(rowData)}
            />
        );
        // else return(
        //     <Text>123</Text>
        // );
    }
    filterSearch(text){
        const newData = this.props.activities.filter(function(item){
            const itemData = item.email.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.description}>
                    <Text> Tell us about sports activities you would like to manage. We will search events and users for
                        you that match your selected items. Do you play basketball with friends? Can you play tennis? Or
                        maybe you would like to be invited to try sea kayaking?</Text>
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        onChangeText={(text) => this.filterSearch(text)}
                        value={this.state.text}
                    />
                    <ListView
                        enableEmptySections={true}
                        style={{marginHorizontal:10}}
                        renderRow={this.renderRow.bind(this)}
                        dataSource={this.state.dataSource}
                    />
                </View>
            </ScrollView>
        )

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('dispatch444', dispatch)
    console.log('ownProps444', ownProps)
    return {}
};

const mapStateToProps = (state, ownProps) => {
    if (state && state.activity && state.activity.loading && state.activity.activitiesList) console.log('state.activity' ,state.activity.activitiesList);
    else console.log('netu');
    return {
        activities: state.activity.loading && state.activity.activitiesList ? state.activity.activitiesList : {}
    }
};

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(SecondStep)