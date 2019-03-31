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

export default class NewsHome extends React.Component {

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
                        title="Berita"
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
                            
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}