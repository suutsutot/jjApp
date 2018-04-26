// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header} from 'react-native-elements'

export class HeaderPage extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        let {title} = this.props;

        return (
            <Header
                backgroundColor='#00bcd4'
                // leftComponent={{icon: 'menu', color: '#fff'}}
                centerComponent={{text: title, style: {color: '#fff'}}}
                // rightComponent={{icon: 'bell', type: 'material-community', color: '#fff'}}
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage)