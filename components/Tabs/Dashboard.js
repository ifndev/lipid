import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import NutriChart from '../NutriChart'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fill: 90,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.title}>Dashboard</Title>
                <NutriChart />
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
    circularProgress: {
        alignSelf: 'center',
    },
    inCircleProgress: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    }

});

export default connect(mapStateToProps)(Dashboard);
