import { useCallback } from 'react';
import ReactFlow, { useReactFlow,NodeToolbar,Position } from 'reactflow';
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
const AddNode = () => {
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
      type:'node-with-toolbar',
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const nodeTypes = {
    'node-with-toolbar': NodeWithToolbar,
  };
  
  const NodeWithToolbar = ({ data }) => {
    return (
      <>
        <NodeToolbar
          isVisible={data.forceToolbarVisible || undefined}
          position={data.toolbarPosition}
        >
          <button>cut</button>
          <button>copy</button>
          <button>paste</button>
        </NodeToolbar>
        <div className="react-flow__node-default">{data?.label}</div>
      </>
    );
  }

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

  setPosition(Position.Right)
   
  return (
    <div style={{width:'100vw',height:'100vh'}}>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        nodeTypes={nodeTypes}
        preventScrolling={false}
        fitView
        style={{
          backgroundColor: '#D3D2E5',
        }}
        connectionLineStyle={connectionLineStyle}
      />
      <button style={{position:'absolute',zIndex:'10',top:'10px',left:'10px',padding:'0.5rem',backgroundColor:'white',borderRadius:'0.5rem',margin:'1rem'}} onClick={onClick} className="btn-add">
        Create Node
      </button>
    </div>
  );
}

export default AddNode;