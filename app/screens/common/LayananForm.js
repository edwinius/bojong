import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class LayananForm extends React.Component {

    render() {
        const btn = this.props.buttons.map(function (item, index) {
            return (
                <View
                    key={index}
                    style={{
                        flexDirection: 'column',
                        marginTop: 14,
                        justifyContent: "center",
                    }}
                >
                    <View>
                        <Text
                            style={{
                                textAlign: 'justify',
                                lineHeight: 20,
                                color: '#333333'
                            }}
                        >
                            {item.btnName}</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            width: 90,
                            marginTop: 15,
                            textAlign: 'center',
                            marginBottom: 10
                        }}
                        onPress={() => navigation.navigate(`${item.btnPage}`)}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 15,
                                color: '#333333'
                            }}
                        >
                            Choose file
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        });

        return (
            <View>
                {btn}
            </View>
        );
    }
}