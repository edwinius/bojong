import React from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const Header = ({ navigation, title }) => ( 
	<View
        style={{
            flexDirection: 'row',
            shadowColor: 'grey',
            shadowOffset: { width: 1.5, height: 1.5 },
            shadowRadius: 2,
            shadowOpacity: 0.35,
            elevation: 3,
            backgroundColor: 'white',
            zIndex: 4,
        }}
	>
		<TouchableOpacity
            onPress={ () => navigation.goBack(null) }
            style={ styles.topSegment }
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 18
                }}
            >
                {'<'}
            </Text>
        </TouchableOpacity>

		<View style={ styles.topSegmentMid }>
            <Text style={ styles.headerTitle }>
                { title }
            </Text>
        </View>

		<View style={ styles.topSegment }></View>
	</View>
);

export default Header;

const styles = StyleSheet.create({
    topSegment: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    topSegmentMid: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    headerTitle: {
        color: '#666666',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});