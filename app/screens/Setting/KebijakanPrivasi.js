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

export default class KebijakanPrivasi extends React.Component {
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
                    title='Kebijakan Privasi'
                    navigation={navigation}
                />
                <ScrollView>
                    <Text
                        style={{
                            paddingVertical: 15,
                            paddingHorizontal: 20
                        }}
                    >
                        Kecamatan Bojonggenteng menghormati privasi pengguna kami ("pengguna" atau "Anda"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi Anda ketika Anda mengunjungi situs web dan/atau Aplikasi kami Kecamatan Bojonggenteng, termasuk segala bentuk media, saluran media, situs web seluler, atau aplikasi seluler lainnya terkait atau terhubung dengannya (secara kolektif disebut "Situs"). Harap baca kebijakan privasi ini dengan cermat. Jika Anda tidak setuju dengan ketentuan kebijakan privasi ini, mohon jangan mengakses situs dan/atau Aplikasi ini.
                            {'\n'}{'\n'}
                        Kami berhak untuk membuat perubahan pada Kebijakan Privasi ini kapan saja dan dengan alasan apa pun. Kami akan memberi tahu Anda tentang segala perubahan dengan memperbarui tanggal "Diperbarui Terakhir" dari Kebijakan Privasi ini. Setiap perubahan atau modifikasi akan berlaku segera setelah memposting Kebijakan Privasi yang diperbarui di Situs dan/atau Aplikasi, dan Anda melepaskan hak untuk menerima pemberitahuan spesifik dari setiap perubahan atau modifikasi tersebut.
                            {'\n'}{'\n'}
                        Anda didorong untuk secara berkala meninjau Kebijakan Privasi ini untuk tetap mendapat informasi tentang pembaruan. Anda akan dianggap telah mengetahui, akan tunduk pada, dan akan dianggap telah menerima perubahan dalam Kebijakan Privasi yang direvisi dengan terus menggunakan Situs dan/atau Aplikasi Anda setelah tanggal revisi Kebijakan Privasi tersebut diposting.
                            {'\n'}{'\n'}
                        <Text
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            Koleksi Informasi Data
                        </Text>
                        {'\n'}{'\n'}
                        Kami dapat mengumpulkan informasi tentang Anda dengan berbagai cara. Informasi yang kami kumpulkan di Situs dan/atau Aplikasi termasuk:
                            {'\n'}{'\n'}
                        <Text
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            Data Pribadi
                        </Text>
                        {'\n'}{'\n'}
                        Informasi yang dapat diidentifikasi secara pribadi, seperti nama Anda, alamat email, dan nomor telepon, yang Anda berikan secara sukarela kepada kami [ketika Anda mendaftar ke Situs dan/atau Aplikasi [atau aplikasi seluler kami,] atau] ketika Anda memilih untuk berpartisipasi dalam berbagai kegiatan yang terkait dengan Situs dan/atau Aplikasi [dan aplikasi seluler kami], seperti obrolan online dan papan pesan. Anda tidak berkewajiban untuk memberikan kami informasi pribadi dalam bentuk apa pun, namun penolakan Anda untuk melakukannya dapat mencegah Anda menggunakan fitur tertentu dari Situs dan/atau Aplikasi.
                            {'\n'}{'\n'}
                        <Text
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            Data Derivatif
                        </Text>
                        {'\n'}{'\n'}
                        Informasi yang dikumpulkan oleh server kami secara otomatis ketika Anda mengakses Situs dan/atau Aplikasi, seperti alamat IP Anda, jenis browser Anda, sistem operasi Anda, waktu akses Anda, dan halaman yang telah Anda lihat langsung sebelum dan setelah mengakses Situs dan/atau Aplikasi. Jika Anda menggunakan aplikasi seluler kami, informasi ini juga dapat mencakup nama dan jenis perangkat Anda, sistem operasi Anda, nomor telepon Anda, negara Anda, suka dan balasan Anda untuk sebuah posting, dan interaksi lainnya dengan aplikasi dan pengguna lain melalui server file log, serta informasi lain yang Anda pilih untuk diberikan.
                            {'\n'}{'\n'}
                        <Text
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            Data Dari Jaringan Sosial
                        </Text>
                        {'\n'}{'\n'}
                        Informasi pengguna dari situs dan/atau Aplikasi dan jejaring sosial, seperti [Game Center Apple, Facebook, Google+, Instagram, Pinterest, Twitter], termasuk nama Anda, nama pengguna jejaring sosial Anda, lokasi, jenis kelamin, tanggal lahir, alamat email, gambar profil, dan data publik untuk kontak, jika Anda menghubungkan akun Anda ke jejaring sosial tersebut. Jika Anda menggunakan aplikasi seluler kami, informasi ini juga dapat mencakup informasi kontak siapa pun yang Anda undang untuk menggunakan dan / atau bergabung dengan aplikasi seluler kami.
                            {'\n'}{'\n'}
                        <Text
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            Keamanan
                        </Text>
                        {'\n'}{'\n'}
                        Kecamatan Sukabumi menggunakan peralatan, teknologi, dan prosedur administrasi yang sesuai untuk tindakan pengamanan dengan tujuan melindungi informasi pribadi Anda dan data agar tidak dicuri atau disalahgunakan.
                            {'\n'}{'\n'}
                        Semua Informasi Pribadi dan data yang diberikan oleh Pengguna hanya akan diakses oleh personel dan staf yang berwenang untuk melakukan fungsi pekerjaan mereka yang diperlukan untuk memenuhi tujuan pengumpulannya. Semua Pengguna bertanggung jawab untuk melindungi Nama Pengguna dan Kata Sandi mereka sendiri dan merahasiakannya dengan tidak membagikan perincian ini kepada siapa pun.
                            {'\n'}{'\n'}
                        Meskipun kami menggunakan langkah-langkah standar industri untuk melindungi informasi dan data pribadi Anda, kami tidak dapat menjamin keamanan mutlak Anda karena tidak ada metode penyimpanan elektronik di internet yang 100% aman. Oleh karena itu, Anda dengan ini mengakui bahwa Kecamatan Bojonggenteng tidak bertanggung jawab atas informasi yang dicegat yang dikirim melalui internet, dan Anda dengan ini membebaskan kami dari semua klaim yang timbul terkait dengan penggunaan data yang dicegat dengan cara yang tidak sah.
                            {'\n'}{'\n'}
                        <Text
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            Pertanyaan
                        </Text>
                        {'\n'}{'\n'}
                        Jika Anda memiliki pertanyaan atau masalah apa pun terkait Kebijakan Privasi ini, jangan ragu untuk menghubungi kami. Harap dicatat bahwa kami meminta Anda untuk memasukkan nama lengkap, nomor telepon, alamat email, dan pertanyaan serius Anda atau kami mungkin tidak menanggapi pertanyaan Anda. Kami akan berusaha sebaik mungkin untuk menjawab pertanyaan Anda secepat mungkin dan berupaya meningkatkan Situs dan/atau Aplikasi untuk memberikan layanan yang lebih baik.
                    </Text>
                </ScrollView>
            </View>
        )
    }
}