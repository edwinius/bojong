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

export default class Keluar extends React.Component {
    render() {
        const navigation = this.props.navigation
        return (
            <View>
                <HeaderSetting
                    title='Keluar'
                    navigation={navigation}
                />

            </View>
        )
    }
}