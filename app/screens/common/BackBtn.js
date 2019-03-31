import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default class BackBtn extends React.Component {

    render() {
        const navigation = this.props.navigation;
        return (
            <View
                style={{
                    backgroundColor: 'rgb(52,73,100)',
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                { (this.props.back) ?
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            flex: 0.2
                        }}
                    >
                        <View
                            style={{
                                paddingHorizontal: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 30,
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                            >
                                {"<"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                : null }

                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 21
                        }}
                    >
                        {this.props.title}
                    </Text>
                </View>

                { (this.props.back) ?
                    <View
                        style={{
                            flex: 0.2
                        }}
                    ></View>
                : null }
            </View>
        );
    }
}