import { h } from 'preact';
import { Card } from 'preact-mdl';
import DocMember from './doc-member';

export default ({ docs, symbol, ...props }) => {
	let type = symbol.kind || symbol.type;
	return (
		<div class="symbol">
			<Card shadow="3" class="wide">
				<Card.Title class="graphic">
					<span class="symbol-kind">{ type }</span>
					<Card.TitleText>{ symbol.name }</Card.TitleText>
				</Card.Title>

				<Card.Text>
					<div style="margin:5px; padding:5px; border:1px solid #EEE;">
						<DocMember {...{member:symbol,symbol,docs,...props}} />
					</div>
				</Card.Text>

				<div class="members">{ Object.keys(symbol.members).map( type => (
					symbol.members[type].length ? (
						<div class={'members-type-'+type}>
							<h2>{ type }</h2>
							<div class="members-list">{ symbol.members[type].map( member => (
								<DocMember {...{member, docs, symbol, ...props}} />
							)) }</div>
						</div>
					) : null
				)) }</div>
			</Card>
		</div>
	);
};
