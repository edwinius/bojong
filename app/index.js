import React from 'react';
import { createRootNavigator } from './router';
import './global';

export default class App extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			signedIn: false,
			checkedSignIn: false
		};
    }
    
    render() {
        const { checkedSignIn, signedIn } = this.state;
		const Layout = createRootNavigator(signedIn);
		return <Layout />
	}
}