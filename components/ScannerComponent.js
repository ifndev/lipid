import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Snackbar, Button } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from '../redux/actions/ProductActions'

class ScannerComponent extends Component {
  constructor(props) {
    super(props);

    /**
    |--------------------------------------------------
    | STATE
    |--------------------------------------------------
    */
    this.state = {
      hasCameraPermission: null,
      torchOn: false,
      cameraVisible: true,

      snackBarVisible: false,
      snackbarMessage: null,
      
      previousResults: [], // Now a list, see #7
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

    //We try to fetch the data corresponding to the barcode from OpenFoodFacts
    fetch(('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json'), {
      method: 'GET'
    })
      .then((response) => response.json())
      //If response is in json then in success.
      .then((responseJson) => {
        //This API responds with status 200 even if no product is found. We have to chech status_verbose
        //TODO: Error if status isn't good news but is different than that

        console.log(responseJson.status_verbose)

        if (responseJson.status_verbose === "product not found") {
          this.setState({ snackbarMessage: '😒 Can\'t find this product '});
          this._toggleSnackBar();
        }

        else {
          const { generic_name, product_name, image_front_url, nutriscore_data } = responseJson.product

          // Add the product to the redux state
          this.props.addProduct({
            code: barcode,
            product: { 
              generic_name: generic_name || null, 
              product_name: product_name || 'Name not found',
              image_front_url: image_front_url || null, 
              nutriscore_data: {
                grade: nutriscore_data?.grade || '?'
              }
            },
          });
          //Go back to Home
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
    this.setState({cameraVisible: false});

    if (!this.state.previousResults.includes(data)) { //the scanner scans the same barcode infinitely, so we have to prevent the same product from being added 30 times a second
      console.log("2")
      this.setState({ previousResults: [...this.state.previousResults, data] }); //Append the barcode to previousResults
      this._fetchFromOff(data);
    }
    this.setState({cameraVisible: true});
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
