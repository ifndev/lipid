import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

class ScannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      result: null,
    };
  }
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({type, result}) => {
    console.log("code lu")
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ result: result.data });
    }
  };

  render() {
    return (
      <View>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}
        <Text>{this.state.result ? this.state.result : 'r'}</Text>

      </View>
    );
  }
}

export default ScannerComponent;
