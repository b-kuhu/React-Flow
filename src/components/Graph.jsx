import { ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';
import AddNode from './AddNode';


const Graph =  () => {
  return (
    <ReactFlowProvider>
      <AddNode />
    </ReactFlowProvider>
  );
}
export default Graph;