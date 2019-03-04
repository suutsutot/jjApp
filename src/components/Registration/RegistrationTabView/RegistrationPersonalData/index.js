import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';

import LoadingButton from 'src/pureComponents/Button/LoadingButton';
import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';

import styles from './styles';
class RegistrationPersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  render() {
    const { changeField, changeTabIndex, form, data } = this.props;
    const gender = [{ value: i18n('male') }, { value: i18n('female') }];

    return (
      <View style={styles.view}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.generalInformationView}>
              <Text style={styles.generalInformationText}>
                {i18n('general_information')}
              </Text>
            </View>
            <TextField
              label={i18n('first_name')}
              tintColor="#00bcd4"
              onChangeText={value => changeField({ firstName: value })}
              value={form.firstName}
              labelHeight={15}
            />
            <TextField
              label={i18n('last_name')}
              tintColor="#00bcd4"
              onChangeText={value => changeField({ lastName: value })}
              value={form.lastName}
              labelHeight={15}
            />
            <View style={styles.dateView}>
              <TouchableOpacity
                onPress={() => this.setState({ isDateTimePickerVisible: true })}
              >
                {form.birthday ? (
                  <View style={styles.birthdayView}>
                    <Text style={styles.birthdayText}>
                      {i18n('date_of_birthday')}
                    </Text>
                    <Text style={styles.birthdayDate}>
                      {moment(form.birthday).format('l')}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.chooseDateText}>
                    {i18n('choose_date_birthday')}
                  </Text>
                )}
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={date => {
                  changeField({ birthday: date });
                  this.setState({ isDateTimePickerVisible: false });
                }}
                onCancel={() =>
                  this.setState({ isDateTimePickerVisible: false })
                }
              />
            </View>
            <Dropdown
              label={i18n('gender')}
              data={gender}
              value={form.gender}
              labelHeight={15}
              onChangeText={value => changeField({ gender: value })}
            />
            <TextField
              label={i18n('choose_location')}
              tintColor="#00bcd4"
              onChangeText={value => changeField({ location: value })}
              value={form.location}
              labelHeight={15}
            />
            <Dropdown
              label={i18n('language')}
              data={data.languages}
              value={form.language}
              labelHeight={15}
              onChangeText={value => changeField({ language: value })}
            />
            <View style={styles.nextButton}>
              <LoadingButton title="NEXT" onPress={() => changeTabIndex(1)} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  ({ registration }) => {
    const { form, data } = registration;
    return { form, data };
  },
  dispatch => {
    return {
      changeField: payload =>
        dispatch(actions.registration.changeField(payload)),
      changeTabIndex: payload =>
        dispatch(actions.registration.changeTabIndex(payload))
    };
  }
)(RegistrationPersonalData);