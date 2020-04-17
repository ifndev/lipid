import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Snackbar, Button } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from '../actions/ProductActions'

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
      snackbarMessage: null,
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
        if (responseJson.status_verbose === "product not found") {
          this.setState({ snackbarMessage: '😒 Can\'t find this product '});
          this._toggleSnackBar();
        }
        else {
          lightProduct = {
            code: barcode,
            product: {
              generic_name: responseJson.product.generic_name ? responseJson.product.generic_name : null,
              product_name: responseJson.product.product_name ? responseJson.product.product_name : "Name not found",
              image_front_url: responseJson.product.image_front_url ? responseJson.product.image_front_url : null,
              nutriscore_data: {
                nutriscore_grade: responseJson.product.nutriscore_data.nutriscore_grade ? responseJson.product.nutriscore_data.nutriscore_grade : '?',
              }
            },
          }
          this.props.addProduct(lightProduct);
          this.props.navigation.goBack();
        } 
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error 
        console.error(error);
        this.setState({ snackbarMessage: '😒 There was a problem fetching the product infos' });
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
      this.setState({ previousResult: data })
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
          {this.state.snackbarMessage ? this.state.snackbarMessage : 'Can\'t get infos from the state 🤔'}
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
          onPress={() => this.setState({ torchOn: !torchOn })}
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
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) - 20,
    bottom: (Dimensions.get('window').height / 2) - 20,
    left: 0,
    right: 0,
    backgroundColor: '#f00f00',
  },
  torchButton: {
    position: 'absolute',
    bottom: 30,
  }
});

/**
|--------------------------------------------------
| REDUX STATE
|--------------------------------------------------
*/

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addProduct,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(ScannerComponent);
