import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import AddProductFab from './AddProductFab';
import ProductsHistory from './ProductsHistory';

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
           <ProductsHistory/>
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