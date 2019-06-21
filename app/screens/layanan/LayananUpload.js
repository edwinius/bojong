import React from 'react';
import {
    ActionSheetIOS,
    Alert,
    AsyncStorage,
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { ImagePicker } from 'expo';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

import LoadingScreen from '../common/LoadingScreen';
import LayananForm from '../common/LayananForm';
import BackBtn from '../common/BackBtn';

export default class LayananUpload extends React.Component {
    render() {
		
		const navigation = this.props.navigation;
			
		return(
			<ActionSheetProvider>
				<LayananUploadApp navigation={ navigation } />
			</ActionSheetProvider>
		);
	}
}

@connectActionSheet
class LayananUploadApp extends React.Component {

    constructor(props) {
		super(props)
		this.state = {
            isLoading: true,
            imageSource: '',
            imageUri: '',
            imageName: '',
            imageType: '',
            arrImg: [],
            userPid: '',
            userToken: '',
            layananType: '',
            layananFiles: []
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;
            let layananPid = navigation.state.params.layananPid;

			let userPid = await AsyncStorage.getItem('userPid');
            let userToken = await AsyncStorage.getItem('userToken');

            // If not logged set userPid & userToken to 0
			if(userPid == null || userPid == '' || userToken == null || userToken == '') {
				userPid = '',
				userToken = ''
            }

            // Fetch home data
			fetch(`${global.api}fetch_data`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					appToken: global.appToken,
                    table: 'layanan_detail',
                    data: {
                        layanan_pid: layananPid
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson);
                
                if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
							isLoading: false,
                            userPid: userPid,
                            userToken: userToken,
                            layananFiles: responseJson['data']
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
    
    componentWillUnmount() {
		this.mounted = false;
    }

    async getPermissionAsync() {
		const { CAMERA_ROLL, Permissions } = Expo;
		try {
			const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			return(status);
		} catch(e) {
			console.log(e);
		}
		
		if (status === 'granted') {
			return CAMERA_ROLL.getCurrentPositionAsync({enableHighAccuracy: true});
		} else {
			throw new Error('Camera Roll permission not granted');
		}
	}
	
	async getPermissionCamera() {
		const { CAMERA, Permissions } = Expo;
		try {
			const status = await Permissions.askAsync(Permissions.CAMERA);
			return(status);
		} catch(e) {
			console.log(e);
		}
		
		if (status === 'granted') {
			return CAMERA.getCurrentPositionAsync({enableHighAccuracy: true});
		} else {
			throw new Error('Camera permission not granted');
		}
    }
    
    componentDidMount() {
		this.getPermissionAsync();
        this.getPermissionCamera();
		this.mounted = true;
		this.getToken();
    }

    _SubmitLayanan_V1 = () => {
        const { arrImg, userPid } = this.state;
        const navigation = this.props.navigation;
        
        //console.log(this.state);
        this.setState({
            isLoading: true
        });

        // Upload Image
        let formData = new FormData();

        /*formData.append('file_ktp', {
            uri: (Platform.OS === 'android' ? 'file://' : '') + imageUri,
            type: imageType,
            name: imageName,
            tmp_name: (Platform.OS === 'android' ? 'file://' : '') + imageUri
        });*/

        {/*if(arrImg.length > 0) {
            arrImg.map(function(v, i) {
                formData.append('file[]', {
                    uri: v.imageUri,
                    type: v.imageType,
                    name: v.imageName,
                    tmp_name: v.imageUri
                });
            });
        } else {
            Alert.alert('Mohon Upload File');
        }*/}

        formData.append('file', {
            uri: arrImg[0].imageUri.replace("file://", ""),
            type: arrImg[0].imageType,
            name: arrImg[0].imageName,
            tmp_name: arrImg[0].imageUri.replace("file://", "")
        });

        formData.append('user_pid', userPid);
        formData.append('layanan_type', '1');

        fetch(`${global.api}data_controller/upload_layanan_app2`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
            /*header: {
                'Content-Type': 'multipart/form-data'
            }*/
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            //console.log(this.state);
            console.log(formData);

            Alert.alert('Pengajuan anda telah berhasil di submit. Silahkan menunggu review dari kami. Terima kasih :)');
            navigation.goBack(null);
        });
    }

    _SubmitLayanan = () => {
        const navigation = this.props.navigation;

        Alert.alert(
            'Submit Pengajuan?',
            '',
            [
                {
                    'text': 'Batal',
                    onPress: () => console.log('Cancel')
                },
                {
                    'text': 'Submit',
                    onPress: () => {
                        let layanan_pid = this.state.layananFiles[0].layanan_pid;

                        this.setState({
                            isLoading: true
                        });

                        fetch(`${global.api}data_controller/update_data`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                appToken: global.appToken,
                                table: 'set_layanan_status',
                                data: {
                                    layanan_pid: layanan_pid,
                                    del: '2'
                                }
                            })
                        }).then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);

                            if(responseJson['status'] == '200') {
                                Alert.alert('Pengajuan anda telah berhasil di submit. Silahkan menunggu review dari kami. Terima kasih :)');
                                navigation.goBack(null);
                            }
                        });
                    }
                }
            ]
        ); 
    }

    _KtpUpload() {
        const navigation = this.props.navigation;
        let layananType = navigation.state.params.layananType;
        let files;

        switch(layananType) {
            case '1':
                // KTP
                files = [
                    {
                        txt: 'Upload Fotocopy Kartu Keluarga',
                        col: 'kk'
                    },
                    {
                        txt: 'Upload Fotocopy Buku Nikah/Akta Perkawinan bagi penduduk yang belum berumur 17 tahun, tetapi pernah kawin atau sudah kawin',
                        col: 'buku_nikah'
                    },
                    {
                        txt: 'Upload Fotocopy Akta Kelahiran',
                        col: 'akta_lahir'
                    },
                    {
                        txt: 'Bagi pemohon yang mengajukan perubahan biodata penduduk melampirkan FC Surat Bukti / Keterangan peristiwa penting atau kependudukan yang dialami',
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

        let that = this;

        const btn = files.map(function (item, index) {
            let stateCol = that.state.layananFiles[0]['user_' + item.col];

            return (
                <View
                    key={index}
                    style={{
                        flexDirection: 'column',
                        marginTop: 20,
                        justifyContent: "center",
                    }}
                >
                    <View>
                        <Text
                            style={{
                                textAlign: 'justify',
                                lineHeight: 20,
                                color: '#333333'
                            }}
                        >
                            {item.txt}</Text>
                    </View>

                    <TouchableOpacity
                        style={[{
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            width: 90,
                            marginTop: 15,
                            textAlign: 'center',
                            marginBottom: 10,
                            width: 170,
                        }, stateCol != null ? styles.btnUploaded : null ]}
                        onPress={ () => that._ShowActionSheet(item.col)}
                    >
                        <Text
                            style={[{
                                textAlign: 'center',
                                fontSize: 15,
                            }, stateCol != null ? styles.txtBtnUploaded : styles.txtBtnNotUploaded ]}
                        >
                            { stateCol != null ? 'File Uploaded' : 'Pilih File' }
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        });

        return (btn);
    }

    _UploadFile = async(name, uri, type, file) => {
        let layanan_pid = this.state.layananFiles[0].layanan_pid;
        let layanan_ts = this.state.layananFiles[0].layanan_ts;
        let user_pid = this.state.userPid;

        let formData = new FormData();

        formData.append('file', {
            uri: uri,
            name: name,
            type: type
        });

        formData.append('layanan_pid', layanan_pid);
        formData.append('layanan_ts', layanan_ts);
        formData.append('layanan_type', file);
        formData.append('user_pid', user_pid);

        // Send file to server
        this.setState({
            isLoading: true
        });

        fetch(`${global.api}data_controller/upload_layanan_file`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);

            if(responseJson['status'] == '200') {
                this.getToken();
            }
        });
    }

    _PickImage = async(file) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
		});
		console.log(result);
		
		if(!result.cancelled) {
			let localUri = result.uri;
			let filename = localUri.split('/').pop();
			
			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;
			
            /*let source = { uri: result.uri };
            
            let objImg = {
                imageFile: file,
                imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
            }
            console.log(objImg);*/

            /*let joined = this.state.arrImg.concat(objImg);
            this.setState({
                arrImg: joined
            });*/

            this._UploadFile(filename, localUri, type, file);

			{/*this.setState({ 
				imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
			});*/}
		}
	}
	
	_PickCamera = async(file) => {
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 4]
		});
		console.log(result);
		
		if(!result.cancelled) {
			let localUri = result.uri;
			let filename = localUri.split('/').pop();
			
			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            
            this._UploadFile(filename, localUri, type, file);
			
            /*let source = { uri: result.uri };
            
            let objImg = {
                imageFile: file,
                imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
            }

            let joined = this.state.arrImg.concat(objImg);
            this.setState({
                arrImg: joined
            });*/

			{/*this.setState({ 
				imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
			});*/}
		}
	}
	
	_ShowActionSheet = (file) => {
		if(Platform.OS === 'ios') {
			ActionSheetIOS.showActionSheetWithOptions({
				options: ['Cancel', 'Take Photo', 'Choose From Gallery'],
				cancelButtonIndex: 0,
			},
			(buttonIndex) => {
				if(buttonIndex === 1) {
					this._PickCamera(file);
				} else if (buttonIndex === 2) { 
					this._PickImage(file);
				}
			});
		} else if(Platform.OS === 'android') {
			let options = ['Choose From Gallery', 'Take Photo', 'Cancel'];
			let cancelButtonIndex = 2;

			this.props.showActionSheetWithOptions({
				options,
				cancelButtonIndex,
			},
			(buttonIndex) => {
				if(buttonIndex === 0) {
					this._PickImage(file);
				} else if (buttonIndex === 1) { 
					this._PickCamera(file);
				}
			});
		}
    }

    _ShowTopRow() {
        const arrRow = [
            {
                label: 'Tanggal Dibuat',
                value: `${ this.state.layananFiles[0].layanan_datetime }`
            },{
                label: 'Nomor Pengajuan',
                value: `#${ this.state.layananFiles[0].layanan_ts }`
            },{
                label: 'Status',
                value: `${ this.state.layananFiles[0].del }`
            },
        ];

        const top = arrRow.map(function(v, i) {
            return(
                <View 
                    style={{
                        flexDirection: 'row'
                    }}
                    key={ i }
                >
                    <View 
                        style={{
                            width: 150,
                        }}
                    >
                        <Text>
                            { v.label }
                        </Text>
                    </View>
                    <View>
                        <Text>
                            : { v.value }
                        </Text>
                    </View>
                </View>
            )
        });

        return(top);
    }

    render() {
        if(this.state.isLoading) {
			return(
				<LoadingScreen />
			);
        }
        
        const navigation = this.props.navigation;

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(52,73,100)',
                    ...Platform.select({
                        android: {
                            paddingTop: 30,
                        }
                    })
                }}
            >
                <StatusBar barStyle="light-content" />

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <BackBtn
                        title="Perekaman e-KTP"
                        navigation={navigation}
                        back={true}
                    />

                    <ScrollView>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderColor: '#cacaca'
                            }}
                        >
                            { this._ShowTopRow() }
                        </View>

                        <View
                            style={{
                                marginTop: 5,
                                marginLeft: 20,
                                marginRight: 20,
                                marginBottom: 20
                            }}
                        >
                            <View>
                                {this._KtpUpload()}
                            </View>
                        </View>
                    </ScrollView>

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 5,
                        }}
                    >
                        <TouchableOpacity
                            onPress={this._SubmitLayanan}
                            style={[{
                                backgroundColor: 'green',
                            }, styles.btnBottom]}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                Submit
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack(null)}
                            style={[{
                                backgroundColor: 'white',
                            }, styles.btnBottom]}
                        >
                            <Text
                                style={{
                                    color: '#444444',
                                    fontWeight: 'bold'
                                }}
                            >
                                Tutup
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    btnBottom: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: 'green',
        marginHorizontal: 10,
    },
    btnUploaded: {
        backgroundColor: 'green'
    },
    txtBtnUploaded: {
        color: 'white'
    },
    txtBtnNotUploaded: {
        color: '#333333'
    }
});