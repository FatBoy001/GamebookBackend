import './Home.css';
import { useState } from "react";
import { wrap } from "popmotion";
import { images } from "./image-data";
import { motion} from "framer-motion";
import cookie from "js-cookie";
const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};


export const Home=()=>{
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);
    console.log(images[imageIndex]);
    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };
    if(!cookie.get('userLogin')) return;

    return (
        <div className="Homepage">
            <div className="IntroContainer">
              {/* <AnimatePresence initial={false} custom={direction}> */}
                <motion.img
                key={page}
                src={images[imageIndex]}
                //src={require('./Image/1.png')}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                /* exit="exit" */
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                    }
                }}
                />
                {/* </AnimatePresence> */}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
            {"‣"}
            </div>
            <div className="next" onClick={() => paginate(1)}>
            {"‣"}
            </div>
            
      
    </div>
    );
};