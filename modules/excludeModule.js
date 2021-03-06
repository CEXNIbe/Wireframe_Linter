/**
	This module defines files/items to exclude from error checking
**/
const config = require(`${__dirname}/../config.js`);

module.exports = {
	picklistsToExclude: (filename) => {
		const exclude = [];
		if (filename === 'user/index.js') exclude.push('user_status');
		if (config.platformVersionIsFive) exclude.push('record_sources');
		return exclude;
	},

	displayRulesToExclude: (filename) => {
		const exclude = [ 'isClosed', ];

		let envDrRules = getEnvironmentVariable('LINTER_DIR_DISPLAY_RULES_TO_EXCLUDE');
		envDrRules.forEach((rule) => exclude.push(rule));

		if (filename === 'todo-details-form.js') {
			exclude.push('isNotNew');
		} else if (filename === 'file-details-form.js') {
			exclude.push('isNotNew');
		} else if (filename === 'note-details-form.js') {
			exclude.push('isNotNew');
		}

		return exclude;
	},

	formsToExclude: () => {
		let exclude = getEnvironmentVariable('LINTER_DIR_FORMS_TO_EXCLUDE');

		return [
			'case-escalation-details-form.js',
			'case-notification-details-form.js',
			...exclude
		];
	},

	validationFieldsToExclude: (filename) => {
		const exclude = getEnvironmentVariable('LINTER_DIR_FIELDS_TO_EXCLUDE');
		exclude.push(...['parentId', 'entityId']);

		if (filename === 'user/validation.js') {
			exclude.push('oldPassword', 'confirmedPassword');
		} else if (filename === 'todo/validation.js') {
			exclude.push('other');
		} else if ('todo-details-form.js') {
			exclude.push('status');
		}

		return exclude;
	},

	validationConditionsToExclude: (filename) => {
		const exclude = [];

		if (filename === 'todo/validation.js') {
			exclude.push('isTodoTypeOther')
		}

		return exclude;
	}
};

function getEnvironmentVariable(envVar) {
	let values = process.env[envVar];
	if (values) return values.split(',');

	return [];
}