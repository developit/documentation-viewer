import { h } from 'preact';
import { Layout, TextField } from 'preact-mdl';

export default ({ docs, actions }) => (
	<Layout.Header>
		<Layout.HeaderRow>
			<Layout.Title>Docs</Layout.Title>
			<Layout.Spacer />
			<TextField
				label="Documentation URL (JSON)"
				type="url"
    			style="background-color:#FFF; box-shadow:0 0 0 3px #FFF; color:#000;"
				onKeyDown={ e => e.keyCode===13 ? actions.load(e.target.value) : null }
				value={ docs && docs.url } />
		</Layout.HeaderRow>
	</Layout.Header>
);
