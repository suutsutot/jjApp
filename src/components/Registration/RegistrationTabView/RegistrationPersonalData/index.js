import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import actions from 'src/data/actions';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-date-picker';
class RegistrationPersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    const { changeField, form } = this.props;
    const gender = [{ value: 'male' }, { value: 'female' }];

    return (
      <View>
        <TextField
          label="FirstName"
          tintColor="#00bcd4"
          onChangeText={value => changeField({ firstName: value })}
          value={form.firstName}
          labelHeight={15}
        />
        <TextField
          label="LastName"
          tintColor="#00bcd4"
          onChangeText={value => changeField({ lastName: value })}
          value={form.lastName}
          labelHeight={15}
        />
        <TextField
          label="Location"
          tintColor="#00bcd4"
          onChangeText={value => changeField({ city: value })}
          value={
            form.location.details.country + ', ' + form.location.details.city
          }
          labelHeight={15}
        />
        <Dropdown
          label="Gender"
          data={gender}
          value={form.gender}
          onChangeText={value => changeField({ gender: value })}
        />
        <DatePicker
          date={form.birthday}
          mode='date'
          onDateChange={date => changeField({ birthday: date })}
        />
        <Text>{JSON.stringify(this.props, null, 2)}</Text>
      </View>
    );
  }
}

export default connect(
  ({ registration }) => {
    const { form } = registration;
    return { form };
  },
  dispatch => {
    return {
      changeField: payload =>
        dispatch(actions.registration.changeField(payload))
    };
  }
)(RegistrationPersonalData);
