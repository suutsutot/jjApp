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
import { isFieldNotValid } from 'src/data/registration/selector';

import styles from './styles';

class RegistrationPersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  render() {
    const {
      changeField,
      validateField,
      changeTabIndex,
      personalDataForm: {
        firstName,
        lastName,
        birthday,
        gender,
        location,
        language
      },
      data,
      personalDataValidation
    } = this.props;
    const genderData = [{ value: i18n('male') }, { value: i18n('female') }];

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
              value={firstName}
              labelHeight={15}
              onBlur={() => validateField(['firstName'])}
              error={
                personalDataValidation.indexOf('firstName') !== -1 &&
                isFieldNotValid(firstName)
                  ? i18n('first_name_required')
                  : null
              }
            />
            <TextField
              label={i18n('last_name')}
              tintColor="#00bcd4"
              onChangeText={value => changeField({ lastName: value })}
              value={lastName}
              labelHeight={15}
              onBlur={() => validateField(['lastName'])}
              error={
                personalDataValidation.indexOf('lastName') !== -1 &&
                isFieldNotValid(lastName)
                  ? i18n('last_name_required')
                  : null
              }
            />
            <View style={styles.dateView}>
              <TouchableOpacity
                onPress={() => this.setState({ isDateTimePickerVisible: true })}
              >
                {birthday ? (
                  <View style={styles.birthdayView}>
                    <Text style={styles.birthdayText}>
                      {i18n('date_of_birthday')}
                    </Text>
                    <Text style={styles.birthdayDate}>
                      {moment(birthday).format('l')}
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
              data={genderData}
              value={gender}
              labelHeight={15}
              onChangeText={value => changeField({ gender: value })}
            />
            <TextField
              label={i18n('choose_location')}
              tintColor="#00bcd4"
              onChangeText={value => changeField({ location: value })}
              value={location}
              labelHeight={15}
            />
            <Dropdown
              label={i18n('language')}
              data={data.languages}
              value={language}
              labelHeight={15}
              onChangeText={value => changeField({ language: value })}
            />
            <View style={styles.nextButton}>
              <LoadingButton title="NEXT" onPress={() => changeTabIndex(2)} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  ({ registration }) => {
    const { personalDataForm, data, personalDataValidation } = registration;
    return { personalDataForm, data, personalDataValidation };
  },
  dispatch => {
    return {
      changeField: payload =>
        dispatch(actions.registration.changeField('personalDataForm', payload)),
      validateField: payload =>
        dispatch(
          actions.registration.validateField('personalDataValidation', payload)
        ),
      changeTabIndex: payload =>
        dispatch(actions.registration.changeTabIndex(payload))
    };
  }
)(RegistrationPersonalData);
