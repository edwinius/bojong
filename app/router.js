import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

// Import Main screens
import Home from './screens/Home';
import DataPenduduk from './screens/DataPenduduk';
import TempatIbadah from './screens/TempatIbadah';
import TempatPariwisata from './screens/TempatPariwisata';
import TempatKesehatan from './screens/TempatKesehatan';
import TempatPendidikan from './screens/TempatPendidikan';

// Menu Dinamis
import DinamisPenduduk from './screens/DinamisPenduduk';
import DinamisKesehatan from './screens/DinamisKesehatan';
import DinamisPendidikan from './screens/DinamisPendidikan';

// Import Inbox
import InboxHome from './screens/InboxHome';

// Import Profile
import ProfileHome from './screens/ProfileHome';

// Inbox
const InboxScreen = createStackNavigator({
	InboxHome: {
		screen: InboxHome,
	},
}, {
	headerMode: 'none',
	mode: 'modal',
});

export const InboxContainer = createAppContainer(InboxScreen);

// Profile
const ProfileScreen = createStackNavigator({
	ProfileHome: {
		screen: ProfileHome,
	},
}, {
	headerMode: 'none',
	mode: 'modal',
});

export const ProfileContainer = createAppContainer(ProfileScreen);

// Home
const HomeScreen = createStackNavigator({
	Home: {
		screen: Home,
	},
	DataPenduduk: {
		screen: DataPenduduk
	},
	TempatIbadah: {
		screen: TempatIbadah
	},
	TempatPariwisata: {
		screen: TempatPariwisata
	},
	TempatKesehatan: {
		screen: TempatKesehatan
	},
	TempatPendidikan: {
		screen: TempatPendidikan
	},
	DinamisPenduduk: {
		screen: DinamisPenduduk
	},
	DinamisKesehatan: {
		screen: DinamisKesehatan
	},
	DinamisPendidikan: {
		screen: DinamisPendidikan
	}
}, {
	headerMode: 'none',
});

export const HomeContainer = createAppContainer(HomeScreen);

// SignedIn Home Tabs Screen
const SignedInHome = createBottomTabNavigator({
	Home: {
		screen: HomeContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Home',
		}
	},
	Inbox: {
		screen: InboxContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Inbox',
		}
	},
	Profile: {
		screen: ProfileContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Profile',
		}
	},
}, {
	tabBarOptions: {
		showIcon: true,
		style: {
			backgroundColor: '#ffffff',
			borderTopWidth: 0.5,
			borderColor: 'grey',
		},
		activeTintColor: '#ff4d4d',
		inactiveTintColor: 'grey',
		indicatorStyle: {
			backgroundColor: '#ff4d4d',
		},
		//scrollEnabled: true,
	}
});

export const SignedInHomeContainer = createAppContainer(SignedInHome);

// SignedIn Screen
const SignedIn = createStackNavigator({
    SignedInHome: {
		screen: SignedInHomeContainer
	}
}, {
    headerMode: 'none',
});

export const SignedInContainer = createAppContainer(SignedIn);

// Root
export const createRootNavigator = (signedIn) => {
	return SignedInContainer;
}