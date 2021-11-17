<script context="module">
	export const prerender = false;
</script>

<script>
	import slugify from 'slugify';
	import { uid } from 'uid';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { useQuery, useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import { gql, GraphQLClient } from 'graphql-request';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';

	import { createConfig } from '$utils/createConfig';
	import { arrayMoveItem } from '$utils/helpers';
	import { getBlockType } from '$utils/blockTypes';
	import Block from '$lib/Block.svelte';
	import ListBlocks from '$lib/ListBlocks.svelte';

	// Set initial config in case there is nothign saved in local storage
	let config = {
		formId: '',
		title: '',
		apiUrl: '',
		slug: '',
		blocks: [],
		conditions: [
			{
				key: 1,
				triggerName: "workType",
				triggerValue: "harvesting",
				action: "show",
				targetName: "harvestQty",
			}
		],
		approvals: []
	};
	let configJSON = '';
	let fields = [];
	let fieldNames = [];

	// Define the select field
	let newInputItem = 'inputText';

	// Options for blocks
	const options = [
		{ name: 'inputText', label: 'Text Input' },
		{ name: 'inputNumber', label: 'Number Input' },
		{ name: 'textArea', label: 'Text Area' },
		{ name: 'inputDate', label: 'Date Input' },
		{ name: 'inputTime', label: 'Time Input' },
		{ name: 'selectStandard', label: 'Select Standard' },
		{ name: 'checkboxGroup', label: 'Checkbox Group' },
		{ name: 'radioSelect', label: 'Radio Select' },
		{ name: 'inputSignature', label: 'Input Signature' },
		{ name: 'html', label: 'HTML' },
		{ name: 'inputFormula', label: 'Formula'},
		{ name: 'fieldArray', label: 'Field Array' },
		{ name: 'layout', label: 'Layout' },
		{ name: 'section', label: 'Section' }
	];

	// ===========================================================================
	// DND Config
	// ===========================================================================
	const flipDurationMs = 200;
	overrideItemIdKeyNameBeforeInitialisingDndZones('blockId');
	let dropTargetStyle;

	// ===========================================================================
	// Mutations
	// ===========================================================================
	let createFormMutation = useMutation(
		async (data) => {
			const endpoint = '';
			const graphQLClient = new GraphQLClient(endpoint);
			const mutation = gql`
				mutation($config: JSON) {
					createForm(
						data: { name: "test form", date: "2021-08-25", status: "draft", configuration: $config }
					) {
						id
					}
				}
			`;

			const response = await graphQLClient.request(mutation, {
				config: JSON.stringify(data)
			});

			return response.createForm.id;
		},
		{
			onSuccess: (id) => {
				// Do something on success.
			},
			onError: (error) => {
				console.error('ERROR OCCURRED');
			}
		}
	);

	// ===========================================================================
	// Lifecycle
	// ===========================================================================
	onMount(async () => {
		const getSavedData = localStorage.getItem('config-writer');
		const obj = JSON.parse(getSavedData);
		console.log(obj);
		if (obj) {
			config = obj;
		}

		fields = [...obj.blocks];
	});

	// ===========================================================================
	// Functions
	// ===========================================================================
	const addField = () => {
		let newField = getBlockType(newInputItem);

		fields = [...fields, newField];

		fieldNames = getFieldNames(config.blocks);
	};

	const generateFormId = () => {
		config.formId = uid(8);
	};

	const onSave = () => {
		localStorage.setItem('config-writer', configJSON);
	};

	const onClear = () => {
		localStorage.setItem('config-writer', '');
	};

	const onPreview = () => {
		const data = { ...config };
		data.blocks = fields;

		$createFormMutation.mutate(data);
	};

	const onTitleChange = () => {
		config.slug = slugify(config.title, {
			lower: true,
			strict: true,
			trim: true
		});
	};

	const onIndexChange = (newIndex, blockId) => {
		console.log({ newIndex, blockId });
		const origIndex = fields.findIndex((val) => blockId === val.blockId);
		const newArr = arrayMoveItem(fields, origIndex, newIndex);
		fields = [...newArr];
	};

	const onBlockDelete = (blockId) => {
		const index = fields.findIndex((val) => blockId === val.blockId);
		const newArr = [...fields];
		newArr.splice(index, 1);
		fields = [...newArr];
	};

	const onMoveUp = (blockId) => {
		const index = fields.findIndex((val) => blockId === val.blockId);
		const newArr = arrayMoveItem(fields, index, index - 1);
		fields = [...newArr];
	};
	const onMoveDown = (blockId) => {
		const index = fields.findIndex((val) => blockId === val.blockId);
		const newArr = arrayMoveItem(fields, index, index + 1);
		fields = [...newArr];
	};

	function handleDndConsider(e) {
		fields = e.detail.items;
		dropTargetStyle = {
			"border": "dashed 2px grey"
		}
	}
	function handleDndFinalize(e) {
		fields = e.detail.items;
	}

	function onCreateApproval() {
		const { approvals } = config;
		const newApproval = {
			key: uid(8),
			approvalApiUrl: 'https://hook.integromat.com/qtgaot29j5asuz43chgg9convqlyjlsa',
			scope: '',
			approverEmail: '',
			responseUrl: 'someproject@hireoutput.report/asdfbc',
			referenceId: '', // Response Id of the data in the database
			attachments: []
		};
		config.approvals = [...approvals, newApproval];
	}

	function onRemoveApproval(key) {
		const index = config.approvals.findIndex((obj)=>obj.key === key);
		let newArr = [...config.approvals];
		if (index >=0) {
			newArr.splice(index, 1);
		}
		config.approvals = [...newArr];
	}

	function onCreateCondition() {
		const { conditions } = config;
		const newCondition = {
			key: uid(8),
			triggerName: '',
			triggerValue: '',
			action: '',
			targetName: ''
		};
		config.conditions = [...conditions, newCondition];
	}

	function onRemoveCondition(key) {
		const index = config.conditions.findIndex((obj)=>obj.key === key);
		let newArr = [...config.conditions];
		if (index >= 0) {
			newArr.splice(index, 1);
		}
		config.conditions = [...newArr];
	}

	function getFieldNames(blocks) {
		let fieldNames = [];
		blocks.forEach((obj) => {
			fieldNames = [...fieldNames, obj.name]
			// Check if the block had child blocks
			if (obj.blocks && obj.blocks.length > 0) {
				// fieldNames.push(getFieldNames(obj.blocks))	
				fieldNames = [...fieldNames, ...getFieldNames(obj.blocks)]
			} 
		})
		return fieldNames;
	}

	// ===========================================================================
	// Reactions
	// ===========================================================================
	$: {
		configJSON = createConfig(fields, config);
		fieldNames = getFieldNames(config.blocks);
	}
</script>

<svelte:head>
	<title>Test - Form Config Builder</title>
</svelte:head>

<div>
	<h1>Config Writer</h1>
	<div id="container">
		<section id="controls">
			<section>
				<h3>Form Details</h3>
				<div>
					<label>
						Form Id
						<input type="text" name="formId" bind:value={config.formId} />
					</label>
					<button on:click={generateFormId}>Generate Form Id</button>
				</div>
				<div>
					<label for="title">Title</label>
					<input type="text" name="title" on:change={onTitleChange} bind:value={config.title} />
				</div>
				<div>
					<label for="apiUrl">API Url</label>
					<input type="text" name="apiUrl" bind:value={config.apiUrl} />
				</div>
				<div>
					<label for="slug">Slug</label>
					<input type="text" name="slug" bind:value={config.slug} />
				</div>
			</section>
			<section>
				<h3>Form Blocks</h3>

				<div
					use:dndzone={{ items: fields, flipDurationMs, dropTargetStyle, dropTargetClasses: ['dndzone__hover'] }}
					on:consider={handleDndConsider}
					on:finalize={handleDndFinalize}
					class="dndzone"
				>
				{#if fields.length < 1}
						<div class="empty">
							<span>Add a field</span>
						</div>
					{/if}
					{#each fields as field, index (field.blockId)}
						<div animate:flip={{ duration: flipDurationMs }}>
							<Block
								bind:blockData={field}
								{index}
								{onIndexChange}
								{onBlockDelete}
								{onMoveUp}
								{onMoveDown}
							/>
						</div>
					{/each}
				</div>

				<div>
					<label>Add item</label>
					<select bind:value={newInputItem}>
						{#each options as option}
							<option value={option.name}>{option.label}</option>
						{/each}

						<!-- <option value="inputNumber">Number Input</option> -->
					</select>
					<button on:click={addField}>Add field</button>
				</div>
			</section>
			<section>
				<h3>Conditions</h3>
				{#if config.conditions.length <= 0 }
					<p>No approval flow configured</p>
				{/if}
				<table>
					<thead>
						<tr>
							<td>Trigger Field</td>
							<td>Trigger Value</td>
							<td>Action</td>
							<td>Target Field</td>
						</tr>
					</thead>
					<tbody>
						{#each config.conditions as condition (condition.key)}
							<tr>
								<td>
									<select bind:value={condition.triggerName}>
										{#each fieldNames as fieldName}
											<option>{fieldName}</option>
										{/each}
									</select>
								</td>
								<td>
									<input type="text" name="triggerValue" bind:value={condition.triggerValue} />
								</td>
								<td>
									<select bind:value={condition.action}>
										<option value="show">Show</option>
									</select>
								</td>
								<td>
									<select bind:value={condition.targetName}>
										{#each fieldNames as fieldName}
											<option>{fieldName}</option>
										{/each}
									</select>
								</td>
								<td>
									<button on:click={()=>onRemoveCondition(condition.key)}>Remove</button>
								</td>
							</tr>
						{/each}
					
					</tbody>
				</table>
				<button on:click={onCreateCondition}>Create Condition</button>
			</section>

			<section>
				<h3>Form Flow</h3>
				{#if config.approvals.length <= 0 }
					<p>No approval flow configured</p>
				{/if}
				{#each config.approvals as approvalStep, index (approvalStep.key)}
					<h4>Step {index+1}</h4>
					<div>
						<label for="scope">Scope</label>
						<input type="text" name="scope" bind:value={approvalStep.scope} />
					</div>
					<div>
						<label for="approverEmail">Approver Email</label>
						<input type="text" name="approverEmail" bind:value={approvalStep.approverEmail} />
					</div>
					<div>
						<label for="responseUrl">Response Url</label>
						<input type="text" name="responseUrl" bind:value={approvalStep.responseUrl} />
					</div>
					<div>
						<button on:click={()=>onRemoveApproval(approvalStep.key)}>Remove</button>
					</div>
				{/each}
				<button on:click={onCreateApproval}>Create Approval Step</button>
			</section>
		</section>
		<section id="preview">
			<div>
				<button on:click={onSave}>Save</button>
				<a sveltekit:prefetch href="/import"
					><button class:active={$page.path === '/import'}>Import</button></a
				>
				<button on:click={onClear}>Clear Memory</button>
				<button on:click={onPreview}>Preview</button>
			</div>
			<pre>
				{configJSON}
			</pre>
		</section>
	</div>
</div>

<style>
	h1 {
		width: 100%;
	}

	#container {
		display: flex;
	}

	#container > section {
		width: 50%;
	}
	
	.dndzone {
		min-height: 100px;
	}
	.empty {
		width: 100%;
		min-height: 100px;
		border: dashed 2px grey;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
