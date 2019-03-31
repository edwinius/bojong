import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';
import BackBtn from './common/BackBtn';

const styleGeneral = require('./styles/StyleGeneral');

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

export default class TempatDetail extends React.Component {

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
                    <BackBtn
                        title={navigation.state.params.title}
                        navigation={navigation}
                        back={true}
                    />

                    <ScrollView>
                        <View>
                            <Image
                                source={navigation.state.params.img}
                                style={{
                                    width: dWidth,
                                    height: dWidth * 0.6
                                }}
                            />
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    paddingVertical: 10,
                                    fontSize: 20,
                                }}
                            >
                                { navigation.state.params.title }
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}