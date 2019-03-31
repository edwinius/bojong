'use strict';
import {
    Dimensions,
    Platform
} from 'react-native';

import globalConst from '../../globalConst';

var React = require('react-native');

var { StyleSheet } = React;

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

module.exports = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: globalConst.COLOR.SAFEAREA,
        ...Platform.select({
            android: {
                paddingTop: 30
            }
        })
    }
});