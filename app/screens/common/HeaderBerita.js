import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    Image
} from 'react-native';

export default class HeaderBerita extends React.Component {

    render() {
        const navigation = this.props.navigation;
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    paddingVertical: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: 'grey',
                    shadowOffset: { width: 1.5, height: 1.5 },
                    shadowRadius: 2,
                    shadowOpacity: 0.35,
                    elevation: 3,
                    height: 70,
                    flex: 1,
                    paddingHorizontal: 10
                }}
            >
                <View
                    style={{
                        flex: 0.1
                    }}
                >
                    <Image
                        source={require('../../../assets/logo_bojong.png')}
                        style={{
                            width: 25,
                            height: 25
                    }} />
                </View>

                <View
                    style={{
                        flex: 0.4,
                        backgroundColor: 'red'
                    }}
                >
                    <Text
                        style={{
                            color: '#333333',
                            fontSize: 17,
                            fontWeight: 'bold'
                        }}
                    >
                        MyBoget News
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