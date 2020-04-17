import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import placeholderProducts from '../Helpers/placeholderProductList';
import ProductCard from './ProductCard'

class ProductsHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
      <View>
          <FlatList
        data={placeholderProducts}
        renderItem={
            ({item}) => <ProductCard item={item}/>
        }
      />
      </View>
    );
  }
}

export default ProductsHistory;
