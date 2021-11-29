import { BrowserRouter } from 'react-router-dom'
import Root from "./Root";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
