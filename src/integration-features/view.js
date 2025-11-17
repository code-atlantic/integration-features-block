/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Integration Feature Interactive Store
 *
 * Handles accordion toggle behavior and icon updates on the frontend
 */
store('popup-maker/integration-feature', {
	state: {
		get isOpen() {
			const context = getContext();
			return context.isOpen ?? false;
		},
		get currentIcon() {
			const context = getContext();
			const { iconStyle, isOpen } = context;

			if (iconStyle === 'plus-minus') {
				return isOpen ? '−' : '+';
			}
			return isOpen ? '▲' : '▼';
		},
	},
	actions: {
		/**
		 * Toggle accordion open/closed state
		 */
		toggle: () => {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},
	},
	callbacks: {
		/**
		 * Get the appropriate icon based on style and open state
		 */
		getIcon: () => {
			const context = getContext();
			const { iconStyle, isOpen } = context;

			if (iconStyle === 'plus-minus') {
				return isOpen ? '−' : '+';
			}
			return isOpen ? '▲' : '▼';
		},
	},
});

/**
 * NOTE: Empty accordion detection removed
 *
 * Empty blocks are now detected at save time via the hasDescription attribute,
 * so they render as plain <div> instead of <details> - no runtime cleanup needed.
 *
 * Migration: Existing blocks will update to the new system when edited.
 */
