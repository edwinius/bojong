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

export default class Setting extends React.Component {

    _SettingProfile() {
        const navigation = this.props.navigation;

        const desc = [
            {
                itemName: 'Akun',
                btnPage: 'SettingAkunDanID'
            },
            {
                itemName: 'Syarat dan Ketentuan',
                btnPage: 'SyaratDanKetentuan'
            },
            {
                itemName: 'Kebijakan Privasi',
                btnPage: 'KebijakanPrivasi'
            },
            {
                itemName: 'Pusat Bantuan',
                btnPage: 'PusatBantuan'
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

                <View
                    style={{
                        height: 65,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        shadowColor: 'grey',
                        shadowOffset: { width: 1.5, height: 1.5 },
                        shadowRadius: 2,
                        shadowOpacity: 0.35,
                        elevation: 3,
                        backgroundColor: 'white'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomePage')}
                        style={{
                            flex: 0.4,
                            marginLeft: 16
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 26,
                                color: '#333333',
                            }}
                        >
                            {'<'}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: '#333333',
                            flex: 0.65
                        }}
                    >Setting</Text>
                </View>

                <ScrollView
                    style={{
                    }}
                >
                    <View>
                        {this._SettingProfile()}
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity
                        style={{
                            borderTopWidth: 0.1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            backgroundColor: "#f6b7ac"
                        }}
                    >
                        <Text
                            style={{
                                color: '#5f5c5b',
                                fontSize: 16
                            }}
                        >Keluar</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}