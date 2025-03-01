import { motion } from 'framer-motion';

export default function Inner({children}) {
    const anim = (variants) => {
        return {
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants
        }
    }

    const opacity = {
        initial: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        exit: {
            opacity: 1,
        }
    }

    const slide = {
        initial: {  
            top: "100vh"
        },
        enter: {
            top: "100vh"
        },
        exit: {
            top: "0",
            transition: {
                duration: .4,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    }
    const perspective = {
        initial: {  
            y: 0,
            scale: 1,
        },
        enter: {
            y: 0,
            scale: 1,
        },
        exit: {
            y:-100,
            scale: 0.9,
            transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    }

    return (
        <div>
            <motion.div {...anim(slide)} className='fixed top-0 left-0 bg-red-500 w-[100vw] h-[100vh] z-50' />
            <motion.div {...anim(perspective)}>
                <motion.div {...anim(opacity)}>
                    {children}
                </motion.div>
            </motion.div>
        </div>
    )
}