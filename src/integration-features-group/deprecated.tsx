/**
 * Deprecated versions of Integration Features Group block
 */

import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import React from 'react';
import type { IntegrationFeaturesGroupAttributes } from './types';

/**
 * V1: Original version without heading wrapper (pre-featureCount)
 *
 * Missing:
 * - showFeatureCount attribute
 * - featureCount attribute
 * - __heading-wrapper div around heading
 */
const v1 = {
	attributes: {
		groupIcon: {
			type: 'string' as const,
			default: 'admin-plugins',
		},
		groupIconColor: {
			type: 'string' as const,
			default: '#1e1e1e',
		},
		groupIconBackgroundColor: {
			type: 'string' as const,
			default: '',
		},
		heading: {
			type: 'string' as const,
			default: '',
		},
		headingTag: {
			type: 'string' as const,
			enum: ['h2', 'h3'] as const,
			default: 'h2',
		},
		subheading: {
			type: 'string' as const,
			default: '',
		},
		iconAnimation: {
			type: 'string' as const,
			enum: ['rotate-45', 'rotate-180'] as const,
			default: 'rotate-45',
		},
		oneOpenPerGroup: {
			type: 'boolean' as const,
			default: true,
		},
		defaultOpen: {
			type: 'boolean' as const,
			default: false,
		},
		groupCollapsible: {
			type: 'boolean' as const,
			default: false,
		},
		groupCollapsed: {
			type: 'boolean' as const,
			default: true,
		},
		hasFeatures: {
			type: 'boolean' as const,
			default: false,
		},
		headerBackgroundColor: {
			type: 'string' as const,
			default: '',
		},
		headingColor: {
			type: 'string' as const,
			default: '',
		},
		subheadingColor: {
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
			blockGap: true,
		},
		interactivity: true,
		color: {
			background: true,
			text: true,
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

	save({ attributes }: { attributes: Omit<IntegrationFeaturesGroupAttributes, 'showFeatureCount' | 'featureCount'> }) {
		const {
			groupIcon,
			groupIconColor,
			groupIconBackgroundColor,
			heading,
			headingTag,
			subheading,
			iconAnimation,
			oneOpenPerGroup,
			defaultOpen,
			groupCollapsible,
			groupCollapsed,
			hasFeatures,
			headerBackgroundColor,
			headingColor,
			subheadingColor,
		} = attributes;

		const blockPropsRaw = useBlockProps.save({
			className: `pm-integration-features-group ${
				hasFeatures ? 'has-features' : ''
			} ${groupCollapsed ? 'is-collapsed' : ''}`,
			'data-icon': groupIcon,
			'data-icon-animation': iconAnimation,
			'data-wp-interactive': 'popup-maker/integration-features-group',
			'data-wp-context': JSON.stringify({
				groupId: '',
				groupIcon,
				groupIconColor,
				iconAnimation,
				oneOpenPerGroup,
				defaultOpen,
				groupCollapsible,
				groupCollapsed,
				openFeatureId: null,
			}),
			'data-wp-init': 'callbacks.init',
		});

		// Extract padding from blockProps to apply to children instead
		const {
			padding,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			...blockPropsStyle
		} = (blockPropsRaw.style || {}) as Record<string, any>;

		const blockProps = {
			...blockPropsRaw,
			style: blockPropsStyle,
		};

		const innerBlocksProps = useInnerBlocksProps.save({
			className: `pm-integration-features-group__features ${
				groupCollapsed ? 'is-hidden' : ''
			}`,
			style: {
				backgroundColor: blockProps.style?.backgroundColor || undefined,
				color: blockProps.style?.color || undefined,
				padding: padding || '2rem',
				paddingTop: paddingTop || undefined,
				paddingRight: paddingRight || undefined,
				paddingBottom: paddingBottom || undefined,
				paddingLeft: paddingLeft || undefined,
			},
		});

		return (
			<div {...blockProps}>
				<div
					className="pm-integration-features-group__header"
					style={{
						backgroundColor: headerBackgroundColor || undefined,
						borderColor: blockProps.style?.borderColor || undefined,
						borderStyle: blockProps.style?.borderStyle || undefined,
						borderWidth: blockProps.style?.borderWidth || undefined,
						borderBottomColor: blockProps.style?.borderColor || undefined,
						borderBottomStyle: blockProps.style?.borderStyle || undefined,
						borderBottomWidth: blockProps.style?.borderWidth || undefined,
						padding: padding || '2rem',
						paddingTop: paddingTop || undefined,
						paddingRight: paddingRight || undefined,
						paddingBottom: paddingBottom || undefined,
						paddingLeft: paddingLeft || undefined,
					}}
					role={groupCollapsible ? 'button' : undefined}
					tabIndex={groupCollapsible ? 0 : undefined}
					data-wp-on--click={groupCollapsible ? 'actions.toggleGroup' : undefined}
					data-wp-on--keydown={groupCollapsible ? 'actions.toggleGroup' : undefined}
				>
					{groupIcon && (
						<i
							className={`pm-integration-features-group__icon dashicons ${groupIcon}`}
							style={{
								color: groupIconColor,
								backgroundColor: groupIconBackgroundColor || groupIconColor + '33'
							}}
							aria-hidden="true"
						/>
					)}

					{/* Old structure: heading directly in __text, no wrapper */}
					<div className="pm-integration-features-group__text">
						{heading && (
							<RichText.Content
								tagName={headingTag as any}
								className="pm-integration-features-group__heading"
								value={heading}
								style={{
									color: headingColor || undefined
								}}
							/>
						)}
						{subheading && (
							<RichText.Content
								tagName="p"
								className="pm-integration-features-group__subheading"
								value={subheading}
								style={{
									color: subheadingColor || undefined
								}}
							/>
						)}
					</div>

					{groupCollapsible && (
						<i
							className={`pm-integration-features-group__toggle dashicons ${
								iconAnimation === 'rotate-45' ? 'dashicons-plus' : 'dashicons-arrow-up-alt2'
							} ${groupCollapsed ? 'is-collapsed' : 'is-expanded'}`}
							aria-hidden="true"
						/>
					)}
				</div>

				<div {...innerBlocksProps} />
			</div>
		);
	},

	migrate(attributes: Omit<IntegrationFeaturesGroupAttributes, 'showFeatureCount' | 'featureCount'>) {
		// Add new attributes with defaults
		return {
			...attributes,
			showFeatureCount: false,
			featureCount: 0,
		};
	},
};

/**
 * V2: Version with heading wrapper but without pm-toc-heading class
 */
const v2 = {
	attributes: {
		groupIcon: {
			type: 'string' as const,
			default: 'admin-plugins',
		},
		groupIconColor: {
			type: 'string' as const,
			default: '#1e1e1e',
		},
		groupIconBackgroundColor: {
			type: 'string' as const,
			default: '',
		},
		heading: {
			type: 'string' as const,
			default: '',
		},
		headingTag: {
			type: 'string' as const,
			enum: ['h2', 'h3'] as const,
			default: 'h2',
		},
		subheading: {
			type: 'string' as const,
			default: '',
		},
		iconAnimation: {
			type: 'string' as const,
			enum: ['rotate-45', 'rotate-180'] as const,
			default: 'rotate-45',
		},
		oneOpenPerGroup: {
			type: 'boolean' as const,
			default: true,
		},
		defaultOpen: {
			type: 'boolean' as const,
			default: false,
		},
		groupCollapsible: {
			type: 'boolean' as const,
			default: false,
		},
		groupCollapsed: {
			type: 'boolean' as const,
			default: true,
		},
		hasFeatures: {
			type: 'boolean' as const,
			default: false,
		},
		showFeatureCount: {
			type: 'boolean' as const,
			default: false,
		},
		featureCount: {
			type: 'number' as const,
			default: 0,
		},
		headerBackgroundColor: {
			type: 'string' as const,
			default: '',
		},
		headingColor: {
			type: 'string' as const,
			default: '',
		},
		subheadingColor: {
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
			blockGap: true,
		},
		interactivity: true,
		color: {
			background: true,
			text: true,
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

	save({ attributes }: { attributes: IntegrationFeaturesGroupAttributes }) {
		const {
			groupIcon,
			groupIconColor,
			groupIconBackgroundColor,
			heading,
			headingTag,
			subheading,
			iconAnimation,
			oneOpenPerGroup,
			defaultOpen,
			groupCollapsible,
			groupCollapsed,
			hasFeatures,
			showFeatureCount,
			featureCount,
			headerBackgroundColor,
			headingColor,
			subheadingColor,
		} = attributes;

		const blockPropsRaw = useBlockProps.save({
			className: `pm-integration-features-group ${
				hasFeatures ? 'has-features' : ''
			} ${groupCollapsed ? 'is-collapsed' : ''}`,
			'data-icon': groupIcon,
			'data-icon-animation': iconAnimation,
			'data-wp-interactive': 'popup-maker/integration-features-group',
			'data-wp-context': JSON.stringify({
				groupId: '',
				groupIcon,
				groupIconColor,
				iconAnimation,
				oneOpenPerGroup,
				defaultOpen,
				groupCollapsible,
				groupCollapsed,
				openFeatureId: null,
			}),
			'data-wp-init': 'callbacks.init',
		});

		const {
			padding,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			...blockPropsStyle
		} = (blockPropsRaw.style || {}) as Record<string, any>;

		const blockProps = {
			...blockPropsRaw,
			style: blockPropsStyle,
		};

		const innerBlocksProps = useInnerBlocksProps.save({
			className: `pm-integration-features-group__features ${
				groupCollapsed ? 'is-hidden' : ''
			}`,
			style: {
				backgroundColor: blockProps.style?.backgroundColor || undefined,
				color: blockProps.style?.color || undefined,
				padding: padding || '2rem',
				paddingTop: paddingTop || undefined,
				paddingRight: paddingRight || undefined,
				paddingBottom: paddingBottom || undefined,
				paddingLeft: paddingLeft || undefined,
			},
		});

		return (
			<div {...blockProps}>
				<div
					className="pm-integration-features-group__header"
					style={{
						backgroundColor: headerBackgroundColor || undefined,
						borderColor: blockProps.style?.borderColor || undefined,
						borderStyle: blockProps.style?.borderStyle || undefined,
						borderWidth: blockProps.style?.borderWidth || undefined,
						borderBottomColor: blockProps.style?.borderColor || undefined,
						borderBottomStyle: blockProps.style?.borderStyle || undefined,
						borderBottomWidth: blockProps.style?.borderWidth || undefined,
						padding: padding || '2rem',
						paddingTop: paddingTop || undefined,
						paddingRight: paddingRight || undefined,
						paddingBottom: paddingBottom || undefined,
						paddingLeft: paddingLeft || undefined,
					}}
					role={groupCollapsible ? 'button' : undefined}
					tabIndex={groupCollapsible ? 0 : undefined}
					data-wp-on--click={groupCollapsible ? 'actions.toggleGroup' : undefined}
					data-wp-on--keydown={groupCollapsible ? 'actions.toggleGroup' : undefined}
				>
					{groupIcon && (
						<i
							className={`pm-integration-features-group__icon dashicons ${groupIcon}`}
							style={{
								color: groupIconColor,
								backgroundColor: groupIconBackgroundColor || groupIconColor + '33'
							}}
							aria-hidden="true"
						/>
					)}

					<div className="pm-integration-features-group__text">
						{heading && (
							<div className="pm-integration-features-group__heading-wrapper">
								{/* V2: Missing pm-toc-heading class */}
								<RichText.Content
									tagName={headingTag as any}
									className="pm-integration-features-group__heading"
									value={heading}
									style={{
										color: headingColor || undefined
									}}
								/>
								{showFeatureCount && featureCount > 0 && (
									<span
										className="pm-integration-features-group__count"
										style={{ color: headingColor || undefined }}
									>
										({featureCount})
									</span>
								)}
							</div>
						)}
						{subheading && (
							<RichText.Content
								tagName="p"
								className="pm-integration-features-group__subheading"
								value={subheading}
								style={{
									color: subheadingColor || undefined
								}}
							/>
						)}
					</div>

					{groupCollapsible && (
						<i
							className={`pm-integration-features-group__toggle dashicons ${
								iconAnimation === 'rotate-45' ? 'dashicons-plus' : 'dashicons-arrow-up-alt2'
							} ${groupCollapsed ? 'is-collapsed' : 'is-expanded'}`}
							aria-hidden="true"
						/>
					)}
				</div>

				<div {...innerBlocksProps} />
			</div>
		);
	},

	migrate(attributes: IntegrationFeaturesGroupAttributes) {
		// No attribute changes, just markup update
		return attributes;
	},
};

// Export in reverse chronological order (newest first)
export default [v2, v1];
