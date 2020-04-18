import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line, Text as SvgText, Svg } from 'react-native-svg'

class NutriChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _ComputeRawStats(data) { //Gives carbs, proteins, fats, and  goal progress in % and returns PieChart-friendly values
        //TODO
    }

    _toPieData(data) {
        ndata = [];
        data.forEach(obj => {
            value = obj.value
            ndata.push({

                value,
                svg: { fill: obj.color },
                key: `pie-${obj.label}`,

            });
        });
        return ndata;
    }

    render() {
        const data = [
            {
                label: 'Carbs',
                value: 3,
                color: '#7ED3B2',
            },
            {
                label: 'Proteins',
                value: 5,
                color: '#D3AE85',
            },
            {
                label: 'Fats',
                value: 2,
                color: '#FFCC88',
            },
            {
                label: null,
                value: 5,
                color: 'none',
            },
        ]

        const pieData = data
            .filter(obj => obj.value > 0)
            .map((obj) => (
                {
                    value: obj.value,
                    label: obj.label,
                    svg: { fill: obj.color },
                    key: `pie-${obj.label}`,
                }))

        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G key={index}>
                        <SvgText
                            fill={data.svg.fill}
                            stroke="none"
                            fontSize="20"
                            fontWeight="bold"
                            x={labelCentroid[0]}
                            y={labelCentroid[1] + 5}
                            textAnchor="middle"
                        >{data.label}</SvgText>
                    </G>
                )
            })
        }

        const CenterLabel = () => {
            return (
                <G>
                    <SvgText
                        fill="white"
                        stroke="none"
                        fontSize="20"
                        fontWeight="bold"
                        x={0}
                        y={0}
                        textAnchor="middle"
                    >
                        1337.4/1486
                    </SvgText>
                    <SvgText
                        fill="white"
                        stroke="none"
                        fontSize="20"
                        fontWeight="bold"
                        x={0}
                        y={20}
                        textAnchor="middle"
                    >
                        Calories
                    </SvgText>
                </G>
            )
        }

        return (
            <PieChart
                style={{ height: 300, padding: 0 }}
                data={pieData}
                innerRadius={75}
                outerRadius={95}
                labelRadius={140}
                sort={(a, b) => a} //No sorting, we want the order to be the same as in the "data" array
            >
                <Labels />
                <CenterLabel />
            </PieChart>
        )
    }
}

export default NutriChart;
