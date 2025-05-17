import { AnimatePresence, motion } from "framer-motion";
import { AnimationType } from "../AnimatedNumber";
import { getVariants } from "../util/getAnimationVariants";

export const Digit: React.FC<{
  value: string;
  prevValue: string;
  animation: AnimationType;
  duration: number;
  delay: number;
  fontSize?: string;
  commaWidth?: string;
}> = ({ value, prevValue, animation, duration, delay, fontSize, commaWidth }) => {
  const variants = getVariants(animation, duration, delay);
  const hasChanged = value !== prevValue;
  
  const direction = hasChanged 
    ? (Number(value.toString()) > Number(prevValue.toString()) ? 'up' : 'down')
    : 'up';

  const style = fontSize ? { fontSize } : {};
  
  const isComma = value === ',';
  const isDecimalPoint = value === '.';
  
  const separatorStyle = isComma ? { 
    width: commaWidth || '0.4em',
    minWidth: commaWidth || '0.4em',
    margin: '0 -0.05em' 
  } : isDecimalPoint ? {
    width: '0.3em',
    minWidth: '0.3em',
    margin: '0 -0.1em'
  } : {};

  if (animation === 'none') {
    return (
      <div 
        className={`relative inline-flex items-center justify-center font-medium ${
          isComma || isDecimalPoint ? 'text-gray-900' : ''
        }`}
        style={{ ...style, ...separatorStyle }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }
  

  return (
    <div 
      className="relative inline-flex overflow-hidden items-center justify-center"
      style={{ 
        width: isComma ? (commaWidth || '0.4em') : 
               isDecimalPoint ? '0.4em' : '0.8em',
        minWidth: isComma ? (commaWidth || '0.4em') : 
                  isDecimalPoint ? '0.4em' : '0.8em',
        height: '1em',
        margin: isComma ? '0 -0.05em' : 
                isDecimalPoint ? '0 -0.05em' : '0',
        ...style
      }}
    >
      <AnimatePresence mode="wait">
        {hasChanged ? (
          <>
            <motion.div
              key={`exit-${prevValue}`}
              variants={variants}
              custom={direction}
              initial="center"
              whileInView="exit"
              exit="exit"
              viewport={{
                margin: '100px 0px -100px 0px',
                once: true,
              }}
              transition={{ 
                duration: duration / 2, 
                delay,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className={`absolute inset-0 flex items-center justify-center font-medium ${
                isComma || isDecimalPoint ? 'text-gray-900' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: prevValue }}
            />
            <motion.div
              key={`enter-${value}`}
              variants={variants}
              custom={direction}
              initial="enter"
              whileInView="center"
              exit="exit"
              viewport={{
                margin: '200px 0px -200px 0px',
                once: true,
              }}
              transition={{ 
                duration: duration / 2, 
                delay,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className={`absolute inset-0 flex items-center justify-center font-medium ${
                isComma || isDecimalPoint ? 'text-gray-500' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </>
        ) : (
          <div 
            className={`absolute inset-0 flex items-center justify-center font-medium ${
              isComma || isDecimalPoint ? 'text-gray-500' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};