import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import { HeaderSection } from 'src/pureComponents';
import styles from './styles';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import UserCommunitiesList from './UserCommunitiesList/UserCommunitiesList';
import RecommendedCommunities from './RecommendedCommunities/RecommendedCommunities';

export class Communities extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'My communities' },
      { key: 'second', title: 'Recommended' }
    ]
  };

  _renderLabel = scene => (
    <Text style={{ textTransform: 'lowercase', color: '#f4fcfd' }}>
      {scene.route.title}
    </Text>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderSection />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: UserCommunitiesList,
            second: RecommendedCommunities
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              renderLabel={this._renderLabel}
              indicatorStyle={{ backgroundColor: '#0097a7' }}
              tabStyle={{ height: 46 }}
              style={{ backgroundColor: '#00bcd4', height: 46 }}
            />
          )}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const mapStateToProps = ({ events }) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Communities);
