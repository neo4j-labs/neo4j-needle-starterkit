import { valueIsArray, valueIsNode, valueIsRelationship, valueIsPath, toNumber } from './ChartUtils';
export function extractGraphEntitiesFromField(
    value,
    nodes: Record<string, any>[],
    links: Record<string, any>[],
    nodeLabels: Record<string, any>,
    linkTypes: Record<string, any>,
    frozen: boolean,
    nodeSizeProperty: string,
    defaultNodeSize: number,
    relWidthProperty: string,
    defaultRelWidth: number,
    relColorProperty: string,
    defaultRelColor: string,
    nodePositions: Record<string, any>[]
  ) {
    if (value == undefined) {
      return;
    }
    if (valueIsArray(value)) {
      value.forEach((v) =>
        extractGraphEntitiesFromField(
          v,
          nodes,
          links,
          nodeLabels,
          linkTypes,
          frozen,
          nodeSizeProperty,
          defaultNodeSize,
          relWidthProperty,
          defaultRelWidth,
          relColorProperty,
          defaultRelColor,
          nodePositions
        )
      );
    } else if (valueIsNode(value)) {
      value.labels.forEach((l) => (nodeLabels[l] = true));
      nodes[value.identity.low] = {
        id: value.identity.low,
        labels: value.labels,
        size: !Number.isNaN(value.properties[nodeSizeProperty])
          ? toNumber(value.properties[nodeSizeProperty])
          : defaultNodeSize,
        properties: value.properties,
        mainLabel: value.labels[value.labels.length - 1],
      };
      if (frozen && nodePositions && nodePositions[value.identity.low]) {
        nodes[value.identity.low].fx = nodePositions[value.identity.low][0];
        nodes[value.identity.low].fy = nodePositions[value.identity.low][1];
      }
    } else if (valueIsRelationship(value)) {
      if (links[`${value.start.low},${value.end.low}`] == undefined) {
        links[`${value.start.low},${value.end.low}`] = [];
      }
      const addItem = (arr, item) => arr.find((x) => x.id === item.id) || arr.push(item);
      addItem(links[`${value.start.low},${value.end.low}`], {
        id: value.identity.low,
        source: value.start.low,
        target: value.end.low,
        type: value.type,
        width:
          value.properties[relWidthProperty] !== undefined && !Number.isNaN(value.properties[relWidthProperty])
            ? toNumber(value.properties[relWidthProperty])
            : defaultRelWidth,
        color: value.properties[relColorProperty] ? value.properties[relColorProperty] : defaultRelColor,
        properties: value.properties,
      });
    } else if (valueIsPath(value)) {
      value.segments.map((segment) => {
        extractGraphEntitiesFromField(
          segment.start,
          nodes,
          links,
          nodeLabels,
          linkTypes,
          frozen,
          nodeSizeProperty,
          defaultNodeSize,
          relWidthProperty,
          defaultRelWidth,
          relColorProperty,
          defaultRelColor,
          nodePositions
        );
        extractGraphEntitiesFromField(
          segment.relationship,
          nodes,
          links,
          nodeLabels,
          linkTypes,
          frozen,
          nodeSizeProperty,
          defaultNodeSize,
          relWidthProperty,
          defaultRelWidth,
          relColorProperty,
          defaultRelColor,
          nodePositions
        );
        extractGraphEntitiesFromField(
          segment.end,
          nodes,
          links,
          nodeLabels,
          linkTypes,
          frozen,
          nodeSizeProperty,
          defaultNodeSize,
          relWidthProperty,
          defaultRelWidth,
          relColorProperty,
          defaultRelColor,
          nodePositions
        );
      });
    }
  }