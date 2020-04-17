import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, List } from 'react-native-paper';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View>
            <Card>
                <Card.Title title={this.props.item.product.generic_name} subtitle="sous-titre"/>
                <Card.Cover source={{ uri: this.props.item.product.image_front_url }}/>
            </Card>
        </View>
    );
  }
}

export default ProductCard;