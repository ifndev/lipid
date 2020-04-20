import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';

class NutriscoreBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Badge style={styles.badge}> NutriScore: {this.props.grade.toUpperCase()} </Badge>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    badge: {
        fontWeight: "bold",
        textAlign:"center",
        alignContent:"center",
        justifyContent:"center",
        backgroundColor: '#fff',
        fontSize: 15,
        color: '#81c784'
    }
});

export default NutriscoreBadge;
