import React, {Component} from 'react';

import {Text, View, TouchableWithoutFeedback} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Button} from "react-native-elements";

const iconColor = '#cfd8dc';

class NestedEventsList extends Component {

    state = {
        isOpened: false
    };

    handleShowEvents = () => {
        this.setState({
            isOpened: !this.state.isOpened
        })
    };

    hideMenu = (id) => {
        this['menu_' + id].hide();
    };

    showMenu = (id) => {
        this['menu_' + id].show();
    };

    renderEventsList = () => {
        const {events} = this.props;

        return (
            <View style={{marginTop: 24}}>
                {
                    events.map((event, i) => (
                        <View style={styles.repeatedEventList}>
                            <View key={i} style={styles.repeatedEventItem}>
                                <View style={styles.dateString}>
                                    <MaterialCommunityIcons name="calendar-range" size={20} color={iconColor}/>
                                    <Text
                                        style={[styles.cardHeader, styles.textMargin]}>{moment(event.eventDates.startDate).format('D MMMM')}</Text>
                                </View>
                                <View style={styles.dateString}>
                                    <MaterialIcons name="access-time" size={20} color={iconColor}/>
                                    <Text
                                        style={[styles.cardHeader, styles.textMargin]}>{moment(event.eventDates.startDateTime).add(3, 'hour').format('H:mm') + ' at ' + moment(event.eventDates.startDateTime).format('dddd')}</Text>
                                </View>
                                {
                                    event.isJoined ?

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: 25
                                        }}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Menu
                                                    ref={(eventMenu) => {
                                                        this['menu_' + i] = eventMenu
                                                    }}
                                                    button={<Text
                                                        onPress={this.showMenu.bind(this, i)}>Joined</Text>}
                                                >
                                                    <MenuItem onPress={this.hideMenu.bind(this, i)}>Joined</MenuItem>
                                                    <MenuItem onPress={this.hideMenu.bind(this, i)}>Attend</MenuItem>
                                                    <MenuItem onPress={this.hideMenu.bind(this, i)}>No,
                                                        thanks</MenuItem>
                                                    <MenuDivider/>
                                                </Menu>
                                                <MaterialCommunityIcons name='menu-down' size={20} color={iconColor}/>
                                            </View>
                                            <Button
                                                title='INVITE FRIENDS'
                                                buttonStyle={styles.inviteButton}
                                                titleStyle={{color: '#00bcd4', fontSize: 14, fontWeight: '400'}}
                                            />
                                        </View>

                                        :
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            marginTop: 25
                                        }}>
                                            <Button
                                                title='JOIN'
                                                buttonStyle={styles.joinButton}
                                                titleStyle={{color: '#ffffff', fontSize: 14, fontWeight: '400'}}
                                            />
                                        </View>
                                }
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    };

    renderEventDays = () => {
        const {eventDays} = this.props;
        const daysCount = eventDays.length - 1;

        return (
            <View style={styles.repeatedDaysList}>
                <Text style={styles.cardHeader}>{'Every '}</Text>
                {
                    eventDays.map((day, i) => (
                        <View key={i} style={{flexDirection: 'row'}}>
                            <Text style={styles.cardHeader}>{day}</Text>
                            <Text style={styles.cardHeader}>{i !== daysCount ? ' and ' : ''}</Text>
                        </View>
                    ))
                }
            </View>
        )
    };

    render() {
        const {isOpened} = this.state;

        return (
            <View>
                {isOpened && this.renderEventsList()}
                <View style={styles.repeatedDaysFooter}>
                    {
                        isOpened ? null : this.renderEventDays()
                    }
                    <TouchableWithoutFeedback onPress={this.handleShowEvents}>
                        {isOpened ? <View><Text>Hide events</Text></View> :
                            <View><Text style={styles.showEventsButton}>Show events</Text></View>}
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

export default NestedEventsList
