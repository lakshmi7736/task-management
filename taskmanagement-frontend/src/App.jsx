import { ThemeProvider } from '@mui/material';
import './App.css'
import { darkTheme } from './theme/darkTheme';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';


function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <Home />
    </ThemeProvider>
     
  );
}

export default App
