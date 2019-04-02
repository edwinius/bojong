import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    SafeAreaView
} from 'react-native';

export default class HeaderSetting extends React.Component {

    render() {
        const navigation = this.props.navigation;
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: 'grey',
                    shadowOffset: { width: 1.5, height: 1.5 },
                    shadowRadius: 2,
                    shadowOpacity: 0.35,
                    elevation: 3,
                    height: 70
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        paddingHorizontal: 12,
                        flex: 0.2
                    }}
                >

                    <Text
                        style={{
                            fontSize: 30,
                            color: '#444444',
                        }}
                    >
                        {"<"}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            color: '#444444',
                            textAlign: 'center',
                            fontSize: 21
                        }}
                    >
                        {this.props.title}
                    </Text>
                </View>

                <View
                    style={{
                        flex: 0.3
                    }}
                >

                </View>
            </View>
        );
    }
}