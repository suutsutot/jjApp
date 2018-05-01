// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import  {Avatar} from 'react-native-elements'

import Icon from 'react-native-vector-icons/Ionicons';

// - Import API
import ActivitiesAPI from './../../../api/ActivitiesAPI'


export class SecondStep extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activitiesList: {},
            pageWidth: Dimensions.get('window').width,
            pageHeight: Dimensions.get('window').height,
            searchText: null,
            selected: []
        };
    }

    componentWillMount() {
        ActivitiesAPI.getActivities().then((act) => {
            this.setState({activitiesList: act});
        });
    }

    componentDidMount = () => {
        // !!! get user activities and check list on 'selected'

        // const selected = this.props.selected;
        // if(typeof selected === "object"){
        //     selected.map(select => {
        //         this._onSelect(select)
        //     })
        // } else {
        //     this._onSelect(selected)
        // }
    };

    _onSelect = (item) => {
        let selected = this.state.selected;

        if (selected.indexOf(item) === -1) {
            selected.push(item);
            this.setState({
                selected: selected
            })
        } else {
            selected = selected.filter(i => i !== item);
            this.setState({
                selected: selected
            })
        }
    };

    getNewDimensions(event) {
        let pageHeight = event.nativeEvent.layout.height;
        let pageWidth = event.nativeEvent.layout.width;
        this.setState({pageHeight, pageWidth})
    };

    _onSearch = (text) => {
        this.setState({
            searchText: text.length > 0 ? text.toLowerCase() : null
        })
    };

    _isSelected = (item) => {
        const selected = this.state.selected;
        if (selected.indexOf(item) === -1) {
            return false
        }
        return true
    };

    filterObjectByValue = (obj, predicate) => {
        return Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce((res, key) => (res[key] = obj[key], res), {})
    };

    renderList() {
        const {activitiesList} = this.state;
        let list;
        let labels;

        if (activitiesList) {
            list = this.state.searchText ? this.filterObjectByValue(activitiesList, activity => activity.name.toLowerCase().includes(this.state.searchText)) : activitiesList;
            labels = Object.keys(list).map(i => list[i]);

            return <ScrollView style={{padding: 5}}>
                {labels.map((label, index) => {
                    const itemKey = label;
                    return (
                        <TouchableOpacity
                            key={Math.round(Math.random() * 1000000)}
                            style={{
                                padding: 7,
                                marginTop: 0,
                                marginLeft: 2,
                                marginRight: 2,
                                marginBottom: 6,
                                height: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this._onSelect(itemKey)
                            }}
                        >

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Avatar source={{uri: label.location}}/>
                                <Text style={{paddingLeft: 10}}>{label.name}</Text>
                            </View>


                            {
                                this._isSelected(itemKey) ?
                                    <Icon name='ios-checkmark-circle-outline'
                                          style={{
                                              color: '#00bcd4',
                                              fontSize: 30
                                          }}
                                    />
                                    : null
                            }
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        }
        else {
            return null
        }
    };

    render() {
        return (
            <View onLayout={(evt) => {
                this.getNewDimensions(evt)
            }}>
                <View style={{flexDirection: 'row', height: 55}}>
                    <View style={{marginTop: 15, marginLeft: 15, backgroundColor: 'transparent'}}>
                        <Icon name="ios-search-outline" color='#00bcd4' size={25}/>
                    </View>
                    <TextInput
                        style={{
                            width: this.state.pageWidth - 20,
                            height: 35,
                            margin: 0,
                            marginTop: 10,
                            marginLeft: -25,
                            padding: 5,
                            paddingLeft: 30,
                            borderColor: '#00bcd4',
                            borderWidth: 1,
                            borderRadius: 5
                        }}
                        onChangeText={(text) => {
                            this._onSearch(text)
                        }}
                        clearButtonMode={'always'}
                        placeholder="Search"
                        placeholderTextColor='#00bcd4'
                        underlineColorAndroid={'transparent'}
                    />
                </View>

                {this.renderList()}

            </View>

        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const mapStateToProps = (state, ownProps) => {
    return {}
};

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(SecondStep)