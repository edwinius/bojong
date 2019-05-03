import React from 'react';
import { 
    Text,
	View
} from 'react-native';

const NoData = ({ text }) => (
    <View 
        style={{
            alignItems: 'center',
            paddingVertical: 20,
            flex: 1
        }}
    >
		<Text>
            { text }
        </Text>
	</View>
);

export default NoData;