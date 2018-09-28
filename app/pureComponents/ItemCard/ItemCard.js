import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import moment from 'moment';
import {Card, Icon, Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import NestedEventsList from './nestedEventsList'

const iconColor = '#cfd8dc';
// const decisions = [{value: 'Joined',}, {value: 'Attend',}, {value: 'No, thanks'}];

export const ItemCard = (props) => {

    props.data.menu = null;
    props.data.acceptedStatus = 'Joined';

    props.data.showRepeatedEventsContent = false;

    this.setMenuRef = ref => {
        props.data.menu = ref;
    };

    this.hideMenu = () => {
        props.data.menu.hide();
    };

    this.showMenu = () => {
        props.data.menu.show();
    };

    this.renderRepeatedDaysFooter = () => {
        return (
            <View>
                <NestedEventsList eventDays={props.data.repeatedDays} events={props.data.repeatedEvents}/>
            </View>
        )
    };

    this.renderCardActions = () => {
        const {type} = props;

        this.renderInviteStatus = () => {
            return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Menu
                            ref={this.setMenuRef}
                            button={<Text onPress={this.showMenu}>{props.data.acceptedStatus}</Text>}
                        >
                            <MenuItem onPress={this.hideMenu.bind(this, 'Joined')}>Joined</MenuItem>
                            <MenuItem onPress={this.hideMenu.bind(this, 'Attend')}>Attend</MenuItem>
                            <MenuItem onPress={this.hideMenu.bind(this, 'No, thanks')}>No, thanks</MenuItem>
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
            )
        };

        this.renderJoinStatus = () => {
            return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Text style={styles.rejectButton}>Reject</Text>

                    <Button
                        title='JOIN'
                        buttonStyle={styles.joinButton}
                        titleStyle={{color: '#ffffff', fontSize: 14, fontWeight: '400'}}
                    />
                </View>
            )
        };

        return (
            <View>
                {type === 'new' ? this.renderJoinStatus() : this.renderInviteStatus()}
            </View>
        )
    };

    return (
        <View style={styles.jjCard}>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Image style={styles.cardAvatar}
                           source={{uri: props.data.backgroundPic}}/>
                </View>
                <View style={{flex: 1}}>
                    <View>
                        <Text
                            style={styles.cardHeader}>{props.data.title ? props.data.title : props.data.activity.name}</Text>

                        <Text style={styles.cardSubHeader}>{props.data.activity.name}</Text>
                        <Text style={styles.cardSubHeader}>{props.data.participants.length + ' participants'}</Text>
                        {/*<Text></Text>*/}

                        <View style={styles.cardEventDay}>
                            <View style={styles.dateString}>
                                <MaterialCommunityIcons name="calendar-range" size={20} color={iconColor}/>
                                <Text
                                    style={[styles.cardHeader, styles.textMargin]}>{moment(props.data.eventDates.startDate).format('D MMMM')}</Text>
                            </View>
                            <View style={styles.dateString}>
                                <MaterialIcons name="access-time" size={20} color={iconColor}/>
                                <Text
                                    style={[styles.cardHeader, styles.textMargin]}>{moment(props.data.eventDates.startDateTime).add(3, 'hour').format('H:mm') + ' at ' + moment(props.data.eventDates.startDateTime).format('dddd')}</Text>
                            </View>
                        </View>
                    </View>
                    {this.renderCardActions()}
                </View>
            </View>
            {props.data.repeated && this.renderRepeatedDaysFooter()}
        </View>
    )
};
