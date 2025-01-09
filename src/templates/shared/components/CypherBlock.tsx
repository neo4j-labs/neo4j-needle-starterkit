import React, { useEffect, useRef, useState } from 'react';

import "@neo4j-cypher/codemirror/css/cypher-codemirror.css";
import { CypherEditor } from "@neo4j-cypher/react-codemirror";

import type { NVL, HitTargets, Node, Relationship } from '@neo4j-nvl/base';
import { InteractiveNvlWrapper } from '@neo4j-nvl/react';
import type { MouseEventCallbacks } from '@neo4j-nvl/react';
import { Box, Flex, IconButton, StatusIndicator, toast, Toaster, Tooltip, Typography } from '@neo4j-ndl/react';
import { Cog6ToothIconOutline, FitToScreenIcon, PlayCircleIconOutline, ResetZoomIcon } from '@neo4j-ndl/react/icons';

import { Driver } from 'neo4j-driver';
import { runQuery, setDriver } from '../utils/Driver';

import { ThemeWrapperContext } from '../../../context/ThemeWrapper';
import ConnectionModal from './ConnectionModal';

interface CypherBlockProps {
  neo4jConnection?: Driver | string;
  initialQuery?: string;
  limitResultSet: number;
}

export default function CypherBlock(props: CypherBlockProps) {
  const themeUtils = React.useContext(ThemeWrapperContext);
  const [themeMode] = useState<string>(themeUtils.colorMode);

  const [openConnection, setOpenConnection] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false);

  const cypherEditorProps = { lineNumbers: false, lint: true, autocomplete: true, theme: themeMode, onValueChanged: (value: string) => setQuery(value) };
  const nvl = useRef<NVL | null>(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [rels, setRels] = useState<Relationship[]>([]);

  const [query, setQuery] = useState<string>(props.initialQuery ?? "MATCH (a) \nRETURN a");
  const [queryLimit, setqueryLimit] = useState<number | boolean>(false);
  const [isMultiQuery, setIsMultiQuery] = useState<boolean>(false);

  const mouseEventCallbacks: MouseEventCallbacks = {
    onHover: (_element: Node | Relationship, _hitTargets: HitTargets, _evt: MouseEvent) => null,
    onRelationshipRightClick: (_rel: Relationship, _hitTargets: HitTargets, _evt: MouseEvent) => null,
    onNodeClick: (_node: Node, _hitTargets: HitTargets, _evt: MouseEvent) => null,
    onNodeRightClick: (_node: Node, _hitTargets: HitTargets, _evt: MouseEvent) => null,
    onNodeDoubleClick: (_node: Node, _hitTargets: HitTargets, _evt: MouseEvent) => null,
    onRelationshipClick: (_rel: Relationship, _hitTargets: HitTargets, _evt: MouseEvent) => null,
    onRelationshipDoubleClick: (_rel: Relationship, _hitTargets: HitTargets, _evt: MouseEvent) => null,
    onCanvasClick: (_evt: MouseEvent) => null,
    onCanvasDoubleClick: (_evt: MouseEvent) => null,
    onCanvasRightClick: (_evt: MouseEvent) => null,
    onDrag: (_nodes: Node[]) => null,
    onPan: (_panning: { x: number; y: number }, _evt: MouseEvent) => null,
    onZoom: (_zoomLevel: number) => null,
  };

  const fitNodes = () => {
    nvl.current?.fit(nodes.map((n) => n.id));
  };
  const resetZoom = () => {
    nvl.current?.resetZoom();
  };

  function setDriverFromProps() {
    let driver: Driver = {} as Driver;
    if (props.neo4jConnection && typeof props.neo4jConnection === 'string') {
      const connectionDetailsString = localStorage.getItem(props.neo4jConnection) ?? '';
      const connectionDetails: { uri: string; user: string; password: string } = JSON.parse(connectionDetailsString);
      return setDriver(connectionDetails.uri, connectionDetails.user, connectionDetails.password).then((d: Driver | boolean) => {
      if (d instanceof Driver) {
        return d;
      }
      throw new Error('Failed to set driver');
      });
    } else if (typeof props.neo4jConnection === 'object' && props.neo4jConnection.constructor.name === 'Driver2') {
      driver = props.neo4jConnection;
    }
    return Promise.resolve(driver);
  }

   function submitQuery (query: string)  {
    const limit = !queryLimit ? props.limitResultSet : false;
    !queryLimit ? toast.danger(`You have not set a LIMIT in your return. We have applied a default of ${props.limitResultSet}`, {isCloseable: true, shouldAutoClose: true}) : null;
    isMultiQuery ? toast.danger('Multi-query detected, only single queries are supported. Execution has been cancelled.', {isCloseable: true, shouldAutoClose: true}) : null;
    if (!isMultiQuery){
      setDriverFromProps().then((driver) => {
        runQuery(query, driver, limit).then((nvlGraph) => {
            if ('error' in nvlGraph) {
              toast.danger(`Query error: ${nvlGraph.error}`, { isCloseable: true, shouldAutoClose: true });
            } else {
              if (nvlGraph.nodes.length === 0 && nvlGraph.relationships.length === 0) {
              toast.neutral('Query returned no results', { isCloseable: true, shouldAutoClose: true });
              }
              setNodes(nvlGraph.nodes);
              setRels(nvlGraph.relationships);
            }
        });
      });
    }
  }

  useEffect(() => {
    const checkLimit = (query: string) => {
      const limitPattern = /LIMIT\s+(\d+);?$/i;
      const match = query.match(limitPattern);
      if (match) {
        return (parseInt(match[1], 10));
      }
      return false;
    };

    const checkMultiQuery = (query: string) => {
      const multiQueryPattern = /;(.+)/s;
      return multiQueryPattern.test(query);
    };

    setIsMultiQuery(checkMultiQuery(query));

    setqueryLimit(checkLimit(query));
  }, [query]);

  return (
    <div className='min-h-screen max-h-full p-8 grid grid-cols-1 gap-8 n-bg-palette-neutral-bg-default'>
      <ConnectionModal
              open={openConnection}
              setOpenConnection={setOpenConnection}
              setConnectionStatus={setConnectionStatus}
            />
      <div className='p-4 justify-center align-middle'>
      <div
        className="flex flex-col justify-between relative"
        style={{
          borderRadius: '12px',
          border: '2px solid #ccc',
          padding: '16px',
          position: 'relative',
          backgroundColor: themeMode === 'dark' ? '#002b36' : '#ffffff'
        }}
      >
        <Typography variant='h5' className='mb-2'> Cypher Query </Typography>
        <Flex flexDirection='row' >
          <StatusIndicator type={connectionStatus ? 'success' : 'danger'} className='mt-1' />
          <Typography variant='body-small'>
            {connectionStatus ? `Connected` : 'Disconnected'}
          </Typography>
        </Flex>
        <Flex
          flexDirection='row'
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 10,
          }}
        >
          <Tooltip type="simple">
            <Tooltip.Trigger hasButtonWrapper>
            <IconButton className='n-size-token-7' ariaLabel='Fit to screen' isDisabled={!connectionStatus} onClick={() => submitQuery(query)}>
              <PlayCircleIconOutline />
              </IconButton>
            </Tooltip.Trigger>
            <Tooltip.Content>{connectionStatus ? 'Run your query' : 'Connect to your database first'}</Tooltip.Content>
          </Tooltip>
            <Tooltip type="simple">
            <Tooltip.Trigger hasButtonWrapper>
            <IconButton className='n-size-token-7' ariaLabel='Fit to screen' onClick={() => setOpenConnection(true)}>
              <Cog6ToothIconOutline />
            </IconButton>
            </Tooltip.Trigger>
            <Tooltip.Content>{connectionStatus ? 'Switch connection' : 'Configure your connection'}</Tooltip.Content>
          </Tooltip>
        </Flex>

        <CypherEditor
          {...cypherEditorProps}
          value={query}
          className="ndl-cypher-editor p-2"
        />
      </div>
      <Box className='button-container flex justify-between mt-2'>
        <div
          style={{
            margin: 10,
            borderRadius: 25,
            border: '2px solid #2AADA5',
            height: 800,
            background: `rgb(var(--theme-palette-neutral-bg-weak))`,
            boxShadow: `2px -2px 10px grey`,
            position: 'relative',
          }}
        >
          <Flex
            flexDirection='row'
            className='flex flex-row p-6'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <IconButton className='n-size-token-7' ariaLabel='Fit to screen' onClick={fitNodes}>
              <FitToScreenIcon />
            </IconButton>
            <IconButton className='n-size-token-7' ariaLabel='Reset zoom' onClick={resetZoom}>
              <ResetZoomIcon />
            </IconButton>
          </Flex>
          <InteractiveNvlWrapper
            ref={nvl}
            nodes={nodes}
            rels={rels}
            onClick={() => null}
            mouseEventCallbacks={mouseEventCallbacks}
            nvlOptions={{
              initialZoom: 0,
              layout: 'd3Force',
              relationshipThreshold: 1,
            }}
            className=''
          />
        </div>
      </Box>
      </div>
      <Toaster />
    </div>
  );
}
