import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemTable from './components/ItemTable';
import Login from './components/LoginForm';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateItemForm from './components/CreateItemForm';
import ItemDetails from './components/ItemDetails';
import DiscontinuedItemForm from './components/DiscontinuedItemForm';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/items" component={ItemTable} />
          <Route path="/add-item/:itemCode" component={CreateItemForm} />
          <Route path="/itemDetails/:itemCode" component={ItemDetails} />
          <Route path="/discontinued-item/:itemCode" component={DiscontinuedItemForm} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
