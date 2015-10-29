import { h } from 'preact';

export default ({ member:{name, description, params} }) => {
	let doc = [];

	if (params) doc.push(
		<div class="params">
			<h4>Parameters</h4>
			{ params.map( ({ name, type:{type}={} }) => (
				<dl class="param" data-type={type}>
					<dt>{ type==='OptionalType' ? ('['+name+']') : name }</dt>
					<dd>{ description }</dd>
				</dl>
			)) }
		</div>
	);

	return (
		<div class="member">
			<h3>{ name + (params ? ('('+params.map(p=>p.name)+')') : '') }</h3>
			<p>{ description }</p>
			{ doc }
		</div>
	);
};
