import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Title } from 'react-native-paper';
import ProductCard from '../ProductCard'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeProduct } from '../../redux/actions/ProductActions'

class ProductsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.title}>History</Title>
                <FlatList
                    data={this.props.products.history}
                    keyExtractor = {(item) => item.code}
                    renderItem={({ item }) => <ProductCard item={item} removeProduct={this.props.removeProduct}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignContent: "center",
        justifyContent: "space-evenly",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingTop: 70,
        paddingBottom: 40,
        alignSelf: 'center',
    },
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
    removeProduct
}, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductsHistory);
