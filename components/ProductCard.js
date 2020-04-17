import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import NutriscoreBadge from './NutriscoreBadge'

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
                <Title>{this.props.item.product.product_name}</Title>
                <Paragraph numberOfLines={2}>{this.props.item.product.generic_name ? this.props.item.product.generic_name : 'No description available for this product'}</Paragraph>
                <NutriscoreBadge nutriscore_grade={this.props.item.product.nutriscore_data.nutriscore_grade} style={styles.nutriscoreBadge}/>              
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
    flex: 1,
  },
  nutriscoreBadge: {
  }
})

export default ProductCard;
/**
|--------------------------------------------------
|             <Card.Cover source={{ uri: this.props.item.product.image_front_url }}/>
|--------------------------------------------------
*/