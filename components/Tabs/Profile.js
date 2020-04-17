import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.title}>Profile</Title>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { products } = state
    return { products }
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

export default connect(mapStateToProps)(Profile);
