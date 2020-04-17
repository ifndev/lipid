import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Portal, FAB, withTheme } from 'react-native-paper';

class AddProductFab extends Component {
  constructor(props) {
    super(props);

    /**
    |--------------------------------------------------
    | STATE
    |--------------------------------------------------
    */
    this.state = {
      fabOpen: false,
    };
  }

  /**
  |--------------------------------------------------
  | FAB Handling
  |--------------------------------------------------
  */
  _openScannerPressed = () => {
    this.props.navigation.navigate('Scanner');
    this.setState({ fabOpen: false })
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
      <View style={styles.Container}>
        <Portal>
          <FAB.Group
            open={fabOpen}
            icon={fabOpen ? 'close' : 'plus'}
            visible={this.props.visible}
            actions={[
              { icon: 'pencil', label: 'Add a product manually', onPress: () => console.log('Pressed manual') },
              { icon: 'camera', label: 'Scan a barcode', onPress: () => this._openScannerPressed() },
            ]}
            onStateChange={this._onStateChange}
            onPress={() => {
              this.setState({ fabOpen: !this.state.fabOpen })
            }}
            style={styles.FAB}
          />
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FAB: {
    bottom: 60,
  },
});

export default withTheme(AddProductFab);
