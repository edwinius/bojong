import React from 'react';
import { 
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Banner from './common/Banner';

export default class ProfileHome extends React.Component{

    constructor(props) {
		super(props);
    }

    render() {
        return(
            <View
                style={{
                    flex: 1
                }}
            >
                <Banner />
                
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
        );
    }
}