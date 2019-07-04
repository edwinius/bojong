import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

// Import Main screens
import Home from './screens/Home';
import Elapor from './screens/Elapor';
import NewsHome from './screens/NewsHome';
import TempatDetail from './screens/TempatDetail';
import Galeri from './screens/Galeri';
import GaleriDetail from './screens/GaleriDetail';
import TentangKami from './screens/TentangKami';

//Import Layanan Pages
import LayananPage from './screens/LayananPage';
import LayananUser from './screens/LayananUser';
import LayananUpload from './screens/layanan/LayananUpload';
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

// Setting
import Setting from './screens/Setting/Setting';
import SettingAkun from './screens/Setting/SettingAkun';
import SettingID from './screens/Setting/SettingID';
import SettingAkunDanID from './screens/Setting/SettingAkunDanID';
import KebijakanPrivasi from './screens/Setting/KebijakanPrivasi';
import PusatBantuan from './screens/Setting/PusatBantuan';
import SyaratDanKetentuan from './screens/Setting/SyaratDanKetentuan';
import Keluar from './screens/Setting/Keluar';

// Import Profile
import ProfileHome from './screens/ProfileHome';
import ProfileUser from './screens/ProfileUser';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SignUpCaptcha from './screens/SignUpCaptcha';
import SignUpKtp from './screens/SignUpKtp';
import SignUpPendudukNotFound from './screens/SignUpPendudukNotFound';

// Import News
import NewsDetail from './screens/NewsDetail';

// Admin
import AdminHome from './screens/admin/AdminHome';
import AdminLayanan from './screens/admin/AdminLayanan';
import AdminLayananList from './screens/admin/AdminLayananList';
import AdminLayananFiles from './screens/admin/AdminLayananFiles';
import AdminLayananOptions from './screens/admin/AdminLayananOptions';
import DataPenduduk from './screens/admin/DataPenduduk';
import DetailPenduduk from './screens/admin/DetailPenduduk';
import TempatIbadah from './screens/admin/TempatIbadah';
import TempatPariwisata from './screens/admin/TempatPariwisata';
import TempatKesehatan from './screens/admin/TempatKesehatan';
import TempatPendidikan from './screens/admin/TempatPendidikan';

// Menu Dinamis
import DinamisPenduduk from './screens/admin/DinamisPenduduk';
import DinamisPendudukKemiskinan from './screens/admin/DinamisPendudukKemiskinan';
import DinamisPendudukKelamin from './screens/admin/DinamisPendudukKelamin';
import DinamisPendudukKemiskinanDetail from './screens/admin/DinamisPendudukKemiskinanDetail';
import DinamisKesehatan from './screens/admin/DinamisKesehatan';
import DinamisPendidikan from './screens/admin/DinamisPendidikan';

import TestUpload from './screens/TestUpload';

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

// User
const UserScreen = createStackNavigator({
	ProfileUser: {
		screen: ProfileUser,
	},
	Setting: {
		screen: Setting,
	},
	SettingAkunDanID: {
		screen: SettingAkunDanID,
	},
	SettingAkun: {
		screen: SettingAkun,
	},
	SettingID: {
		screen: SettingID
	},
	SyaratDanKetentuan: {
		screen: SyaratDanKetentuan
	},
	KebijakanPrivasi: {
		screen: KebijakanPrivasi
	},
	PusatBantuan: {
		screen: PusatBantuan
	},
	Keluar: {
		screen: Keluar
	}
}, {
		headerMode: 'none',
});

export const UserContainer = createAppContainer(UserScreen);

// SignedOut
const SignedOutScreen = createStackNavigator({
	SignIn: {
		screen: SignIn,
	},
	SignUp: {
		screen: SignUp
	},
	SignUpCaptcha: {
		screen: SignUpCaptcha
	}
}, {
		headerMode: 'none',
	});

export const SignedOutContainer = createAppContainer(SignedOutScreen);

