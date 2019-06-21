import React from 'react';
import {
    AsyncStorage,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';

const styleGeneral = require('./styles/StyleGeneral');

export default class ProfileUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            userPid: '',
            userToken: '',
            userAdmin: ''
        }
    }

    async getToken() {
        try {
            const navigation = this.props.navigation;
            let userPid = await AsyncStorage.getItem('userPid');
            let userToken = await AsyncStorage.getItem('userToken');
            let userAdmin = await AsyncStorage.getItem('userAdmin');

            // If not logged set userPid & userToken to 0
            if (userPid == null || userPid == '' || userToken == null || userToken == '') {
                userPid = '',
                    userToken = ''
            }

            if (this.mounted) {
                this.setState({
                    userPid: userPid,
                    userToken: userToken,
                    userAdmin: userAdmin,
                    isLoading: false
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.getToken();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingScreen />
            );
        }

        const navigation = this.props.navigation;

        return (
            <SafeAreaView style={styleGeneral.safeAreaView}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <ScrollView>
                        <View
                            style={{
                                alignItems: 'center',
                                paddingTop: 50,
                                paddingBottom: 40,
                            }}
                        >
                            <Image
                                source={require('../../assets/logo_bojong.png')}
                                style={{
                                    width: 200,
                                    height: 200
                                }}
                            />
                        </View>

                        {this.state.userAdmin == '1' ?
                            <View>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'green',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
                                        paddingVertical: 10,
                                    }}
                                    onPress={() => navigation.navigate('Admin')}
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Admin
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            : null}

                        <View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'green',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                    paddingVertical: 10,
                                }}
                                onPress={() => navigation.navigate('Setting')}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Setting
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    borderWidth: 2,
                                    borderColor: 'orange',
                                    borderRadius: 10,
                                    paddingVertical: 10,
                                    marginHorizontal: 15,
                                    marginTop: 50
                                }}
                                onPress={() => {
                                    AsyncStorage.removeItem('userPid');
                                    AsyncStorage.removeItem('userToken');
                                    navigation.navigate('SignIn');
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#333333'
                                    }}
                                >
                                    Sign Out
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text
                                style={{
                                    color: 'grey',
                                    textAlign: 'center',
                                    marginTop: 50,
                                }}
                            >
                                {global.appVersion}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );

    }

}