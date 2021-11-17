import { uid } from 'uid';

export function getBlockType(type) {
	switch (type) {
		case 'inputText':
			return {
				blockId: uid(6),
				blockType: 'inputText',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: 'Name',
					placeholder: '',
					required: false
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'inputNumber':
			return {
				blockId: uid(6),
				blockType: 'inputNumber',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: 'Name',
					placeholder: '',
					required: false
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'inputDate':
			return {
				blockId: uid(6),
				blockType: 'inputDate',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: 'Name',
					placeholder: '',
					required: false
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'html':
			return {
				blockId: uid(6),
				blockType: 'html',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					content: '<b>Some html content</b>',
					placeholder: '',
					required: false
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'inputTime':
			return {
				blockId: uid(6),
				blockType: 'inputTime',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					placeholder: '',
					required: false
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'selectStandard':
			return {
				blockId: uid(6),
				blockType: 'selectStandard',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					placeholder: '',
					required: false,
					showSearch: false,
					options: [
						{ label: 'Option 1', value: 'option1' },
						{ label: 'Option 2', value: 'option2' }
					]
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'inputSignature':
			return {
				blockId: uid(6),
				blockType: 'inputSignature',
				name: 'signature',
				isVisible: true,
				position: 0,
				properties: {
					label: 'Signature',
					required: false
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'checkboxGroup':
			return {
				blockId: uid(6),
				blockType: 'checkboxGroup',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					required: false,
					options: [
						{ label: 'Option 1', value: 'option1' },
						{ label: 'Option 2', value: 'option2' }
					]
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'radioSelect':
			return {
				blockId: uid(6),
				blockType: 'radioSelect',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					required: false,
					options: [
						{ label: 'Option 1', value: 'option1' },
						{ label: 'Option 2', value: 'option2' }
					]
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'textArea':
			return {
				blockId: uid(6),
				blockType: 'textArea',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					placeholder: '',
					required: false
				},
				options: {
					supportText: '',
					supportTextLocation: 'above',
					supportTextColor: ''
				}
			};
			break;
		case 'fieldArray':
			return {
				blockId: uid(6),
				blockType: 'fieldArray',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: ''
				},
				blocks: []
			};
			break;
		case 'layout':
			return {
				blockId: uid(6),
				blockType: 'layout',
				name: '',
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					layout: [1, 1, 1]
				},
				blocks: []
			};
			break;
		case 'section':
			return {
				blockId: uid(6),
				blockType: 'section',
				sectionId: 0,
				name: '',
				position: 0,
				isVisible: true,
				position: 0,
				properties: {
					label: 'Section Title',
					headingLevel: 'h3'
				},
				options: {
					supportText: 'Details about this section',
					supportTextLocation: 'above',
					supportTextColor: 'blue'
				},
				blocks: []
			};
			break;
		case 'inputFormula':
			return {
				blockId: uid(6),
				blockType: 'inputFormula',
				name: '',
				position: 0,
				isVisible: true,
				position: 0,
				properties: {
					label: '',
					required: false,
					formula: ''
				},
				options: {
					supportText: 'Details about this section',
					supportTextLocation: 'above',
					supportTextColor: 'blue'
				}
			};
			break;
		default:
			return;
			break;
	}
}
