import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import HeaderSetting from './HeaderSetting';

export default class SettingAkunDanID extends React.Component {

    _SettingProfile() {
        const navigation = this.props.navigation;

        const desc = [
            {
                itemName: 'Akun Pribadi',
                btnPage: 'SettingAkun'
            },
            {
                itemName: 'Ubah Password',
                btnPage: 'SettingId'
            }
        ];

        const item = desc.map(function (name, index) {
            return (
                <TouchableOpacity
                    key={index}
                    style={{
                        flexDirection: 'row',
                        padding: 16,
                        borderBottomWidth: 0.4,
                    }}
                    onPress={() =>
                        navigation.navigate(`${name.btnPage}`)}
                >
                    <Text
                        style={{
                            color: '#333333'
                        }}
                    >
                        {name.itemName}
                    </Text>
                </TouchableOpacity>
            )
        });

        return (item);
    }

    render() {

        const navigation = this.props.navigation;

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

                <View>
                    <HeaderSetting
                        title='Setting Akun'
                        navigation={navigation}
                    />
                </View>
                <View>
                    {this._SettingProfile()}
                </View>
            </View >
        );
    }
}