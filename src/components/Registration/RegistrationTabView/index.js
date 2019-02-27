import * as React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RegistrationPersonalData from 'src/components/Registration/RegistrationTabView/RegistrationPersonalData';
import RegistrationActities from 'src/components/Registration/RegistrationTabView/RegistrationActities';

const PersonalData = () => <RegistrationPersonalData />;
const Activities = () => <RegistrationActities />;
 
export default class RegistrationTabView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'PersonalData', title: 'Personal' },
      { key: 'Activities', title: 'Activities' },
    ],
  };
 
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          PersonalData,
          Activities
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        style={{ backgroundColor: '#fff' }}
        swipeEnabled={false}
        renderTabBar={props =>
          <TabBar
            {...props}
            style={{ backgroundColor: '#00bcd4', height: 46 }}
            labelStyle={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}
            indicatorStyle={{ backgroundColor: 'rgba(0,172,193,1)', height: 4 }}
            // activeColor={"#006773"}
            // inactiveColor={"red"}
          />
        }
      />
    );
  }
}

// color: '#fff',
// fontSize: 18