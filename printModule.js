var _ = require('lodash');
var colors = require('colors/safe');
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

var noErrorFound = true;

module.exports = {
	printFields: (fileName, message, options) => {
		if (_.isEmpty(options)) return;

		errorFound();
		console.log(`\n${message} in ${colors.info(fileName)}`);
		_.forEach(options, (option) => {
			if (!option.color) option.color = 'red';
			if (option.color === 'default') option.color = undefined;

			printField(option);
		});
	},

	printArrayList: (fileName, arrayList, message) => {
		if (_.isEmpty(arrayList)) return;

		errorFound();
		console.log('\n' + message + ' in ' + colors.info(fileName));
		_.forEach(arrayList, (item) => {
			console.log(colors.error(item));
		});
	},

	printErrorsFound: () => {
		if (noErrorFound) {
			console.log(colors.info('No Errors Found'));
		}
	}
}

function printField(option) {
	var result = '{\n';
	_.forEach(option.attributes, (key) => {
		key = !!option.keyColor ? colors[option.keyColor](key) : key;
		value = !!option.color ? colors[option.color](_.get(option.fieldDef, key)) : _.get(option.fieldDef, key);

		result += `\t${key}: ${value}\n`;
	});
	result += `}\n`;
	console.log(result);
}

function errorFound () {
	noErrorFound = false;
}