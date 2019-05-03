import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import HeaderSetting from './HeaderSetting';

export default class SyaratDanKetentuan extends React.Component {
    render() {
        const navigation = this.props.navigation
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <SafeAreaView
                    style={{
                        ...Platform.select({
                            android: {
                                backgroundColor: 'black',
                                height: 24,
                            }
                        })
                    }}
                >
                </SafeAreaView>
                <HeaderSetting
                    title='Syarat dan Ketentuan'
                    navigation={navigation}
                />
                <ScrollView
                    style={{
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                    }}
                >
                    <Text>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Selamat datang di Website bojonggenteng.sukabumi.go.id dan / atau Aplikasi mobile Bojonggenteng.
                        </Text>
                        {'\n'}{'\n'}
                        Silahkan membaca Syarat Penggunaan ini dengan seksama. Dengan mengakses Website dan / atau menggunakan Aplikasi, Anda setuju untuk terikat dengan Syarat Penggunaan ini. Jika Anda tidak menyetujui Syarat Penggunaan ini, maka Anda jangan/berhenti mengakses dan/atau menggunakan Website atau Aplikasi ini.
                        {'\n'}{'\n'}
                        Akses atas password dan penggunaan password dilindungi dan/atau area tertentu yang diterlindungi pada Website dan/atau penggunaan Aplikasi dibatasi hanya untuk Masyarakat yang memiliki akun saja. Anda tidak diperbolehkan memperoleh atau berusaha memperoleh akses tidak sah ke area Website dan / atau Aplikasi ini, atau ke area informasi lain yang dilindungi, dengan cara apapun yang tanpa ijin penggunaan khusus oleh kami. Pelanggaran terhadap ketentuan ini merupakan pelanggaran yang didasarkan pada hukum Indonesia dan / atau undang-undang dan peraturan yang berlaku.
                        {'\n'}{'\n'}
                        Dalam menggunakan setiap fitur dan/atau Aplikasi Bojonggenteng, Pengguna dilarang untuk mengunggah atau mempergunakan kata-kata, komentar, gambar, atau konten apapun yang mengandung unsur SARA, diskriminasi, merendahkan atau menyudutkan orang lain, vulgar, bersifat ancaman, atau hal-hal lain yang dapat dianggap tidak sesuai dengan nilai dan norma sosial maupun berdasarkan kebijakan yang ditentukan sendiri oleh Kecamatan Bojonggenteng. Kecamatan Bojonggenteng berhak melakukan tindakan yang diperlukan atas pelanggaran ketentuan ini.
                        {'\n'}{'\n'}
                        <Text
                            style={{
                                fontWeight: 'bold'
                            }}
                        >
                            KETENTUAN PENGGUNAAN
                        </Text>
                        {'\n'}{'\n'}
                        1. Kami mengumpulkan dan memproses informasi pribadi Anda, seperti nama, alamat surat elektronik (surel / e-mail), dan nomor telepon seluler Anda ketika Anda mendaftar. Anda harus memberikan informasi yang akurat dan lengkap, memperbaharui informasi dan setuju untuk memberikan kepada kami bukti identitas apapun yang secara wajar dapat kami mintakan. Jika informasi pribadi yang Anda berikan kepada kami ada yang berubah, misalnya, jika Anda mengubah alamat surel, nomor telepon, atau jika Anda ingin membatalkan akun Anda, mohon perbaharui rincian informasi Anda dengan mengirimkan permintaan Anda kepada kami.
                        {'\n'}{'\n'}
                        2. Anda hanya dapat menggunakan Fitur yang terdapat pada Situs web dan/atau Aplikasi kami ketika Anda telah mendaftar pada Situs web dan/atau Aplikasi tersebut. Setelah Anda berhasil mendaftarkan diri, Situs web dan/atau Aplikasi Kecamatan Bojonggenteng akan memberikan Anda suatu akun pribadi yang dapat diakses dengan kata sandi yang Anda pilih.
                        {'\n'}{'\n'}
                        3. Hanya Anda yang dapat menggunakan akun Anda sendiri dan Anda berjanji untuk tidak memberikan wewenang kepada orang lain untuk menggunakan identitas Anda atau menggunakan akun Anda. Anda tidak dapat menyerahkan atau mengalihkan akun Anda kepada pihak lain. Anda harus menjaga keamanan dan kerahasiaan kata sandi akun Anda dan setiap identifikasi yang kami berikan kepada Anda. Dalam hal terjadi pengungkapan atas kata sandi Anda, dengan cara apapun, yang mengakibatkan setiap penggunaan yang tidak sah atau tanpa kewenangan atas akun atau identitas Anda, pesanan yang diterima dari penggunaan yang tidak sah atau tanpa kewenangan tersebut masih akan dianggap sebagai pesanan yang sah, kecuali Anda memberitahu kami tentang mengenai hal tersebut sebelum Penyedia Layanan memberikan Layanan yang diminta.
                        {'\n'}{'\n'}
                        4. Anda hanya dapat memiliki satu akun di Website dan/atau Aplikasi Kecamatan Bojonggenteng.
                        {'\n'}{'\n'}
                        5. Informasi yang diberikan oleh Website tidak dapat diartikan sebagai suatu saran atau penawaran, keputusan untuk menggunakan Penyedia Layanan sepenuhnya berada di tangan Anda. Anda bebas untuk memilih untuk menggunakan penyedia layanan lainnya.
                        {'\n'}{'\n'}
                        6. Anda berjanji bahwa Anda akan menggunakan Website hanya untuk tujuan yang dimaksud untuk mendapatkan Layanan. Anda tidak diperbolehkan untuk menyalahgunakan atau menggunakan Situs Web dan/atau Aplikasi untuk tujuan penipuan atau menyebabkan ketidaknyamanan kepada orang lain atau melakukan pemesanan palsu.
                        {'\n'}{'\n'}
                        7. Jika Anda juga adalah seorang Penyedia Layanan, Anda tidak dapat menggunakan akun konsumen Anda sendiri (atau akun milik konsumen orang lain) untuk melakukan pemesanan yang akan Anda terima sendiri sebagai seorang yang membutuhkan jasa.
                        {'\n'}{'\n'}
                        8. Anda tidak diperkenankan untuk membahayakan, mengubah atau memodifikasi Situs web dan/atau Aplikasi atau mencoba untuk membahayakan, mengubah atau memodifikasi Situs web dan/atau Aplikasi dengan cara apapun. Kami tidak bertanggungjawab jika Anda tidak memiliki perangkat yang sesuai. Kami berhak untuk melarang Anda untuk menggunakan Situs web dan/atau Aplikasi lebih lanjut jika Anda menggunakan untuk tujuan lain selain daripada tujuan yang dimaksud untuk penggunaan Situs web dan/atau Aplikasi ini. Anda berjanji bahwa Anda hanya akan menggunakan suatu jalur akses yang diperbolehkan untuk Anda gunakan.
                        {'\n'}{'\n'}
                        9. Anda akan menjaga kerahasiaan dan tidak akan menyalahgunakan informasi yang Anda terima dari penggunaan Situs web dan/atau Aplikasi tersebut. Anda akan memperlakukan Penyedia Layanan dengan hormat dan tidak akan terlibat dalam perilaku atau tindakan yang tidak sah, mengancam atau melecehkan ketika menggunakan layanan mereka.
                        {'\n'}{'\n'}
                        10. Anda memahami dan setuju bahwa penggunaan Situs web dan/atau Aplikasi oleh Anda akan tunduk pula pada Kebijakan Privasi kami sebagaimana dapat diubah dari waktu ke waktu. Dengan menggunakan Situs web dan/atau Aplikasi, Anda juga memberikan persetujuan sebagaimana dipersyaratkan berdasarkan Kebijakan Privasi kami.
                        {'\n'}{'\n'}
                        11. Dengan memberikan informasi kepada kami, Anda menyatakan bahwa Anda berhak untuk memberikan kepada kami informasi yang akan kami gunakan dan berikan kepada Penyedia Layanan.
                        {'\n'}{'\n'}
                        12. Mohon menginformasikan kepada kami jika Anda tidak lagi memiliki kontrol atas akun Anda, sebagai contoh akun Anda dengan cara bagaimanapun diretas (hack) atau telepon Anda dicuri, sehingga kami dapat membatalkan akun Anda dengan sebagaimana mestinya. Mohon diperhatikan bahwa Anda bertanggung jawab atas penggunaan akun Anda dan Anda mungkin dapat dimintakan tanggung jawabnya meskipun jika akun Anda tersebut disalahgunakan oleh orang lain.
                        {'\n'}{'\n'}
                        13. Kami dapat, berdasarkan kebijakan kami, memberikan promosi-promosi yang dapat ditukar untuk manfaat terkait dengan penggunaan Situs Web dan/atau Aplikasi. Anda setuju bahwa Anda hanya akan menggunakan promosi tersebut sebagaimana promosi tersebut dimaksudkan dan tidak akan menyalahgunakan, menggandakan, menjual atau mengalihkan promosi tersebut dengan cara apapun.
                        Jaminan
                    </Text>
                    <View
                        style={{
                            height: 40
                        }}
                    >

                    </View>
                </ScrollView>
            </View >
        )
    }
}