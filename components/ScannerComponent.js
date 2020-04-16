import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Snackbar, Button } from 'react-native-paper';
import * as Permissions from 'expo-permissions';

class ScannerComponent extends Component {
  constructor(props) {
    super(props);

  /**
  |--------------------------------------------------
  | STATE
  |--------------------------------------------------
  */
    this.state = {
      snackBarVisible: false,
      hasCameraPermission: null,
      productName: null,
      previousResult: null,
      torchOn: false,
    };
  }

  /**
  |--------------------------------------------------
  | LIFECYCLE
  |--------------------------------------------------
  */
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

  _toggleSnackBar = () => {
    this.setState(state => ({ snackBarVisible: !state.snackBarVisible }))
  };

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
    if (data !== this.state.previousResult) {
      this.setState({ previousResult: data})
      this._fetchFromOff(data)
    }
  };

  /**
  |--------------------------------------------------
  | RENDER STARTS HERE
  |--------------------------------------------------
  */

  render() {
    const { snackBarVisible, torchOn } = this.state;
    return (
      <View style={styles.scannerView}>
        <Snackbar
          visible={snackBarVisible}
          onDismiss={this._onDismissSnackBar}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
            },
          }}
          style={styles.snackBar}
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
              ratio="1:1"
              flashMode={torchOn ? 'torch' : 'off'}
            />}

            <Button 
            mode={torchOn ? 'contained' : 'outlined'}
            onPress={() => this.setState({torchOn: !torchOn})}
            icon='flash'
            style={styles.torchButton}
            >
            Flash
            </Button>



            <View style={styles.redStripeView}></View>
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
  scannerView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: Math.min(Dimensions.get('window').height, Dimensions.get('window').width),
    width: Math.min(Dimensions.get('window').height, Dimensions.get('window').width),
    elevation: 0,
  },
  snackBar: {
    elevation: 10,
  },
  redStripeView: {
    position:'absolute',
    top: (Dimensions.get('window').height/2)-20,
    bottom: (Dimensions.get('window').height/2)-20,
    left: 0,
    right: 0,
    backgroundColor: '#f00f00',
  },
  torchButton: {
    position:'absolute',
    bottom: 30,
  }
});

export default ScannerComponent;
