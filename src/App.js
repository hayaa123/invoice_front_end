import './App.css';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom'
import InvoiceDetail from './components/InvoiceDetail';
function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/:id" element ={<InvoiceDetail/>}/>
          </Routes>


      </Router>

    </div>
  );
}

export default App;
