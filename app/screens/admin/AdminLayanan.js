import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from '../common/Banner';
import Header from '../common/Header';

export default class AdminLayanan extends React.Component {

    _ShowButtons() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Perekaman e-KTP',
                btnPage: 'KtpPage',
                type: '1',
                title: 'KTP'
            },
            {
                btnName: 'Pembuatan KK',
                btnPage: 'KK',
                type: '2',
                title: 'KK'
            },
            {
                btnName: 'Penerbitan Surat Pindah',
                btnPage: 'PageSuratPindah',
                type: '3',
                title: 'Surat Pindah'
            },
            {
                btnName: 'Pembuatan IMB dibawah 200m2',
                btnPage: 'ImbDibawah200m',
                type: '4',
                title: 'IMB < 200m'
            },
            {
                btnName: 'Pembuatan IMB diatas 200m2',
                btnPage: 'ImbDiatas200m',
                type: '5',
                title: 'IMB > 200m'
            },
            {
                btnName: 'PPATS',
                btnPage: 'PPATS',
                type: '6',
                title: 'PPATS'
            },
            {
                btnName: 'Surat Keterangan Jampersal',
                btnPage: 'Jampersal',
                type: '7',
                title: 'Jampersal / KIS'
            },
            {
                btnName: 'Pembuatan SIUP/TDP',
                btnPage: 'SIUPdanTDP',
                type: '8',
                title: 'SIUP/TDP'
            },
            {
                btnName: 'VISUM',
                btnPage: 'VISUM',
                type: '9',
                title: 'VISUM'
            },
            {
                btnName: 'Surat Keterangan Ahli Waris',
                btnPage: 'PageAhliWaris',
                type: '10',
                title: 'Ahliwaris'
            },
            {
                btnName: 'Surat Keterangan Pinjam ke Bank',
                btnPage: 'PagePinjamBank',
                type: '11',
                title: 'SK Pinjam'
            },
            {
                btnName: 'Izin Reklame Tanpa Sponsor',
                btnPage: 'IzinReklame',
                type: '12',
                title: 'Izin Reklame'
            },
            {
                btnName: 'Rekomendasi Izin Rame-Rame',
                btnPage: 'IzinRame',
                type: '13',
                title: 'Izin'
            }
        ];

        const btn = buttons.map(function (item, index) {
            return (
                <TouchableOpacity
                    key={ index }
                    onPress={ () => navigation.navigate('AdminLayananList',
                    {
                        type: item.type,
                        title: item.title
                    })}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#e0e0e0',
                        paddingHorizontal: 22,
                        paddingVertical: 12,
                    }}
                >
                    <Text>
                        { item.btnName }
                    </Text>
                </TouchableOpacity>
            )
        });

        return (btn);
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
					title='Pengajuan'
                    back={true}
				/>
                
                <ScrollView>
                    <View 
                        
                    >
                        { this._ShowButtons() }
                    </View>
                </ScrollView>
            </View>
        );
    }

}