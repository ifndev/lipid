import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductCard from './ProductCard'
import { connect } from 'react-redux';

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
                    data={this.props.products.history.reverse()}
                    keyExtractor = {(item) => item.code}
                    renderItem={({ item }) => <ProductCard item={item} />}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { products } = state
    return { products }
}


export default connect(mapStateToProps)(ProductsHistory);
