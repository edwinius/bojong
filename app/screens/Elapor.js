import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

import BackBtn from './common/BackBtn';

export default class Elapor extends React.Component {

    render() {

        const navigation = this.props.navigation;

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(52,73,100)',
                    ...Platform.select({
                        android: {
                            paddingTop: 30
                        }
                    })
                }}
            >
                <StatusBar barStyle="light-content" />

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <BackBtn
                        title="Lapor"
                        navigation={navigation}
                        back={false}
                    />

                    <ScrollView
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 30,
                                    marginTop: 50,
                                    marginBottom: 20
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >
                                    E-Lapor adalah fitur yang disediakan oleh kecamatan Bojonggenteng untuk masyarakat, agar dapat melaporkan kejadian apapun secara online yang terjadi di sekitar.
                                </Text>
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 30,
                                    alignItems: 'center'
                                }}
                            >
                                <TextInput
                                    style={{
                                        borderColor: 'grey',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        marginTop: 15,
                                        width: 300,
                                        height: 200,
                                        paddingHorizontal: 10,
                                        paddingVertical: 10,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                    }}
                                    multiline={true} 
                                    numberOfLines={5}
                                    underlineColorAndroid="transparent"
                                    placeholder="Tulis laporan anda"
                                    placeholderTextColor="#cacaca"
                                    autoCapitalize="none"
                                    onChangeText={this.handleLapor} 
                                />

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#888888',
                                        borderWidth: 0.1,
                                        borderRadius: 15,
                                        paddingVertical: 8,
                                        paddingHorizontal: 30,
                                        marginTop: 10,
                                        alignItems: 'center',
                                        shadowColor: 'grey',
                                        shadowOffset: { width: 1.5, height: 1.5 },
                                        shadowRadius: 2,
                                        shadowOpacity: 0.35,
                                        elevation: 3,
                                    }}
                                    onPress={
                                        () => this.Kirim(this.state.lapor)
                                    }>
                                    <Text style={{
                                        color: 'white'
                                    }}>Kirim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}