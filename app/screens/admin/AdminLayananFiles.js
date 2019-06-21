import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from '../common/Banner';
import Header from '../common/Header';
import LoadingScreen from '../common/LoadingScreen';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

export default class AdminLayanan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;
            let pid = navigation.state.params.pid;

            fetch(`${global.api}fetch_data`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					appToken: global.appToken,
                    table: 'appDetailLayanan',
                    data: {
                        pid: pid
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				
				if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
							isLoading: false,
                            data: responseJson['data']
						});
					}
				}
			}).catch((error) => {
				console.error(error);
			});
			
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

    _ShowData() {
        const navigation = this.props.navigation;
        let that = this;

        if(this.state.data.length > 0) {
            let type = this.state.data[0].layanan_type;
            let files = [];

            switch(type) {
                case '1':
                    // KTP
                    files = [
                        {
                            txt: 'Kartu Keluarga',
                            col: 'kk'
                        },
                        {
                            txt: 'Fotocopy Buku Nikah / Akta Perkawinan bagi penduduk yang belum berumur 17 tahun, tetapi pernah kawin atau sudah kawin',
                            col: 'buku_nikah'
                        },
                        {
                            txt: 'Fotocopy Akta Kelahiran',
                            col: 'akta_lahir'
                        },
                        {
                            txt: 'FC surat bukti / keterangan peristiwa penting atau kependudukan yang dialami',
                            col: 'surat_keterangan'
                        },
                        {
                            txt: 'Bagi orang asing tinggal tetap, mohon upload FC KITAP',
                            col: 'kitap'
                        },
                        {
                            txt: 'Bagi orang asing tinggal tetap, mohon upload FC SKTT',
                            col: 'sktt'
                        }
                    ];
                    break;
                case '2':
                    // KK
                    files = [
                        {
                            txt: 'Surat Pengantar dari RT',
                            col: 'surat_rt'
                        }, {
                            txt: 'Surat Pengantar dari RW',
                            col: 'surat_rw'
                        }, {
                            txt: 'Surat Pengantar dari Desa',
                            col: 'surat_desa'
                        }, {
                            txt: 'Surat Pindah bagi pendatang',
                            col: 'surat_pindah'
                        }, {
                            txt: 'Akta Nikah',
                            col: 'akta_nikah'
                        }, {
                            txt: 'Surat keterangan kehilangan bagi yang hilang',
                            col: 'surat_kehilangan'
                        }, {
                            txt: 'Upload foto e-KTP',
                            col: 'ktp'
                        }, {
                            txt: 'Data Penunjang',
                            col: 'data_penunjang'
                        }, {
                            txt: 'KK suami yang baru nikah',
                            col: 'kk_suami'
                        }, {
                            txt: 'KK istri yang baru nikah',
                            col: 'kk_istri'
                        }, {
                            txt: 'Surat Keterangan lahir dari Bidan/Desa buat penambahan anggota',
                            col: 'keterangan_lahir'
                        }
                    ];
                    break;
                case '3':
                    // Surat Pindah
                    files = [
                        {
                            txt: 'Surat Pengantar dari Desa',
                            col: 'surat_desa'
                        }, {
                            txt: 'Kartu Keluarga',
                            col: 'kk'
                        }, {
                            txt: 'Foto e-KTP',
                            col: 'ktp'
                        }, {
                            txt: 'Pernyataan Pindah bersangkutan/alasan pindah diatas meterai 6.000',
                            col: 'pp'
                        }
                    ];
                    break;
                case '4':
                case '5':
                    // IMB
                    files = [
                        {
                            txt: 'KTP',
                            col: 'ktp'
                        }, {
                            txt: 'Surat Tanah AJB',
                            col: 'tanah_ajb'
                        }, {
                            txt: 'Surat Tanah SHM',
                            col: 'tanah_shm'
                        }, {
                            txt: 'Surat Tanah Letter C',
                            col: 'tanah_letter_c'
                        }, {
                            txt: 'Surat Sewa Menyewa',
                            col: 'tanah_sewa_menyewa'
                        }, {
                            txt: 'Surat Keterangan Tanah Tidak Sengketa',
                            col: 'tanah_tidak_sengketa'
                        }, {
                            txt: 'SPPT PBB Terakhir',
                            col: 'sppt_pbb'
                        }, {
                            txt: 'STTS PBB',
                            col: 'stts_pbb'
                        }, {
                            txt: 'Gambar Konstruksi Bangunan',
                            col: 'gambar_konstruksi'
                        }, {
                            txt: 'Surat Izin Tetangga / Lingkungan',
                            col: 'izin_tetangga'
                        }
                    ];
                    break;
                case '6':
                    // PPATS
                    files = [
                        {
                            txt: 'KTP Penjual',
                            col: 'ktp_penjual'
                        }, {
                            txt: 'KTP Istri Penjual',
                            col: 'ktp_penjual_istri'
                        }, {
                            txt: 'KTP Pembeli',
                            col: 'ktp'
                        }, {
                            txt: 'KTP Istri / Persetujuan / Ahli Waris Pembeli',
                            col: 'ktp_pembeli_pair'
                        }, {
                            txt: 'Kartu Keluarga',
                            col: 'kk'
                        }, {
                            txt: 'Akta Nikah',
                            col: 'akta_nikah'
                        }, {
                            txt: 'NPWP',
                            col: 'npwp'
                        }, {
                            txt: 'SPPT Tahun Berjalan',
                            col: 'sppt'
                        }, {
                            txt: 'Kwitansi Bukti Pembayaran',
                            col: 'kwitansi_pembayaran'
                        }, {
                            txt: 'Register Desa',
                            col: 'register_desa'
                        }, {
                            txt: 'Register Kecamatan',
                            col: 'register_kecamatan'
                        }, {
                            txt: 'Buku Letter C',
                            col: 'tanah_letter_c'
                        }, {
                            txt: 'Sertifikat / Bukti Kepemilikan Tanah Lainnya',
                            col: 'tanah_sertifikat_lain'
                        }, {
                            txt: 'Surat Pernyataan Tidak Sengketa',
                            col: 'tanah_tidak_sengketa'
                        }, {
                            txt: 'Surat Keterangan Riwayat Tanah',
                            col: 'tanah_riwayat'
                        }, {
                            txt: 'Surat Keterangan Kepala Desa',
                            col: 'surat_desa'
                        }, {
                            txt: 'Surat Pernyataan Penguasaan dan Kepemilikan Tanah',
                            col: 'tanah_kepemilikan'
                        }, {
                            txt: 'Surat Kuasa Menghadap',
                            col: 'surat_kuasa'
                        }, {
                            txt: 'Surat Pernyataan Persetujuan Menjual',
                            col: 'tanah_pernyataan_menjual'
                        }, {
                            txt: 'Surat Pernyataan Tidak Memegang Hak Guntai Tanah',
                            col: 'tanah_pernyataan_tidak_hak'
                        }, {
                            txt: 'Foto Berita Acara Pengecekan Lokasi Tanah di Lapangan',
                            col: 'tanah_foto_pengecekan'
                        }, {
                            txt: 'Peta Kasar Tanah',
                            col: 'tanah_peta_kasar'
                        }, {
                            txt: 'Surat Pernyataan telah menerima Akta',
                            col: 'tanah_menerima_akta'
                        }, {
                            txt: 'Surat Kuasa Ahli Waris (bila diperlukan)',
                            col: 'surat_kuasa_ahliwaris'
                        }, {
                            txt: 'Surat Kuasa Waris (bila diperlukan)',
                            col: 'surat_kuasa_waris'
                        }, {
                            txt: 'Surat Keterangan waris dari Kepala Desa (bila diperlukan)',
                            col: 'surat_waris'
                        }, {
                            txt: 'qweqwrwqrewrewrewrwerw',
                            col: 'tanah_kepemilikan'
                        }, {
                            txt: 'BPHTB',
                            col: 'bphtb'
                        }, {
                            txt: 'SSPD',
                            col: 'sspd'
                        }, {
                            txt: 'SSP/PPh',
                            col: 'ssp'
                        }, {
                            txt: 'Surat Keterangan Beda Biodata Subjek dan Objek Tanah dari Kepala Desa (bila diperlukan)',
                            col: 'tanah_keterangan_beda_biodata'
                        }, {
                            txt: 'DKHP Tahun berjalan (bila diperlukan)',
                            col: 'dkhp'
                        }
                    ];
                    break;
                case '7':
                    // Jampersal / KIS
                    files = [
                        {
                            txt: 'Surat Pengantar dari Kepala Desa',
                            col: 'surat_desa'
                        }, {
                            txt: 'KTP',
                            col: 'ktp'
                        }, {
                            txt: 'Surat Pernyataan Tidak Mampu dari pemohon diketahui Ketua RT, Ketua RW, TKSK Kades/Lurah, dan Camat',
                            col: 'pernyataan_tidak_mampu'
                        }, {
                            txt: 'Surat Rujukan dari puskesmas setempat, bagi yang berobat ke Rumah Sakit',
                            col: 'surat_rujukan'
                        }, 
                    ];
                    break;
                case '8':
                    // SIUP > 200
                    files = [
                        {
                            txt: 'KTP',
                            col: 'ktp'
                        }, {
                            txt: 'Surat Tanah AJB',
                            col: 'tanah_ajb'
                        }, {
                            txt: 'Surat Tanah SHM',
                            col: 'tanah_shm'
                        }, {
                            txt: 'Surat Sewa Menyewa',
                            col: 'tanah_sewa_menyewa'
                        }, {
                            txt: 'SPPT Terakhir',
                            col: 'sppt'
                        }, {
                            txt: 'STTS',
                            col: 'stts_pbb'
                        }, {
                            txt: 'Surat Izin Tetangga',
                            col: 'izin_tetangga'
                        }, {
                            txt: 'IMB',
                            col: 'imb'
                        }, {
                            txt: 'Akta pendirian perusahaan / domisili bagi perorangan',
                            col: 'akta_perusahaan'
                        }, 
                    ];
                    break;
                case '9':
                    // VISUM
                    files = [
                        {
                            txt: 'Surat permohonan visum dari Direktur CV kepada Camat',
                            col: 'permohonan_visum'
                        }, {
                            txt: 'Surat Perintah Kerja / Mulai Kerja (SPK/SPMK)',
                            col: 'spk'
                        }, {
                            txt: 'Berita Acara / Surat Penyerahan Lapangan (BAPL/SPL)',
                            col: 'bapl_spl'
                        }, {
                            txt: 'Dokumentasi pelaksanaan pekerjaan',
                            col: 'dokumentasi_pekerjaan'
                        }, {
                            txt: 'Surat Pernyataan Penyelesaian Pekerjaan yg di TTD Pengawas Lapangan',
                            col: 'pernyataan_penyelesaian_pekerjaan'
                        }, {
                            txt: 'Surat Keterangan Penyelesaian Pekerjaan dan tidak memiliki hutang-piutang dengan masyarakat oleh Kepala Desa',
                            col: 'pekerjaan_hutang_piutang'
                        }, 
                    ];
                    break;
                case '10':
                    // Ahliwaris
                    files = [
                        {
                            txt: 'Berkas yang sudah ditandatangani oleh yang bersangkutan',
                            col: 'berkas_ttd'
                        }, {
                            txt: 'KTP',
                            col: 'ktp'
                        }, {
                            txt: 'Kartu Keluarga',
                            col: 'kk'
                        }, {
                            txt: 'Surat keterangan kematian dari desa',
                            col: 'keterangan_kematian'
                        }, 
                    ];
                    break;
                case '11':
                    // Pinjam Bank
                    files = [
                        {
                            txt: 'Foto berkas yang sudah ditandatangani oleh yang bersangkutan',
                            col: 'berkas_ttd'
                        }, {
                            txt: 'KTP',
                            col: 'ktp'
                        }, {
                            txt: 'Kartu Keluarga',
                            col: 'kk'
                        }, {
                            txt: 'Surat keterangan dari desa',
                            col: 'surat_desa'
                        }, {
                            txt: 'Surat Tanah AJB',
                            col: 'tanah_ajb'
                        }, 
                    ];
                    break;
                case '12':
                    // Reklame
                    files = [
                        {
                            txt: 'KTP',
                            col: 'ktp'
                        },
                        {
                            txt: 'NPWP',
                            col: 'npwp'
                        },
                        {
                            txt: 'Jenis Reklame dan gambar serta gambaran dasar konstruksi yang akan dibangun',
                            col: 'jenis_reklame'
                        },
                        {
                            txt: 'Foto Lokasi pemasangan yang diinginkan',
                            col: 'reklame_foto_lokasi'
                        },
                        {
                            txt: 'Surat Pernyataan Tidak Keberatan dari pemilik tanah / bangunan yang akan dipakai pemasangan Reklame bagi pemasangan milik pihak lain',
                            col: 'reklame_tidak_keberatan'
                        },
                        {
                            txt: 'Surat Rekomendasi dari OPD terkait',
                            col: 'rekomendasi_opd'
                        }
                    ];
                    break;
                case '13':
                    // Izin rame - rame
                    files = [
                        {
                            txt: 'Berkas Izin Rame-Rame yang sudah ditanga tangani Kepala Desa dan dilengkapi surat persetujuan tidak keberatan warga sekitar',
                            col: 'berkas_ttd'
                        },
                    ];
                    break;
            }

            if(files.length > 0) {
                const content = files.map(function(v, i) {
                    let file = that.state.data[0][`user_${v.col}`];

                    return(
                        <View
                            key={ i }
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical: 10,
                                    borderBottomWidth: 1,
                                    borderColor: '#e0e0e0'
                                }}
                            >
                                <Text>
                                    { v.txt }
                                </Text>
                            </View>

                            <View
                                style={{
                                    width: '100%',
                                    height: 200,
                                    marginTop: 5,
                                }}
                            >
                                { file != null ?
                                    <Image
                                        source={{ uri: `${global.s3}${v.col}/${that.state.data[0].user_pid}/${file}`}}
                                        style={{
                                            flex: 1,
                                        }}
                                        resizeMode='contain'
                                    />
                                : 
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            paddingTop: 40,
                                        }}
                                    >
                                        Tidak ada dokumen.
                                    </Text>
                                }
                            </View>
                        </View>
                    );
                });

                return (content);
            };
        } else {
            return(<Text>No Data</Text>)
        }
    }

    _SubmitLayanan = (status) => {
        let pid = this.state.data[0].layanan_pid;

        this.setState({
            isLoading: true,
        })

        fetch(`${global.api}update_data`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appToken: global.appToken,
                table: 'layanan',
                data: {
                    data: {
                        layanan_pid: pid,
                        del: status
                    }
                }
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            
            if(responseJson['status'] == '200') {        
        		this.getToken();
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        if(this.state.isLoading) {
			return( <LoadingScreen /> );
        }

        const navigation = this.props.navigation;
        let status = navigation.state.params.status;

        return(
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" />

                <View 
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
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
                            { this._ShowData() }
                        </View>
                    </ScrollView>

                    <SafeAreaView
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 5,
                        }}
                    >
                        { this.state.data[0].del == '2' || (this.state.data[0].del == '3' && status == '3') ?
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    paddingHorizontal: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={[ styles.btnLayanan, 
                                    {
                                        backgroundColor: 'green'
                                    }]}
                                    onPress={ () => this._SubmitLayanan(`${status == '3' ? '5' : '3'}`) }
                                >
                                    <Text
                                        style={[ styles.txtBtnLayanan,
                                        {
                                            color: 'white'
                                        }]}
                                    >
                                        { status == '3' ? 'Otorisasi' : 'Terima' }
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[ styles.btnLayanan, 
                                    {
                                        backgroundColor: 'white'
                                    }]}
                                    onPress={ () => this._SubmitLayanan('4') }
                                >
                                    <Text
                                        style={[ styles.txtBtnLayanan,
                                        {
                                            color: 'green'
                                        }]}
                                    >
                                        Tolak
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        :
                            <View
                                style={{
                                    alignItems: 'center',
                                    flex: 1,
                                    backgroundColor: `${ this.state.data[0].del == '3' || this.state.data[0].del == '5' ? '#99ff99' : '#e0e0e0' }`,
                                    paddingVertical: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                    }}
                                >
                                    Pengajuan ini telah 
                                    { this.state.data[0].del == '3' || this.state.data[0].del == '5' ? ' Diterima' : ' Ditolak' }
                                </Text>
                            </View>
                        }
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnLayanan: {
        borderRadius: 15,
        paddingVertical: 5,
        alignItems: 'center',
        marginHorizontal: 10,
        flex: 1,
        borderWidth: 2,
        borderColor: 'green'
    },
    txtBtnLayanan: {
        fontWeight: 'bold',
        fontSize: 15,
    }
});