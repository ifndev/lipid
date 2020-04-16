import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal, Provider, withTheme } from 'react-native-paper';

class HomeComponent extends React.Component {
  /**
  |--------------------------------------------------
  | STATE
  |--------------------------------------------------
  */
  state = {
    fabOpen: false,
  };

  /**
  |--------------------------------------------------
  | FAB Handling
  |--------------------------------------------------
  */
  _openScannerPressed = () => {
    this.props.navigation.navigate('Scanner');
    this.setState({fabOpen: false})
  }

  _onStateChange = ({ open }) => this.setState({ open });

  /**
  |--------------------------------------------------
  | RENDER STARTS HERE
  |--------------------------------------------------
  */
  render() {
    const { fabOpen } = this.state;

    return (
      <View style={styles.container}>
           <FAB.Group
             open={fabOpen}
             icon={fabOpen ? 'close' : 'plus'}
             actions={[
               { icon: 'pencil', label: 'Add a product manually', onPress: () => console.log('Pressed manual') },
               { icon: 'camera', label: 'Scan a barcode', onPress: () => this._openScannerPressed() },
             ]}
             onStateChange={this._onStateChange}
             onPress={() => {
                this.setState({fabOpen: !this.state.fabOpen})
             }}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(HomeComponent);