import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    return (
        <motion.span style={{ opacity }} className="word-span">
            {children}
        </motion.span>
    );
};

const WordRevealOnScroll = ({ text }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"] 
    });
    const words = text.split(' ');

    return (
        <p ref={targetRef} className="reveal-text-body">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;
                return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}{' '}</Word>
            })}
        </p>
    );
};

export default WordRevealOnScroll;