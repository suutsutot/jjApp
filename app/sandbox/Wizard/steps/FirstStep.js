import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Divider} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {userActions} from 'app/data/user/index';
import styles from '../styles';


export class FirstStep extends Component {

    constructor(props) {
        super(props);

        this.state = {
            birthDate: new Date(),
        }
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        const {userProfile} = this.props;
        userProfile.birthday = moment(date).toISOString();
        this.updateUser(userProfile);
        this._hideDateTimePicker();
    };

    handleLocation = (location) => {
        const {userProfile} = this.props;
        userProfile.location = location;
        this.updateUser(userProfile);
    };

    updateUser = (data) => {
        const {updateProfile} = this.props;
        updateProfile(data)
    };

    render() {
        const {userProfile} = this.props;
        userProfile.birthday = moment(userProfile.birthday).toDate();

        let {birthDate} = this.state;

        let gender = [{
            value: 'male',
        }, {
            value: 'female',
        }];

        return (
            <ScrollView style={{marginHorizontal: 10}}>
                <View>
                    <View style={styles.description}>
                        <Text>Registration requires a few more details. Please
                            introduce yourself to proceed. This will help us adjust service just for
                            you.</Text>
                    </View>
                    <View>
                        <TextField
                            label='First name'
                            tintColor="#00bcd4"
                            value={userProfile.firstName}
                            onChangeText={ (firstName) => {
                                userProfile.firstName = firstName;
                                this.updateUser(userProfile)
                            }}
                        />
                        <TextField
                            label='Last name'
                            tintColor="#00bcd4"
                            value={userProfile.lastName}
                            onChangeText={ (lastName) => {
                                userProfile.lastName = lastName;
                                this.updateUser(userProfile)
                            }}
                        />
                        <Dropdown
                            label='Gender'
                            data={gender}
                            value={userProfile.gender}
                            onChangeText={ (gender) => {
                                userProfile.gender = gender;
                                this.updateUser(userProfile)
                            }}
                        />
                        <View style={{flex: 1, marginTop: 20}}>
                            <Text style={{fontSize: 12, marginBottom: 6}}>Birthday</Text>
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                <Text>{userProfile.birthday ? moment(userProfile.birthday).format('DD MMMM YYYY') : 'null'}</Text>
                                <Divider style={{backgroundColor: 'grey', marginTop: 8}}/>
                            </TouchableOpacity>
                            <DateTimePicker
                                date={userProfile.birthday ? userProfile.birthday : birthDate}
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
                                getDefaultValue={() => userProfile.location && userProfile.location.string ? userProfile.location.string : ''}
                                onPress={(data, details = null) => {

                                    let location = {
                                        string: details.formatted_address,
                                        details: {
                                            placeId: data.place_id ? data.place_id : null,
                                            city: data && data.structured_formatting && data.structured_formatting.main_text ? data.structured_formatting.main_text : null,
                                            state: data && data.structured_formatting && data.structured_formatting.secondary_text ? data.structured_formatting.secondary_text : null,
                                            country: data && data.structured_formatting && data.structured_formatting.secondary_text ? data.structured_formatting.secondary_text : null,
                                            geo: [details.geometry.location.lat, details.geometry.location.lng],
                                            lng: details.geometry.location.lng,
                                            lat: details.geometry.location.lat,
                                        }
                                    };
                                    this.handleLocation(location)
                                }}
                            />
                            <Divider style={{backgroundColor: 'grey', marginTop: 0}}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProfile: (data) => {
            dispatch(userActions.dbUpdateUser(data))
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(FirstStep)
