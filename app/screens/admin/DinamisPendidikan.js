import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from '../common/Banner';
import Header from '../common/Header';

const styleDinamis = require('../styles/StyleDinamis');

export default class DinamisPendidikan extends React.Component {

    _ShowMenu() {
        const arrMenu = [
            {
                'menuName': 'Data Guru'
            },
            {
                'menuName': 'Data Murid'
            }
        ];

        const contentMenu = arrMenu.map(function(menu, index) {
            return(
                <TouchableOpacity
                    key={ index }
                    style={ styleDinamis.btnMenu }
                >
                    <View style={ styleDinamis.containerTxtMenu }>
                        <Text style={ styleDinamis.txtMenu }>
                            { menu.menuName }
                        </Text>
                    </View>

                    <View>
                        <Text style={ styleDinamis.txtMenuArrow }>
                            {'>'}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return contentMenu;
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
                    title='Dinamis Pendidikan'
                    back={true}
				/>
                
                <ScrollView>
                    <View 
                        style={ styleDinamis.containerMenu }
                    >
                        { this._ShowMenu() }
                    </View>
                </ScrollView>
            </View>
        );
    }
}