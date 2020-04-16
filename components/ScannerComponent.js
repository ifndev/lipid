import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Snackbar } from 'react-native-paper';
import * as Permissions from 'expo-permissions';

class ScannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarVisible: false,
      hasCameraPermission: null,
      productName: null,
    };
  }
  componentDidMount() {
    this._requestCameraPermission();
  }

  /**
  |--------------------------------------------------
  | OpenFoodFacts
  |--------------------------------------------------
  */

  _fetchFromOff = (barcode) => {
    fetch(('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json'), {
      method: 'GET'
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success 
        console.log(responseJson.product.generic_name);
        this.setState({ productName: ('👌 ' + responseJson.product.generic_name) });
        this._toggleSnackBar()
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error 
        console.error(error);
        this.setState({ productName: '😒 There was a problem fetching the product infos' });
        this._toggleSnackBar()
      });
  }

  /**
  |--------------------------------------------------
  | Snackbar
  |--------------------------------------------------
  */

  _toggleSnackBar = () => this.setState(state => ({ snackBarVisible: !state.snackBarVisible }));

  _onDismissSnackBar = () => this.setState({ snackBarVisible: false });

  /**
  |--------------------------------------------------
  | Camera permission and barcode handling
  |--------------------------------------------------
  */

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({ type, data }) => {
    console.log(data)
    if (data !== this.state.result) {
      this._fetchFromOff(data)
    }
  };

  /**
  |--------------------------------------------------
  | RENDER STARTS HERE
  |--------------------------------------------------
  */

  render() {
    const { snackBarVisible } = this.state;
    return (
      <View>

        <Snackbar
          snackBarVisible={snackBarVisible}
          onDismiss={this._onDismissSnackBar}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
            },
          }}
        >
          {this.state.productName ? this.state.productName : 'Can\'t get infos from the state 🤔'}
        </Snackbar>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
            ? <Text style={{ color: '#fff' }}>
              Camera permission is not granted
                </Text>
            : <Camera
              onBarCodeScanned={this._handleBarCodeRead}
              style={styles.camera}
            />}
      </View>
    );
  }
}

/**
|--------------------------------------------------
| StyleSheets
|--------------------------------------------------
*/

const styles = StyleSheet.create({
  camera: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default ScannerComponent;
