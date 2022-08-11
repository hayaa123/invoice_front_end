import './App.css';
import FormInvoice from './components/FormInvoice'
import 'bootstrap/dist/css/bootstrap.min.css';
import InvoiceList from './components/InvoiceList';

function App() {
  return (
    <div>
      <FormInvoice/>
      <InvoiceList/>
    </div>
  );
}

export default App;
