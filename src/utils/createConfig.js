import jsonFormat from 'json-format';

export function createConfig(fields, origJson) {
	const blocks = fields;

	var config = {
		type: 'space',
		size: 2
	};
	const newJson = { ...origJson };
	newJson.blocks = blocks;
	return jsonFormat(newJson, config);
}