// Profile
const ProfileScreen = createSwitchNavigator({
	ProfileHome: {
		screen: ProfileHome,
	},
	SignedOut: {
		screen: SignedOutContainer
	},
	User: {
		screen: UserContainer
	},
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

// Galeri
const GaleriScreen = createStackNavigator({
	Galeri: {
		screen: Galeri,
	},
	GaleriDetail: {
		screen: GaleriDetail,
	}
}, {
	headerMode: 'none',
	mode: 'modal',
});

export const GaleriContainer = createAppContainer(GaleriScreen);

// NewsHome
const NewsScreen = createStackNavigator({
	NewsHome: {
		screen: NewsHome,
	},
	NewsDetail: {
		screen: NewsDetail
	}
}, {
	headerMode: 'none',
});

export const NewsContainer = createAppContainer(NewsScreen);

// Layanan
const LayananScreen = createSwitchNavigator({
	LayananPage: {
		screen: LayananPage
	},
	LayananUser: {
		screen: LayananUser,
	},
	LayananUpload: {
		screen: LayananUpload
	},
	SignUpKtp: {
		screen: SignUpKtp
	},
	SignUpPendudukNotFound: {
		screen: SignUpPendudukNotFound
	}
}, {
	headerMode: 'none',
});

export const LayananContainer = createAppContainer(LayananScreen);

// Home
const HomeScreen = createStackNavigator({
	Home: {
		screen: Home,
	},
	HomeDataPenduduk: {
		screen: DataPenduduk
	},
	HomeTempatIbadah: {
		screen: TempatIbadah
	},
	HomeTempatPariwisata: {
		screen: TempatPariwisata
	},
	HomeTempatKesehatan: {
		screen: TempatKesehatan
	},
	HomeTempatPendidikan: {
		screen: TempatPendidikan
	},
	TempatDetail: {
		screen: TempatDetail,
	},
	LayananContainer: {
		screen: LayananContainer
	},
	KtpPage: {
		screen: LayananUpload
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
	TestUpload: {
		screen: TestUpload
	},
	Elapor: {
		screen: ElaporContainer
	},
	TentangKami: {
		screen: TentangKami
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
					source={require('../assets/icons/home_black.png')}
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
			tabBarLabel: 'Berita',
			tabBarIcon: () =>
				<Image
					source={require('../assets/icons/news_black.png')}
					style={{
						width: 27,
						height: 27,
					}}
				/>
		}
	},
	Galeri: {
		screen: GaleriContainer,
		gesturesEnabled: false,
		navigationOptions: {
			tabBarLabel: 'Galeri',
			tabBarIcon: () =>
				<Image
					source={require('../assets/icons/galeri_black.png')}
					style={{
						width: 29,
						height: 25,
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
					source={require('../assets/icons/message_black.png')}
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
					source={require('../assets/icons/profile_black.png')}
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

// Admin
const AdminScreen = createStackNavigator({
	AdminHome: {
		screen: AdminHome,
	},
	AdminLayanan: {
		screen: AdminLayanan
	},
	AdminLayananList: {
		screen: AdminLayananList
	},
	AdminLayananFiles: {
		screen: AdminLayananFiles
	},
	AdminLayananOptions: {
		screen: AdminLayananOptions
	},
	DataPenduduk: {
		screen: DataPenduduk
	},
	DetailPenduduk: {
		screen: DetailPenduduk
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
	DinamisPendudukKemiskinan: {
		screen: DinamisPendudukKemiskinan
	},
	DinamisPendudukKemiskinanDetail: {
		screen: DinamisPendudukKemiskinanDetail
	},
	DinamisPendudukKelamin: {
		screen: DinamisPendudukKelamin
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

export const AdminContainer = createAppContainer(AdminScreen);

// SignedIn Screen
const SignedIn = createStackNavigator({
	SignedInHome: {
		screen: SignedInHomeContainer
	},
	Admin: {
		screen: AdminContainer
	}
}, {
		headerMode: 'none',
		mode: 'modal',
	});

export const SignedInContainer = createAppContainer(SignedIn);

// Root
export const createRootNavigator = (signedIn) => {
	return SignedInContainer;
}