/**
 * Deprecated versions of Section Heading block
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import React from 'react';
import type { SectionHeadingAttributes } from './types';

/**
 * Inline SVG components used in v1 (before dashicons migration)
 */
const ArrowRightIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="pm-section-heading__icon"
		aria-hidden="true"
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

const ExternalIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="pm-section-heading__icon"
		aria-hidden="true"
	>
		<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		<polyline points="15 3 21 3 21 9" />
		<line x1="10" y1="14" x2="21" y2="3" />
	</svg>
);

/**
 * V1: Original version with inline SVGs and without pm-toc-heading class
 *
 * Changes from v1 to current:
 * - Replaced inline SVG icons with WordPress dashicons
 * - Added pm-toc-heading class to title for TOC extraction
 */
const v1 = {
	attributes: {
		heading: {
			type: 'string' as const,
			default: '',
		},
		headingTag: {
			type: 'string' as const,
			enum: ['h2', 'h3'] as const,
			default: 'h2',
		},
		subtitle: {
			type: 'string' as const,
			default: '',
		},
		viewAllLink: {
			type: 'object' as const,
			default: {
				url: '',
				opensInNewTab: false,
			},
		},
		isExternalLink: {
			type: 'boolean' as const,
			default: false,
		},
		headingColor: {
			type: 'string' as const,
			default: '',
		},
		subtitleColor: {
			type: 'string' as const,
			default: '',
		},
		linkColor: {
			type: 'string' as const,
			default: '',
		},
	},

	supports: {
		html: false,
		anchor: true,
		align: ['wide', 'full'],
		className: true,
		customClassName: true,
		spacing: {
			margin: true,
			padding: true,
		},
		color: {
			background: true,
			text: false,
			link: false,
		},
		__experimentalBorder: {
			color: true,
			radius: true,
			style: true,
			width: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
		},
	},

	save({ attributes }: { attributes: SectionHeadingAttributes }) {
		const {
			heading,
			headingTag,
			subtitle,
			viewAllLink,
			isExternalLink,
			headingColor,
			subtitleColor,
			linkColor,
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'pm-section-heading',
		});

		const hasLink = viewAllLink?.url && viewAllLink.url.trim().length > 0;
		const opensInNewTab = viewAllLink?.opensInNewTab;

		return (
			<div {...blockProps}>
				<div className="pm-section-heading__header">
					{heading && (
						<RichText.Content
							tagName={headingTag as any}
							// v1: Missing pm-toc-heading class
							className="pm-section-heading__title"
							value={heading}
							style={{ color: headingColor || undefined }}
						/>
					)}
					{hasLink && (
						<a
							href={viewAllLink.url}
							className="pm-section-heading__link"
							target={opensInNewTab ? '_blank' : undefined}
							rel={opensInNewTab ? 'noopener noreferrer' : undefined}
							style={{ color: linkColor || undefined }}
						>
							View all
							{/* v1: Uses inline SVG icons instead of dashicons */}
							{isExternalLink ? <ExternalIcon /> : <ArrowRightIcon />}
						</a>
					)}
				</div>
				{subtitle && (
					<RichText.Content
						tagName="p"
						className="pm-section-heading__subtitle"
						value={subtitle}
						style={{ color: subtitleColor || undefined }}
					/>
				)}
			</div>
		);
	},

	migrate(attributes: SectionHeadingAttributes) {
		// No attribute changes needed, just markup update
		return attributes;
	},
};

// Export in reverse chronological order (newest first)
export default [v1];
