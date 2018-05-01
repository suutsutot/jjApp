// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import {TextField} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Divider} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Button} from './../../../layouts'
import styles from './../styles'

export class FirstStep extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            birthDate: new Date(),
        }
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        // console.log('A date has been picked: ', date);
        this.setState({birthDate: date});
        this._hideDateTimePicker();
    };

    _isValid = () => {
        let {firstName, lastName, birthDate, gender} = this.state;
        if (firstName && lastName && birthDate && gender) {
            return true
        }
        else return false
    };

    nextStep() {

    }

    render() {
        let {firstName, lastName, birthDate} = this.state;

        let gender = [{
            value: 'Male',
        }, {
            value: 'Female',
        }];

        return (
            <View>
                <ScrollView>
                    <View style={styles.description}>
                        <Text>Registration requires a few more details. Please
                            introduce yourself to proceed. This will help us adjust service just for
                            you.</Text>
                    </View>
                    <View>
                        {/*<Text>Change photo</Text>*/}
                        <TextField
                            label='First name'
                            tintColor="#00bcd4"
                            value={firstName}
                            onChangeText={ (firstName) => this.setState({firstName}) }
                        />
                        <TextField
                            label='Last name'
                            tintColor="#00bcd4"
                            value={lastName}
                            onChangeText={ (lastName) => this.setState({lastName}) }
                        />
                        <Dropdown
                            label='Gender'
                            data={gender}
                            onChangeText={ (gender) => this.setState({gender}) }
                        />
                        <View style={{flex: 1, marginTop: 20}}>
                            <Text style={{fontSize: 12, marginBottom: 6}}>Birthday</Text>
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                <Text>{birthDate ? moment(birthDate).format('DD MMMM YYYY') : 'null'}</Text>
                                <Divider style={{backgroundColor: 'grey', marginTop: 8}}/>
                            </TouchableOpacity>
                            <DateTimePicker
                                date={birthDate}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                        <View style={{flex: 1, marginTop: 20}}>
                            <Text style={{fontSize: 12}}>City</Text>
                            <GooglePlacesAutocomplete
                                placeholder='Enter Location'
                                minLength={2}
                                autoFocus={false}
                                returnKeyType={'default'}
                                fetchDetails={true}
                                query={{
                                    key: 'AIzaSyDN_FbRTPoESSu-A2QBbV4hEan_xjb8aPI',
                                    language: 'en',
                                    types: '(cities)'
                                }}
                                styles={{
                                    textInputContainer: {
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0
                                    },
                                    textInput: {
                                        paddingLeft: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        height: 38,
                                        color: '#5d5d5d',
                                        fontSize: 16
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb'
                                    },
                                }}
                                currentLocation={false}
                            />
                            <Divider style={{backgroundColor: 'grey', marginTop: 0}}/>
                        </View>
                    </View>
                </ScrollView>
                {
                    this._isValid() ?
                        <Button style={{marginTop: 15 }} onPress={this.nextStep.bind(this)}>
                            Next
                        </Button>
                        : <Button style={{marginTop: 15, backgroundColor:'gray'}}>Next!</Button>
                }
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
export default connect(mapStateToProps, mapDispatchToProps)(FirstStep)