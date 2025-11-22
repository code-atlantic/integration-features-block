/**
 * Block registration for Integration Features Group
 */

import { registerBlockType, createBlock } from '@wordpress/blocks';
import type { BlockConfiguration, BlockInstance } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';
import deprecated from './deprecated';
import metadata from './block.json';
import type { IntegrationFeaturesGroupAttributes } from './types';

/**
 * Block transforms - allows converting multiple Integration Features into a Group
 */
const transforms = {
	from: [
		{
			type: 'block' as const,
			isMultiBlock: true,
			blocks: ['popup-maker/integration-feature'],
			transform: (features: BlockInstance[]) => {
				// Create a new group with the selected features as children
				return createBlock(
					'popup-maker/integration-features-group',
					{
						heading: '',
						subheading: '',
						groupIcon: 'admin-plugins',
						hasFeatures: features.length > 0,
					},
					// Recreate each feature block to preserve attributes and inner blocks
					features.map((feature) =>
						createBlock(
							'popup-maker/integration-feature',
							feature.attributes,
							feature.innerBlocks
						)
					)
				);
			},
		},
	],
};

// @ts-expect-error - block.json editorStyle is array, but @wordpress/blocks types expect string
registerBlockType<IntegrationFeaturesGroupAttributes>(
	metadata.name,
	{
		...metadata,
		edit: Edit,
		save: Save,
		deprecated,
		transforms,
	} as BlockConfiguration<IntegrationFeaturesGroupAttributes>
);
