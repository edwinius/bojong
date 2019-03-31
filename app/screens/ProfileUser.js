import React from 'react';
import {
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
            isLoading: false,
        }
    }

    render() {
        if(this.state.isLoading) {
			return(
				<LoadingScreen />
			);
		}

        const navigation = this.props.navigation;
		
		return(
			<SafeAreaView style={ styleGeneral.safeAreaView }>
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
                                source={ require('../../assets/logo_bojong.png') }
                                style={{
                                    width: 200,
                                    height: 200
                                }}
                            />
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
                            >
                                <Text
                                    style={{
                                        color: '#333333'
                                    }}
                                >
                                    Sign In
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
                                { global.appVersion }
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
            
    }

}