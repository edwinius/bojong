import React from 'react';
import { 
    AsyncStorage,
    Image,
    Platform,
    SafeAreaView,
    Text,
    View,
} from "react-native";

import Banner from './common/Banner';

export default class InboxHome extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            data: []
        }
    }

    render() {
        return(
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(52,73,100)',
                    ...Platform.select({
                        android: {
                            paddingTop: 30,
                        }
                    })
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
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
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: 50
                            }}
                        >
                            Belum ada pesan. Silahkan periksa lagi nanti.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}