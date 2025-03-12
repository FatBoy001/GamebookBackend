import './Navibar.css';
import cookie from 'js-cookie';
import {useState,useEffect} from 'react';
import { motion,useAnimationControls,AnimatePresence } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import {Link,Navigate,useLocation} from 'react-router-dom';

export const Navibar = () =>{
    const userData =cookie.get('userLogin')?JSON.parse(cookie.get('userLogin')):null;
    const [showToggle,setShowToggle] = useState(false);
    const [browserClickNav,setBrowserClickNav] =useState(false);
    const location = useLocation();
    const controls = useAnimationControls();

    const sequence = async()=>{
      controls.set({ opacity: 0 })
      await controls.start({y:[500,-25,25,0],opacity:1});
  }
    
    const checkLogin = ()=>{
        if(location.pathname==="/Login") return null;
        if(userData===null){
          alert("尚未登入");
          return <Navigate to="Login"/>;
        }else return true;
    }
    
    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    useEffect(() => {
      sequence()
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
    }, [showToggle]);
    const isMobile = width <= 768;

    return(
        <div>
        {checkLogin()}
        <motion.nav className="navbar" id="hidden" onClick={()=>{
          if(location.pathname==="/Login") return;
          setBrowserClickNav(!browserClickNav)
        }}>
          <div className="brand-title">{userData===null?"尚未登入!":`歡迎使用Gamebook!`}</div>
          <div className="navbar-links">
            <ul>
              <li><Link className='link' to="/">網頁功能說明</Link></li>
              <li><Link className='link' to="/CreateAccount">新增帳號</Link></li>
              <li><Link className='link' to="/Subject">學習狀況</Link></li>
              <li><Link className='link' to="/Profile">基本資料</Link></li>  
            </ul>
            <motion.div whileTap={{scale:0.8}}
            whileHover={{scale:1.5}}
            className = "toggle"
            onClick={()=>{
              setShowToggle(!showToggle);
            }}>
              <AiOutlineMenu size={80}/>
            </motion.div>
          </div>
        </motion.nav>
        {showToggle?(
        <motion.div className="block" animate={{y:[500,-25,25,0],opacity:1}} initial={{opacity:0}} transition={{duration: 1}}>
          <motion.div className="navbar-hidden-links">
              <motion.ul animate={{y:[500,-15,10,-15,10,0],opacity:1}} initial={{opacity:0}} transition={{ duration:1,delay:1}}>
                <motion.li whileTap={{scale:0.6}}><Link className='link-hidden' to="/">網頁功能說明</Link></motion.li>
                <motion.li whileTap={{scale:0.6}}><Link className='link-hidden' to="/CreateAccount">新增帳號</Link></motion.li>
                <motion.li whileTap={{scale:0.6}}><Link className='link-hidden' to="/Subject">學習狀況</Link></motion.li>
                <motion.li whileTap={{scale:0.6}}><Link className='link-hidden' to="/Profile">基本資料</Link></motion.li>  
              </motion.ul>
          </motion.div>
        </motion.div>
        ):
        null
        }
        </div>
    );
}
