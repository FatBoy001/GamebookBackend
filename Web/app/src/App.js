import './App.css';
import {Error} from "./pages/Error";
import {Subject} from './pages/Subject';
import {CreateAccount} from "./pages/CreateAccount";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Navibar} from './navibar/Navibar';
import { Profile } from './pages/Profile/Profile';
import { Update } from './pages/Profile/Update';
import {ShowClass} from './pages/Profile/ShowClass';
import { InsertClass } from './pages/Profile/InsertClass';
import { createContext, useState,useEffect} from 'react';
import Axios from 'axios';

import { AnimatePresence } from 'framer-motion';
import {Routes,Route,useLocation} from 'react-router-dom';

export const ConnectConfig = createContext();
export const UserInfo = createContext();

function App() {
  const [listOfTeachers,setListOfTeachers] = useState([]);
  const [listOfClass,setListOfClass] = useState([]);
  const IpAddress = "www.gamebook.ga/nodeAPI";
  //const IpAddress = "140.127.220.74/nodeAPI";
  useEffect(()=>{ 
    Axios.get(`https://${IpAddress}/getTeachers`).then((response)=>{
        setListOfTeachers(response.data);
    });
    Axios.get(`https://${IpAddress}/getTeacherClass`).then((response)=>{
      setListOfClass(response.data);
    });
  },[]);
  const location = useLocation();
  return (
    <div>
    <UserInfo.Provider value={{listOfTeachers,setListOfTeachers,listOfClass,setListOfClass}}>
    <ConnectConfig.Provider value={{IpAddress}}>
    <Navibar/>
      
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home/>}/>
        <Route path="/Subject" element={<Subject/>}/>
        <Route path="/CreateAccount" element={<CreateAccount/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Profile/ShowClass/:Subject" element={<ShowClass/>}/>
        <Route path="/Profile/Update/:Type" element={<Update/>}/>
        <Route path="/Profile/InsertClass/:Subject" element={<InsertClass/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </AnimatePresence>
    </ConnectConfig.Provider>
    </UserInfo.Provider>
    </div> 
  );
}

export default App;
