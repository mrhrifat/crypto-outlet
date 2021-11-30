import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import store from './app/store'
import Root from "./Root";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Root />
        </Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;