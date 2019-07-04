import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

import HeaderSetting from '../common/HeaderSetting';

export default class SettingAkun extends React.Component {

    _SettingProfile() {
        const navigation = this.props.navigation;

        const desc = [
            {
                itemName: 'Nama Lengkap',
            },
            {
                itemName: 'Tanggal Lahir',
            },
            {
                itemName: 'Jenis Kelamin',
            },
            {
                itemName: ' Alamat',
            },
            {
                itemName: 'Nomor Handphone',
            },
            {
                itemName: 'Email',
            },
            {
                itemName: 'Nomor Handphone',
            }
        ];

        const item = desc.map(function (name, index) {
            return (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        marginTop: 14,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                color: '#333333',
                                flex: 0.4,
                                paddingTop: 3,
                                paddingLeft: 4
                            }}
                        >
                            {name.itemName}
                        </Text>
                        <TextInput
                            style={{
                                borderWidth: 0.4,
                                width: 120,
                                height: 28,
                                flex: 0.5,
                                borderRadius: 15,
                                padding: 5
                            }}
                        />
                    </View>
                </View>
            )
        });

        return (item);
    }
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
                
                <View>
                    <HeaderSetting
                        title='Akun Pribadi'
                        navigation={navigation}
                    />
                </View>

                <View
                    style={{
                        flex: 1
                    }}
                >
                    {this._SettingProfile()}
                </View>

                <View>
                    <TouchableOpacity
                        style={{
                            borderTopWidth: 0.1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            backgroundColor: '#4ed964'
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16,
                            }}
                        >Ubah Akun Pribadi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}