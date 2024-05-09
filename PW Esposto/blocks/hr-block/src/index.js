import { registerBlockType } from "@wordpress/blocks";

import { __ } from "@wordpress/i18n";

import {
  BlockControls,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";

import {
  PanelBody,
  RangeControl,
  ToolbarGroup,
  ToolbarDropdownMenu,
} from "@wordpress/components";

import json from "../block.json";

const { name, title, description } = json;

registerBlockType(name, {
  title: title,
  description: description,
  attributes: {
    blockId: {
      type: "string",
    },
    width: {
      type: "number",
      default: 100,
    },
    height: {
      type: "number",
      default: 1,
    },
    content: {
      type: "string",
    },
  },
  edit: (props) => {
    props.setAttributes({ blockId: props.clientId });

    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls key="settings" group="settings">
          <PanelBody title="Dimensions" initialOpen={true}>
            <RangeControl
              label={__("Width")}
              help="Width in percentage"
              value={props.attributes.width}
              onChange={(width) => props.setAttributes({ width })}
              min={1}
              max={100}
            />
            <RangeControl
              label={__("Height")}
              help="Height in pixels"
              value={props.attributes.height}
              onChange={(height) => props.setAttributes({ height })}
              min={1}
              max={10}
            />
          </PanelBody>
        </InspectorControls>
        <InspectorControls key="styles" group="styles"></InspectorControls>
        <BlockControls key="controls">
          <ToolbarGroup>
            <ToolbarDropdownMenu
              label="Change width"
              icon="leftright"
              controls={[
                {
                  title: "25%",
                  onClick: () => props.setAttributes({ width: 25 }),
                },
                {
                  title: "50%",
                  onClick: () => props.setAttributes({ width: 50 }),
                },
                {
                  title: "75%",
                  onClick: () => props.setAttributes({ width: 75 }),
                },
                {
                  title: "100%",
                  onClick: () => props.setAttributes({ width: 100 }),
                },
              ]}
            />
            <ToolbarDropdownMenu
              label="Change height"
              icon="sort"
              controls={[
                {
                  title: "1px",
                  onClick: () => props.setAttributes({ height: 1 }),
                },
                {
                  title: "5px",
                  onClick: () => props.setAttributes({ height: 5 }),
                },
                {
                  title: "10px",
                  onClick: () => props.setAttributes({ height: 10 }),
                },
              ]}
            />
          </ToolbarGroup>
        </BlockControls>
        <hr
          {...blockProps}
          style={{
            width: `${props.attributes.width}%`,
            height: `${props.attributes.height}px`,
          }}
        />
      </>
    );
  },
  save: (props) => {
    const blockProps = useBlockProps.save({
      id: props.attributes.blockId,
      style: {
        width: `${props.attributes.width}%`,
        height: `${props.attributes.height}px`,
      },
    });

    return (
      <>
        <style>
          {`#${props.attributes.blockId} { width: ${props.attributes.width}%; height: ${props.attributes.height}px; }`}
        </style>
        <hr {...blockProps} />
      </>
    );
  },
});
