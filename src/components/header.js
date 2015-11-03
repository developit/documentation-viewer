import { h } from 'preact';
import { Layout, TextField } from 'preact-mdl';

export default ({ docs, actions:{ go, load } }) => (
	<Layout.Header>
		<Layout.HeaderRow>
			<Layout.Title>
				<span title="Home" style="cursor:pointer" onClick={ () => go('/home') }>Docs</span>
			</Layout.Title>
			<Layout.Spacer />
			<TextField
				label="Documentation URL (JSON)"
				type="url"
				style="background-color:#FFF; box-shadow:0 0 0 3px #FFF; color:#000;"
				onKeyDown={ e => e.keyCode===13 ? load(e.target.value) : null }
				value={ docs && docs.url } />
		</Layout.HeaderRow>
	</Layout.Header>
);
