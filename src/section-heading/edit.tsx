/**
 * Edit component for Section Heading block
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
	// @ts-ignore - LinkControl is experimental
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Popover,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { link as linkIcon } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import React from 'react';

import type { EditProps } from './types';
import { isExternalUrl } from './types';


/**
 * Edit component for Section Heading block
 */
export default function Edit({ attributes, setAttributes }: EditProps) {
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

	const [isLinkPickerOpen, setIsLinkPickerOpen] = useState(false);

	const hasLink = viewAllLink?.url && viewAllLink.url.trim().length > 0;

	/**
	 * Compute isExternal and sync to attribute when URL changes
	 * This ensures deterministic save output
	 */
	const computedIsExternal = hasLink ? isExternalUrl(viewAllLink.url) : false;
	useEffect(() => {
		if (computedIsExternal !== isExternalLink) {
			setAttributes({ isExternalLink: computedIsExternal });
		}
	}, [computedIsExternal, isExternalLink, setAttributes]);

	const blockProps = useBlockProps({
		className: 'pm-section-heading',
	});

	return (
		<>
			{/* Toolbar with Link Picker */}
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={linkIcon}
						label={__('View All Link', 'popup-maker')}
						onClick={() => setIsLinkPickerOpen(!isLinkPickerOpen)}
						isPressed={hasLink}
					/>
					{isLinkPickerOpen && (
						<Popover
							position="bottom center"
							onClose={() => setIsLinkPickerOpen(false)}
						>
							<div style={{ minWidth: '300px', padding: '16px' }}>
								<LinkControl
									value={viewAllLink}
									onChange={(newLink: typeof viewAllLink | null) =>
										setAttributes({
											viewAllLink: newLink || {
												url: '',
												opensInNewTab: false,
											},
										})
									}
									settings={[
										{
											id: 'opensInNewTab',
											title: __('Open in new tab', 'popup-maker'),
										},
									]}
								/>
							</div>
						</Popover>
					)}
				</ToolbarGroup>
			</BlockControls>

			{/* Sidebar Controls */}
			<InspectorControls>
				<PanelBody
					title={__('Heading Settings', 'popup-maker')}
					initialOpen={true}
				>
					<SelectControl
						label={__('Heading Tag', 'popup-maker')}
						value={headingTag}
						options={[
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
						]}
						onChange={(value) =>
							setAttributes({ headingTag: value as 'h2' | 'h3' })
						}
					/>
				</PanelBody>

				<PanelBody
					title={__('View All Link', 'popup-maker')}
					initialOpen={false}
				>
					<LinkControl
						value={viewAllLink}
						onChange={(newLink: typeof viewAllLink | null) =>
							setAttributes({
								viewAllLink: newLink || { url: '', opensInNewTab: false },
							})
						}
						settings={[
							{
								id: 'opensInNewTab',
								title: __('Open in new tab', 'popup-maker'),
							},
						]}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Colors', 'popup-maker')}
					initialOpen={false}
					colorSettings={[
						{
							value: headingColor,
							onChange: (color: string | undefined) =>
								setAttributes({ headingColor: color || '' }),
							label: __('Heading', 'popup-maker'),
						},
						{
							value: subtitleColor,
							onChange: (color: string | undefined) =>
								setAttributes({ subtitleColor: color || '' }),
							label: __('Subtitle', 'popup-maker'),
						},
						{
							value: linkColor,
							onChange: (color: string | undefined) =>
								setAttributes({ linkColor: color || '' }),
							label: __('Link', 'popup-maker'),
						},
					]}
				/>
			</InspectorControls>

			{/* Block Content */}
			<div {...blockProps}>
				<div className="pm-section-heading__header">
					<RichText
						tagName={headingTag as any}
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
						placeholder={__('Section heading...', 'popup-maker')}
						className="pm-section-heading__title pm-toc-heading"
						style={{ color: headingColor || undefined }}
						allowedFormats={['core/bold', 'core/italic']}
					/>
					{hasLink && (
						<span
							className="pm-section-heading__link"
							style={{ color: linkColor || undefined }}
						>
							{__('View all', 'popup-maker')}
							<i
								className={`dashicons ${isExternalLink ? 'dashicons-external' : 'dashicons-arrow-right-alt'}`}
								aria-hidden="true"
							/>
						</span>
					)}
				</div>
				<RichText
					tagName="p"
					value={subtitle}
					onChange={(value) => setAttributes({ subtitle: value })}
					placeholder={__('Optional subtitle...', 'popup-maker')}
					className="pm-section-heading__subtitle"
					style={{ color: subtitleColor || undefined }}
					allowedFormats={['core/bold', 'core/italic', 'core/link']}
				/>
			</div>
		</>
	);
}
