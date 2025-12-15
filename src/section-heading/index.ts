/**
 * Section Heading block registration
 */

import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import Save from './save';
import deprecated from './deprecated';
import metadata from './block.json';

import './style.scss';

/**
 * Register the Section Heading block
 */
registerBlockType(metadata.name as any, {
	...metadata,
	edit: Edit,
	save: Save,
	deprecated,
} as any);
