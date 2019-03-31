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
    containerForm: {
        paddingVertical: 20,
    },
    formRow: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    formInputBorder: {
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 8,
        padding: 20,
    },
    containerFormLabel: {
        flexDirection: 'row'
    },
    txtFormLabel: {
        marginTop: -37,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 16,
    },
    containerFormInput: {
        paddingTop: 10,
    },
    inputForm: {
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
    },
    formBtn: {
        backgroundColor: 'orange',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
    },
    txtFormBtn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },

    // Btn nav to signup/signin
	btnSignInUp: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		marginTop: 60,
		marginBottom: 60
	},
	txtFront: {
		color: '#800000',
		fontSize: 14,
	},
	txtBack: {
		fontWeight: 'bold',
		color: '#800000',
		paddingLeft: 5,
		fontSize: 18
	},
});