// import React, {Component} from 'react'
//
// import {connect} from 'react-redux'
// import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
// import {List, ListItem} from 'react-native-elements';
//
// import styles from './styles'
//
// export class Events extends Component {
//
//     render() {
//         const {events} = this.props;
//
//         return (
//             <View style={styles.profile}>
//                 <ScrollView>
//                     <Text>Events</Text>
//                     <List containerStyle={{marginBottom: 20}}>
//                         {
//                             events.joined.map((l, i) => (
//                                 <ListItem
//                                     roundAvatar
//                                     avatar={{uri: l.backgroundPic}}
//                                     key={i}
//                                     title={l.title}
//                                 />
//                             ))
//                         }
//                     </List>
//                 </ScrollView>
//             </View>
//         )
//     }
// }
//
// const mapStateToProps = (state, ownProps) => {
//     const {uid} = state.authorize;
//     const {windowSize} = state.global;
//     const userId = uid;
//     const events = state.events.info[userId];
//
//     return {
//         events: events,
//         userId,
//         windowSize
//     }
// };
//
// export default connect(mapStateToProps)(Events)
