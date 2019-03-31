import React from 'react';
import { 
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Carousel from 'react-native-banner-carousel';

import Banner from '../common/Banner';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;
const bannerHeight = dWidth * 0.67;

export default class Home extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
			imageOpacity: 0,
			contentSize: 0,
		}
    }

    _ShowMenuStatis() {
        const navigation = this.props.navigation;

        const arrMenuStatis = [
            {
                menuName: 'Penduduk',
                menuImg: require('../../../assets/icons/icon_umum.png'),
                menuScreen: 'DataPenduduk'
            },
            {
                menuName: 'Kesehatan',
                menuImg: require('../../../assets/icons/icon_kesehatan.png'),
                menuScreen: 'TempatKesehatan'
            },
            {
                menuName: 'Pendidikan',
                menuImg: require('../../../assets/icons/icon_pendidikan.png'),
                menuScreen: 'TempatPendidikan'
            },
            {
                menuName: 'Pariwisata',
                menuImg: require('../../../assets/icons/icon_pariwisata.png'),
                menuScreen: 'TempatPariwisata'
            },
            {
                menuName: 'Tempat Ibadah',
                menuImg: require('../../../assets/icons/icon_ibadah.png'),
                menuScreen: 'TempatIbadah'
            },
            {
                menuName: 'Pembangunan',
                menuImg: require('../../../assets/icons/icon_pembangunan.png'),
                menuScreen: 'TempatIbadah'
            }
        ];

        const contentMenuStatis = arrMenuStatis.map(function(statis, index) {
            return(
                <TouchableOpacity
                    key={ index }
                    style={ styles.btnMenu }
                    onPress={() => navigation.navigate(`${statis.menuScreen}`)}
                >
                    <View style={ styles.containerIconMenu }>
                        <Image
                            style={ styles.iconMenu } 
                            source={ statis.menuImg }
                            resizeMode='contain'
                        />
                    </View>
                    <View style={ styles.containerTxtMenu }>
                        <Text style={ styles.txtMenu }>
                            { statis.menuName }
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return contentMenuStatis;
    }

    _ShowMenuDinamis() {
        const navigation = this.props.navigation;

        const arrMenuDinamis = [
            {
                menuName: 'Penduduk',
                menuImg: require('../../../assets/icons/icon_umum.png'),
                menuScreen: 'DinamisPenduduk'
            },
            {
                menuName: 'Kesehatan',
                menuImg: require('../../../assets/icons/icon_kesehatan.png'),
                menuScreen: 'DinamisKesehatan'
            },
            {
                menuName: 'Pendidikan',
                menuImg: require('../../../assets/icons/icon_pendidikan.png'),
                menuScreen: 'DinamisPendidikan'
            }
        ];

        const contentMenuDinamis = arrMenuDinamis.map(function(statis, index) {
            return(
                <TouchableOpacity
                    key={ index }
                    style={ styles.btnMenu }
                    onPress={() => navigation.navigate(`${statis.menuScreen}`)}
                >
                    <View style={ styles.containerIconMenu }>
                        <Image
                            style={ styles.iconMenu } 
                            source={ statis.menuImg }
                            resizeMode='contain'
                        />
                    </View>
                    <View style={ styles.containerTxtMenu }>
                        <Text style={ styles.txtMenu }>
                            { statis.menuName }
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return contentMenuDinamis;
    }

    onScroll(event) {
		const scrollY = event.nativeEvent.contentOffset.y;
		let layoutHeight = event.nativeEvent.layoutMeasurement.height;
		let contentSize = event.nativeEvent.contentSize.height;

		let stateContentSize = this.state.contentSize;

		// Change top search opacity
		if (scrollY >= 0) {
			let newOpacity = (scrollY / 250.0);
			if (newOpacity < 0) newOpacity = 0;
			this.setState({
				imageOpacity: newOpacity,
			});
		} else {
			this.setState({
			  imageOpacity: 0
			});
		}
	}

    render() {
        const bannerImages = ['foto1', 'foto2', 'foto3', 'foto4'];
        const bannerImages2 = [
            require('../../../assets/images/foto1.png'),
            require('../../../assets/images/foto2.png'),
            require('../../../assets/images/foto3.png'),
            require('../../../assets/images/foto4.png')
        ];
		
		const contentBanner = bannerImages2.map(function(item, index) {
			return(
				<Image 
					key={ index }
					style={{ width: dWidth, height: bannerHeight }}
                    //source={{ uri: `${global.uri}assets/images/site/${item}.png`}}
                    source={ item }
					resizeMode='contain'
				/>
			);
        });
        
        return(
            <View
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        height: 50,
                        left: 0,
                        width: '100%',
                        position: 'absolute',
                        zIndex: 5,
                        top: 0
                    }}
                >
                    <Banner />

                    <View
                        style={{
                            height: 50,
                            backgroundColor: `rgba(0, 61, 153, ${this.state.imageOpacity})`,
                        }}
                    >
                        <TextInput
                            style={{
                                height: 50,
                                flex: 1,
                                borderRadius: 15,
                                borderColor: '#cacaca',
                                borderWidth: 1,
                                paddingHorizontal: 20,
                                shadowColor: 'grey',
                                shadowOffset: { width: 1.5, height: 1.5 },
                                shadowRadius: 2,
                                shadowOpacity: 0.35,
                                elevation: 3,
                                marginVertical: 10,
                                marginHorizontal: 15,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)'
                            }}
                            placeholder='Search'
                        ></TextInput>
                    </View>
                </View>

                <SafeAreaView
                    forceInset={{ top: 'always', bottom: 'never' }}
                    style={{
                        ...Platform.select({
                            android: {
                                paddingTop: 30
                            }
                        })
                    }}
                >
                    <ScrollView
                        onScroll={this.onScroll.bind(this)}
                        scrollEventThrottle={16}
                        style={{
                            backgroundColor: 'white',
                        }}
                    >
                        <View style={ styles.containerCarousel }>
							<Carousel
								autoplay
								autoplayTimeout={2000}
								loop
								index={0}
								pageSize={dWidth}
							>
								{ contentBanner }
							</Carousel>
						</View>

                        <View
                            style={{
                                paddingBottom: 25,
                            }}
                        >
                            <View>
                                <View style={ styles.containerTxtMenuHeader }>
                                    <Text style={ styles.txtMenuHeader }>Data Statis</Text>
                                </View>

                                <View style={ styles.containerMenu }>
                                    { this._ShowMenuStatis() }
                                </View>
                            </View>

                            <View>
                                <View style={ styles.containerTxtMenuHeader }>
                                    <Text style={ styles.txtMenuHeader }>Data Dinamis</Text>
                                </View>
                                
                                <View style={ styles.containerMenu }>
                                    { this._ShowMenuDinamis() }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    containerTxtMenuHeader: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 15
    },
    txtMenuHeader: {
        color: '#404040',
        fontWeight: 'bold',
        fontSize: 23,
    },
    containerMenu: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    btnMenu: {
        shadowColor: 'grey',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowRadius: 2,
        shadowOpacity: 0.35,
        elevation: 3,
        width: dWidth * 0.3,
        height: dWidth * 0.3,
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 10,
    },
    containerIconMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconMenu: {
        width: '40%'
    },
    containerTxtMenu: {
        textAlign: 'center',
        backgroundColor: 'white',
        paddingVertical: 8,
    },
    txtMenu: {
        textAlign: 'center'
    },

    // Carousel
	containerCarousel: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		elevation: 10,
		shadowColor: 'grey',
		shadowOffset: { width: 1.5, height: 2 },
		shadowRadius: 2,
		shadowOpacity: 0.85,
	},
});