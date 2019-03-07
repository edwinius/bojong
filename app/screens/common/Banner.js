import React from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

export default class Banner extends React.Component {
    render() {
        return(
            <SafeAreaView 
                style={ styles.banner }
                forceInset={{ top: 'always', bottom: 'never' }}
            >
				<StatusBar barStyle="light-content" />
			</SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: 'rgb(0, 61, 153)',

        ...Platform.select({
			android: {
				height: 30,
            },
            ios: {
                height: 0,
            }
		})
    }
});