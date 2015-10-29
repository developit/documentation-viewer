import { h, Component } from 'preact';
import { bind } from 'decko';
import { Layout } from 'preact-mdl';
import Header from './header';
import Sidebar from './sidebar';
import Main from './main';

const DEMO = 'https://raw.githubusercontent.com/documentationjs/documentation/master/test/fixture/class.output.json';

export default class App extends Component {
	componentDidMount() {
		this.load(DEMO);
	}

	@bind
	load(url) {
		// try {
		// 	let res = await (await fetch(url)).json();
		// 	this.setState({ docs, error:null });
		// } catch(error) {
		// 	this.setState(error);
		// }
		fetch(url)
			.catch( error => this.setState({ error }) )
			.then( r => r.json() )
			.then( docs => {
				docs.url = url;
				this.setState({ docs, error:null });
			});
	}

	@bind
	go(to) {
		let { docs } = this.state,
			symbol = docs.filter( s => s.name.match(to) )[0],
			error = symbol ? null : `Symbol "${to}" not found`;
		this.setState({ error, symbol });
	}

	render({}, { error, docs, symbol }) {
		let actions = { go:this.go, load:this.load },
			ctx = { error, docs, symbol, actions };
		return (
			<div id="docs">
				<Layout fixed-header={true} fixed-drawer={true}>
					<Header {...ctx} />
					<Sidebar {...ctx} />
					<Main {...ctx} />
				</Layout>
			</div>
		);
	}
}
