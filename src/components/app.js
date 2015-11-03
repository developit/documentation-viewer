import { h, Component } from 'preact';
import { bind } from 'decko';
import assign from 'object-assign';
import { Layout } from 'preact-mdl';
import Header from './header';
import Sidebar from './sidebar';
import Main from './main';

const DEMO = 'https://github.com/documentationjs/documentation/blob/master/test/fixture/class.output.json';

export default class App extends Component {
	componentDidMount() {
		let url = (location.hash || '').substring(1);
		this.load(url || DEMO);
	}

	@bind
	load(url) {
		let resolvedUrl = url;

		// convert github URLs:
		let gh = resolvedUrl.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/(.+)$/i);
		if (gh) resolvedUrl = `https://raw.githubusercontent.com/${gh[1]}/${gh[2]}`;

		// convert gist URLs:
		let gist = resolvedUrl.match(/^https?:\/\/gist\.github\.com\/(.+)$/i);
		if (gist) resolvedUrl = `https://gist.githubusercontent.com/${gist[1]}/raw`;

		fetch(resolvedUrl)
			.catch( error => this.setState({ error }) )
			.then( r => r.json() )
			.then( docs => {
				assign(docs, { url, resolvedUrl });
				console.log(docs);
				this.setState({ docs, error:null });
			});
	}

	@bind
	go(to) {
		if (to==='/home') return this.setState({ error:null, symbol:null });

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
