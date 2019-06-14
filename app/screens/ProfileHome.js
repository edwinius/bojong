import React from 'react';
import { 
    AsyncStorage,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Banner from './common/Banner';
import SignIn from './SignIn';
import ProfileUser from './ProfileUser';

export default class ProfileHome extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            userPid: null,
            userToken: null,
        }
    }

    async getToken() {
		try {
			const navigation = this.props.navigation;
			let userPid = await AsyncStorage.getItem('userPid');
            let userToken = await AsyncStorage.getItem('userToken');

            // If not logged set userPid & userToken to 0
			if(userPid == null || userPid == '' || userToken == null || userToken == '') {
				userPid = '',
				userToken = ''
            }
            
            this.setState({
                userPid: userPid,
                userToken: userToken
            })
        } catch(error) {
			console.log(error);
		}
    }
    
    componentDidMount() {
		this.mounted = true;
		this.getToken();
    }
    
    componentWillUnmount() {
		this.mounted = false;
    }
    
    _LoadScreen() {
        const navigation = this.props.navigation;
        
        if(this.state.userPid != '' && this.state.userPid != null && this.state.userToken != '') {
            return(<ProfileUser navigation={navigation} />);
        } else {
            return(<SignIn navigation={navigation} />);
        }
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                { this._LoadScreen() }
            </View>
        );
    }
}