import { h } from 'preact';
import { Layout, Navigation } from 'preact-mdl';

export default ({ docs=[], actions }) => (
	<Layout.Drawer>
		<Layout.Title>Symbols</Layout.Title>
    	<Navigation>{ docs.map( ({ name, kind }) => (
    		<Navigation.Link
    				style="padding-top:6px; padding-bottom:6px;"
    				onclick={ () => actions.go(name) }>
    			{ name }
				<div style="font-size:70%; opacity:0.5;">{ kind }</div>
    		</Navigation.Link>
		))}</Navigation>
	</Layout.Drawer>
);
