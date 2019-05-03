import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import HeaderSetting from './HeaderSetting';

export default class PusatBantuan extends React.Component {
    render() {
        const navigation = this.props.navigation
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <SafeAreaView
                    style={{
                        ...Platform.select({
                            android: {
                                backgroundColor: 'black',
                                height: 24,
                            }
                        })
                    }}
                >
                </SafeAreaView>
                <HeaderSetting
                    title='Pusat Bantuan'
                    navigation={navigation}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 150
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            lineHeight: 24
                        }}
                    >
                        Hubungi Kami Di:
                        {'\n'}
                        No. Tlp: 0266 620147
                        {'\n'}
                        Email: kec.bojonggenteng@gmail.com
                    </Text>
                </View>
            </View>
        )
    }
}