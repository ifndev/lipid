import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default class HomeComponent extends React.Component {
  state = {
  };

  _openScannerPressed = () => {
    this.props.navigation.navigate('Scanner');
  }

  render() {

    return (
      <View style={styles.container}>
        <Button
          onPress={this._openScannerPressed}
          icon="camera" 
          mode="contained"
        >
          open scanner
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
});