import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export default class HomeComponent extends React.Component {
  state = {
    visible: false,
    productName: "vide"
  };

  buttonPressed = () => {
      fetch('https://world.openfoodfacts.org/api/v0/product/3274080005003.json', {
          method: 'GET'
      })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
          //Success 
          console.log(responseJson);
          this.setState({ productName: ('👌 ' + (responseJson.product.generic_name ? responseJson.product.generic_name : responseJson.product.product_name))});
          this._onToggleSnackBar()
      })
      //If response is not in json then in error
      .catch((error) => {
          //Error 
          console.error(error);
          this.setState({ productName: 'There was an error fetching the product infos'});
          this._onToggleSnackBar()
      });
  }

  scannerPressed = () => {
    this.props.navigation.navigate('Scanner');
  }

  _onToggleSnackBar = () => this.setState(state => ({ visible: !state.visible }));

  _onDismissSnackBar = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <View style={styles.container}>
        <Button
          onPress={this.buttonPressed}
          mode="outlined"
        >
          {visible ? 'Hide snackbar' : 'Show snackbar'}
        </Button>
        <Button
          onPress={this.scannerPressed}
          icon="camera" 
          mode="contained"
        >
          open scanner
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={this._onDismissSnackBar}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          { this.state.productName ? this.state.productName : 'Can\'t get infos from the state 🤔'}
        </Snackbar>
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