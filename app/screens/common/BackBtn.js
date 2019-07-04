import React from 'react';
import {
    StatusBar,
    Text,
    TouchableOpacity,
    View,
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
                <StatusBar barStyle="light-content" />

                { (this.props.back) ?
                    <TouchableOpacity
                        onPress={() => {
                            if(this.props.screen_from && this.props.screen_from != '') {
                                navigation.navigate(`${this.props.screen_from}`);
                            } else {
                                navigation.goBack(null);
                            }
                        }}
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