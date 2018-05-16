// import React, {Component} from 'react'
// import {connect} from 'react-redux'
//
// import {View, Platform} from 'react-native'
// import {SearchBar} from 'react-native-elements'
//
// import styles from './styles'
//
//
// export class Search extends Component {
//     constructor(props) {
//         super(props);
//
//     }
//
//     _renderHeaderSearch = props => {
//         if (Platform.OS === 'ios') {
//             return (
//                 <SearchBar
//                     showLoading
//                     platform="ios"
//                     cancelButtonTitle="Cancel"
//                     placeholder='Search'/>
//             )
//         }
//         else {
//             return (
//                 <SearchBar
//                     showLoading
//                     platform="android"
//                     placeholder='Search'/>
//             )
//         }
//     };
//
//     render() {
//         return (
//             <View>
//                 {this._renderHeaderSearch()}
//             </View>
//
//         );
//     }
// }
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {}
//
// };
//
// const mapStateToProps = ({}) => {
//     return {}
// };
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(Search)
