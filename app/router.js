import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

// Import Main screens
import Home from './screens/Home';
import Elapor from './screens/Elapor';
import NewsHome from './screens/NewsHome';
import DataPenduduk from './screens/DataPenduduk';
import TempatIbadah from './screens/TempatIbadah';
import TempatPariwisata from './screens/TempatPariwisata';
import TempatKesehatan from './screens/TempatKesehatan';
import TempatPendidikan from './screens/TempatPendidikan';
import TempatDetail from './screens/TempatDetail';

//Import Layanan Pages
import LayananPage from './screens/LayananPage';
import KtpPage from './screens/layanan/KtpPage';
import KK from './screens/layanan/KK';
import PageSuratPindah from './screens/layanan/PageSuratPindah';
import ImbDibawah200m from './screens/layanan/ImbDibawah200m';
import ImbDiatas200m from './screens/layanan/ImbDiatas200m';
import Jampersal from './screens/layanan/Jampersal';
import SIUPdanTDP from './screens/layanan/SIUPdanTDP';
import VISUM from './screens/layanan/VISUM';
import PPATS from './screens/layanan/PPATS';
import PageAhliWaris from './screens/layanan/PageAhliWaris';
import PagePinjamBank from './screens/layanan/PagePinjamBank';
import IzinReklame from './screens/layanan/IzinReklame';
import IzinRame from './screens/layanan/IzinRame';

// Import Inbox
import InboxHome from './screens/InboxHome';

// Import Profile
import ProfileHome from './screens/ProfileHome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

// Admin
import AdminHome from './screens/admin/AdminHome';

// Menu Dinamis
import DinamisPenduduk from './screens/DinamisPenduduk';
import DinamisKesehatan from './screens/DinamisKesehatan';
import DinamisPendidikan from './screens/DinamisPendidikan';

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
	SignIn: {
		screen: SignIn,
	},
	SignUp: {
		screen: SignUp
	}
}, {
	headerMode: 'none',
});

export const ProfileContainer = createAppContainer(ProfileScreen);

// Elapor
const ElaporScreen = createStackNavigator({
	Elapor: {
		screen: Elapor,
	},
}, {
	headerMode: 'none',
	mode: 'modal',
});

export const ElaporContainer = createAppContainer(ElaporScreen);

// NewsHome
const NewsScreen = createStackNavigator({
	NewsHome: {
		screen: NewsHome,
	},
}, {
	headerMode: 'none',
	mode: 'modal',
});

export const NewsContainer = createAppContainer(NewsScreen);

// Home
const HomeScreen = createStackNavigator({
	Home: {
		screen: Home,
	},
	TempatDetail: {
		screen: TempatDetail,
	},
	LayananPage: {
		screen: LayananPage,
	},
	KtpPage: {
        screen: KtpPage
    },
    KK: {
        screen: KK
    },
    PageSuratPindah: {
        screen: PageSuratPindah
    },
    ImbDibawah200m: {
        screen: ImbDibawah200m
    },
    ImbDiatas200m: {
        screen: ImbDiatas200m
    },
    Jampersal: {
        screen: Jampersal
    },
    SIUPdanTDP: {
        screen: SIUPdanTDP
    },
    VISUM: {
        screen: VISUM
    },
    PPATS: {
        screen: PPATS
    },
    PageAhliWaris: {
        screen: PageAhliWaris
    },
    PagePinjamBank: {
        screen: PagePinjamBank
    },
    IzinReklame: {
        screen: IzinReklame
    },
    IzinRame: {
        screen: IzinRame
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
			tabBarIcon: () =>
				<Image
					source={ require('../assets/icons/home_black.png') }
					style={{
						width: 35,
						height: 35,
					}}
				/>
		}
	},
	News: {
		screen: NewsContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Berita  ',
			tabBarIcon: () =>
				<Image
					source={ require('../assets/icons/news_black.png') }
					style={{
						width: 27,
						height: 27,
					}}
				/>
		}
	},
	Elapor: {
		screen: ElaporContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Lapor',
			tabBarIcon: () =>
				<Image
					source={ require('../assets/icons/lapor_black.png') }
					style={{
						width: 30,
						height: 30,
					}}
				/>
		}
	},
	Inbox: {
		screen: InboxContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Inbox',
			tabBarIcon: () =>
				<Image
					source={ require('../assets/icons/message_black.png') }
					style={{
						width: 35,
						height: 35,
					}}
				/>
		}
	},
	Profile: {
		screen: ProfileContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: () =>
				<Image
					source={ require('../assets/icons/profile_black.png') }
					style={{
						width: 30,
						height: 30,
					}}
				/>
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