import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Card style={styles.productCard}>
          <Card.Content style={styles.cardContent}>
            <Image source={{ uri: this.props.item.product.image_front_url, }} style={styles.thumbnail} />
              <View style={styles.rightText}>
                <Title>{this.props.item.product.generic_name ? this.props.item.product.generic_name : this.props.item.product.product_name}</Title>
                <Paragraph>Card content</Paragraph>
              </View>
          </Card.Content>
        </Card>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  productCard: {
    margin: 10,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  rightText: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
  }
})

export default ProductCard;
/**
|--------------------------------------------------
|             <Card.Cover source={{ uri: this.props.item.product.image_front_url }}/>
|--------------------------------------------------
*/