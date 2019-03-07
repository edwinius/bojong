import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from './common/Banner';
import Header from './common/Header';

export default class DataPenduduk extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            data: []
        }
    }

    componentDidMount() {
		this.mounted = true;
		//this.getToken();
    }

    render() {
        const navigation = this.props.navigation;

        return(
            <View 
                style={{
                    flex: 1
                }}
            >
                <Banner />

                <Header 
					navigation={navigation} 
					title='Data Penduduk'
				/>

                <View
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                    }}
                >
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#cacaca',
                            borderRadius: 10,
                            height: 30,
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                        }}
                        placeholder='Cari Penduduk'
                    >
                        
                    </TextInput>
                </View>
                
                <ScrollView>
                    
                </ScrollView>
            </View>
        );
    }
}