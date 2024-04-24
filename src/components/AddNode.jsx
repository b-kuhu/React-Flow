import { useCallback } from 'react';
import { IoIosCopy } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import ReactFlow, { useReactFlow,  Panel,
    NodeToolbar,
    Position,
    useNodesState,
    useEdgesState,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge, } from 'reactflow';

import 'reactflow/dist/style.css';


const defaultNodes = [];
const defaultEdges = []
let nodeId = 0;


const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };

const nodeTypes = {
    'node-with-toolbar': NodeWithToolbar,
  };
  
  function NodeWithToolbar({ data }) {
    return (
      <>
        <NodeToolbar
          isVisible={data.forceToolbarVisible || undefined}
          position={data.toolbarPosition}
        >
          <div style={{display:'flex',flexDirection:'column'}} >
          <div className="cud-operations" style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <h2>Single Choice</h2>  
            <IoIosCopy />
            <MdDelete />
            <RxCross2 />
          </div>  
          <textarea style={{borderRadius:'0.5rem',padding:'1rem'}} name="" id="" cols="25" rows="8" placeholder='Start typing here'></textarea>
          </div>  
        </NodeToolbar>
        <div className="react-flow__node-default">{data?.label}</div>
      </>
    );
  }

const AddNode = () => {

    const [nodes, setNodes] = useNodesState(defaultNodes);
    const [edges, setEdges] = useEdgesState(defaultEdges);

    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      [],
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      [],
    );
    const setPosition = useCallback(
        (pos) =>
          setNodes((nodes) =>
            nodes.map((node) => ({
              ...node,
              data: { ...node.data, toolbarPosition: pos },
            })),
          ),
        [setNodes],
      );
  
  
  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
      type: 'node-with-toolbar',
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );   
  return (
    <div style={{width:'100vw',height:'100vh'}}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={edgeOptions}
        nodeTypes={nodeTypes}
        preventScrolling={false}
        fitView
        style={{
          backgroundColor: '#D3D2E5',
        }}
        connectionLineStyle={connectionLineStyle}
        onConnect={onConnect}
      >
        <Panel>    
          <button style={{position:'absolute',zIndex:'10',top:'50px',left:'10px',padding:'0.5rem',backgroundColor:'white',borderRadius:'0.5rem',margin:'1rem'}} onClick={() => setPosition(Position.Right)}>Right</button>
        </Panel> 
      <button style={{position:'absolute',zIndex:'10',top:'10px',left:'10px',padding:'0.5rem',backgroundColor:'white',borderRadius:'0.5rem',margin:'1rem'}} onClick={onClick} className="btn-add">
        Create Node
      </button>
        </ReactFlow>
    </div>
  );
}

export default AddNode;