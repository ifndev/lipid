import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, BottomNavigation, Text } from 'react-native-paper';
import AddProductFab from './AddProductFab';
import ProductsHistory from './Tabs/ProductsHistory';
import Dashboard from './Tabs/Dashboard';
import Profile from './Tabs/Profile';

/**
|--------------------------------------------------
| Routes
|--------------------------------------------------
*/

const DashboardRoute = () => <Dashboard/>;

const HistoryRoute = () => <ProductsHistory />;

const ProfileRoute = () => <Profile/>;

class HomeComponent extends React.Component {

  /**
  |--------------------------------------------------
  | STATE
  |--------------------------------------------------
  */
  state = {
    FABVisible: true,
    index: 0,
    routes: [
      { key: 'dashboard', title: 'Dashboard', icon: 'chart-areaspline' },
      { key: 'history', title: 'History', icon: 'history' },
      { key: 'profile', title: 'Profile', icon: 'account' },
    ],
  };

  /**
  |--------------------------------------------------
  | React Navigation Tabs Handling
  |--------------------------------------------------
  */

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardRoute,
    history: HistoryRoute,
    profile: ProfileRoute,
  })

  /**
  |--------------------------------------------------
  | React Navigation listeners
  |--------------------------------------------------
  */

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ FABVisible: true })
    });
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setState({ FABVisible: false })
    });
  }



  /**
  |--------------------------------------------------
  | RENDER STARTS HERE
  |--------------------------------------------------
  */
  render() {
    return (
      <View style={styles.container}>
        <AddProductFab navigation={this.props.navigation} visible={this.state.FABVisible} />
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}
/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(HomeComponent);