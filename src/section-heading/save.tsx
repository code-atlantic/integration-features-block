/**
 * Save component for Section Heading block
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import React from 'react';

import type { SaveProps } from './types';

/**
 * Save component for Section Heading block
 */
export default function Save({ attributes }: SaveProps) {
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
						className={`pm-section-heading__title${hasLink ? ' pm-toc-heading' : ''}`}
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
						<i
							className={`dashicons ${isExternalLink ? 'dashicons-external' : 'dashicons-arrow-right-alt'}`}
							aria-hidden="true"
						/>
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
}
