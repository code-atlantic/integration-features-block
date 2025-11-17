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
 * Hide empty accordion details elements on page load
 * This handles blocks that were saved with empty content
 */
document.addEventListener('DOMContentLoaded', () => {
	const features = document.querySelectorAll('.pm-integration-feature.has-description details');

	features.forEach((details) => {
		const description = details.querySelector('.pm-integration-feature__description');
		if (!description) return;

		// Check if description is truly empty (only whitespace or empty tags)
		const text = description.textContent?.trim() || '';
		const hasImages = description.querySelector('img');
		const hasIframes = description.querySelector('iframe');
		const hasVideos = description.querySelector('video');

		// If no meaningful content, hide the icon and prevent accordion behavior
		if (!text && !hasImages && !hasIframes && !hasVideos) {
			const icon = details.querySelector('.pm-integration-feature__icon');
			if (icon) {
				icon.style.display = 'none';
			}

			// Prevent opening
			details.addEventListener('toggle', (e) => {
				if (details.open) {
					e.preventDefault();
					details.open = false;
				}
			});

			// Remove accordion styling
			details.style.cursor = 'default';
			const summary = details.querySelector('summary');
			if (summary) {
				summary.style.cursor = 'default';
			}
		}
	});
});
