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

class ItemCard extends Component {

    hideMenu = (id) => {
        this['menu_' + id].hide();
    };

    showMenu = (id) => {
        this['menu_' + id].show();
    };

    renderRepeatedDaysFooter = () => {
        const {data} = this.props;
        return (
            <View>
                <NestedEventsList eventDays={data.repeatedDays} events={data.repeatedEvents}/>
            </View>
        )
    };

    renderCardActions = () => {
        const {type} = this.props;
        const {data} = this.props;
        const {index} = this.props;

        this.renderInviteStatus = () => {
            return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Menu
                            ref={(eventMenu) => {
                                this['menu_' + index] = eventMenu
                            }}
                            button={<Text onPress={this.showMenu.bind(this, index)}>Joined</Text>}
                        >
                            <MenuItem onPress={this.hideMenu.bind(this, index)}>Joined</MenuItem>
                            <MenuItem onPress={this.hideMenu.bind(this, index)}>Attend</MenuItem>
                            <MenuItem onPress={this.hideMenu.bind(this, index)}>No, thanks</MenuItem>
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


    render() {

        const {data} = this.props;

        return (
            <View style={styles.jjCard}>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Image style={styles.cardAvatar}
                               source={{uri: data.backgroundPic}}/>
                    </View>
                    <View style={{flex: 1}}>
                        <View>
                            <Text
                                style={styles.cardHeader}>{data.title ? data.title : data.activity.name}</Text>

                            <Text style={styles.cardSubHeader}>{data.activity.name}</Text>
                            <Text style={styles.cardSubHeader}>{data.participants.length + ' participants'}</Text>
                            {/*<Text></Text>*/}

                            <View style={styles.cardEventDay}>
                                <View style={styles.dateString}>
                                    <MaterialCommunityIcons name="calendar-range" size={20} color={iconColor}/>
                                    <Text
                                        style={[styles.cardHeader, styles.textMargin]}>{moment(data.eventDates.startDate).format('D MMMM')}</Text>
                                </View>
                                <View style={styles.dateString}>
                                    <MaterialIcons name="access-time" size={20} color={iconColor}/>
                                    <Text
                                        style={[styles.cardHeader, styles.textMargin]}>{moment(data.eventDates.startDateTime).add(3, 'hour').format('H:mm') + ' at ' + moment(data.eventDates.startDateTime).format('dddd')}</Text>
                                </View>
                            </View>
                        </View>
                        {this.renderCardActions()}
                    </View>
                </View>
                {data.repeated && this.renderRepeatedDaysFooter()}
            </View>
        )
    }
}

export default ItemCard
