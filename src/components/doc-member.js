import assign from 'object-assign';
import { h } from 'preact';

const NONE = {};

function getType(type=NONE, nameOnly=false) {
	let name = type.expression && type.expression.name || type.name;
	if (nameOnly) return name;
	if (type.type==='TypeApplication') {
		return `${name}<${type.applications.map(a=>a.name).join(', ')}>`;
	}
	return name;
}

let normalizeParams = params => params.reduce( (acc, p) => {
	let v = acc.map[p.name];
	if (!v) acc.params.push( v=acc.map[p.name]={} );
	assign(v, p);
	return acc;
}, { map:{}, params:[] }).params;


export default ({ member:{kind, name, description, params=[], returns} }) => {
	let doc = [],
		isFunction = kind==='function';

	if (params.length) {
		isFunction = true;
		doc.push(
			<div class="params">
				<h4>Parameters</h4>
				{ normalizeParams(params).map( p => (
					<DocParam param={p} />
				)) }
			</div>
		);
	}

	if (Array.isArray(returns)) returns = returns[0];
	if (returns) doc.push(
		<div class="params returns">
			<h4>Returns</h4>
			<DocParam type="return" param={ returns } />
		</div>
	);

	return (
		<div class="member">
			<h3>{ name }{ isFunction ? <em>({ params.map(p=>p.name).join(', ') })</em> : null }</h3>
			<p>{ description }</p>
			{ doc }
		</div>
	);
};



const DocParam = ({ type='argument', param }) => {
	let properties = null;
	if (param.properties) {
		properties = (
			<div class="properties">
				<h6>Properties:</h6>
				<div class="params">{ param.properties.map( ({name,...p}) => (
					<DocParam type="property" param={{name:name.replace(/^.*\./,''), ...p}} />
				)) }</div>
			</div>
		);
	}

	let { name } = param;
	if (param.type && param.type.type==='OptionalType') {
		name = `[${name}${param.default?('='+param.default):''}]`;
	}

	return (
		<dl class={`param param-${type}`} data-type={ getType(param.type,true) }>
			<dt>
				<em><code>{ getType(param.type) }</code></em> <strong>{ name }</strong>
			</dt>
			<dd>{ param.description }{ properties }</dd>
		</dl>
	);
};
