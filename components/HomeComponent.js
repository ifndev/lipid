import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import AddProductFab from './AddProductFab';

class HomeComponent extends React.Component {
  /**
  |--------------------------------------------------
  | STATE
  |--------------------------------------------------
  */
  state = {
    
  };



  /**
  |--------------------------------------------------
  | RENDER STARTS HERE
  |--------------------------------------------------
  */
  render() {
    

    return (
      <View style={styles.container}>
           <AddProductFab navigation={this.props.navigation}/>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(HomeComponent);