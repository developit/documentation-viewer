import { h } from 'preact';
import { Layout, Card, Icon } from 'preact-mdl';
import DocSymbol from './doc-symbol';

export default ({ error, docs, symbol }) => {
	let content = [];

	if (error) {
		content.push(
			<Card class="skinny" shadow="4">
				<Card.Title style="background:#FFE07F;">
					<Card.TitleText>Error</Card.TitleText>
				</Card.Title>
				<Card.Text>
					<p>{ String(error) }</p>
					<pre>{ String(error.stack) }</pre>
				</Card.Text>
			</Card>
		);
	}
	else if (symbol) {
		content.push(
			<DocSymbol {...{docs,symbol}} />
		);
	}
	else {
		content.push(
			<Card class="skinny" shadow="4">
				<Card.Title class="graphic">
					<Card.TitleText>Documentation</Card.TitleText>
				</Card.Title>
				<Card.Text>
					<Icon icon="info" style="float:left;margin-top:30px" />
					<p class="info">
						Paste your .json URL into the box above
						to load and render your documentation.
					</p>
				</Card.Text>
				<Card.Actions style="text-align:center;">
					<small>Powered by &nbsp;</small>
					<a href="https://github.com/developit/preact" target="_blank">Preact</a>
				</Card.Actions>
			</Card>
		);
	}

	//<Button fab colored onClick={ actionButton }>
	//	<Icon>new</Icon>
	//</Button>

	return (
		<Layout.Content id="main">
			{ content }
		</Layout.Content>
	);
};
