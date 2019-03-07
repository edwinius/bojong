import React from 'react';
import { 
    AsyncStorage,
    Image,
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
            <View
                style={{
                    flex: 1
                }}
            >
                <Banner />

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
        );
    }
}