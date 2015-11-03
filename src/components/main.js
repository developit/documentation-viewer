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
					<Icon icon="info" style="float:left; margin-top:20px" />
					<p class="info">
						Paste your <code>JSON</code> documentation URL into the box above to get started.
					</p>

					<ul style="list-style:none;padding:0 10px;">
						<li>
							<Icon icon="build" style="padding:10px; vertical-align:middle" />
							Renders <code>JSON</code> output from <a href="http://documentation.js.org" target="_blank">documentation.js</a>
						</li>
						<li>
							<Icon icon="link" style="padding:10px; vertical-align:middle" />
							Hotlink from Github &amp; Gist (even <a href="https://gist.github.com/developit/04ad7ac878b5fa35e76e" target="_blank">automatically</a>!)
						</li>
						<li>
							<Icon icon="code" style="padding:10px; vertical-align:middle" />
							Open Source: <a href="https://github.com/developit/documentation-viewer" target="_blank">add your must-have feature</a>
						</li>
					</ul>
				</Card.Text>

				<Card.Actions style="text-align:center; color:#888; font-size:80%;">
					Made with <Icon icon="favorite" style="vertical-align:middle" /> by <a href="https://github.com/developit" target="_blank">developit</a>.
					Built with <a href="https://github.com/developit/preact" target="_blank">Preact</a>.
				</Card.Actions>
			</Card>
		);
	}

	return (
		<Layout.Content id="main">
			{ content }
		</Layout.Content>
	);
};
