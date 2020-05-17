import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Snackbar, Button } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from '../redux/actions/ProductActions'
import { addProductFromBarcode } from './historyHandler'

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

  _ProcessBarcode = async (barcode) => {
    
    addProductFromBarcode(barcode, this.props.addProduct).then(() => { //TODO: Find a way to dispatch from offHandler instead of mapping to these props and passing addProduct as an arg
      this.props.navigation.goBack();
    }).catch( err => {

      switch (err) {
        case "fetchError":
          this.setState({ snackbarMessage: '😒 There was a problem fetching the product infos' });
          this._toggleSnackBar()
          break;
        
        case "productNotFoundError":
          this.setState({ snackbarMessage: '😒 Can\'t find this product ' });
          this._toggleSnackBar();
          break;
      }
    })
    
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
      this.setState({ previousResults: [...this.state.previousResults, data] }); //Append the barcode to previousResults
      this._ProcessBarcode(data);
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
            ? <Text style={{ color: '#000' }}>
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
    backgroundColor: '#FFFFFF',
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
    elevation: 10,
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
