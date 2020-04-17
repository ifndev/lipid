import React, { Component } from 'react';
import { Portal, Provider, FAB, withTheme } from 'react-native-paper';


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
        <Portal>
          <FAB.Group
            open={fabOpen}
            icon={fabOpen ? 'close' : 'plus'}
            actions={[
              { icon: 'pencil', label: 'Add a product manually', onPress: () => console.log('Pressed manual') },
              { icon: 'camera', label: 'Scan a barcode', onPress: () => this._openScannerPressed() },
            ]}
            onStateChange={this._onStateChange}
            onPress={() => {
              this.setState({ fabOpen: !this.state.fabOpen })
            }}
          />
        </Portal>
    );
  }
}

export default withTheme(AddProductFab);
