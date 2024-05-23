import { ThemeProvider } from '@mui/material';
import './App.css'
import { darkTheme } from './theme/darkTheme';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import Auth from './Component/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import store from './ReduxToolKit/Store'
import { useEffect } from 'react';
import { fetchTasks } from './ReduxToolKit/TaskSlice';
import { getUserProfile } from './ReduxToolKit/AuthSlice';


function App() {
  const user= true;
  const dispatch=useDispatch();
  const {task,auth}= useSelector(store=>store);


  useEffect(()=>{
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(auth.jwt ||localStorage.getItem("jwt")));
  },[auth.jwt])


  return (
    <ThemeProvider theme={darkTheme}>
      {auth.user ? <div>
      <Navbar />
      <Home />
      </div> : <Auth /> }
    </ThemeProvider>
     
  );
}

export default App
