import React from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

import globalConst from '../../globalConst';

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
        backgroundColor: globalConst.COLOR.SAFEAREA,
        height: 50,

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