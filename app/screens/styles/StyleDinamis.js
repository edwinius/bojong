'use strict';
var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    containerMenu: {
        paddingHorizontal: 15,
    },
	btnMenu: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#cacaca',
        alignItems: 'center'
    },
    containerTxtMenu: {
        flex: 1
    },
    txtMenu: {
        color: '#333333'
    },
    txtMenuArrow: {
        fontWeight: 'bold',
        fontSize: 18
    }
});