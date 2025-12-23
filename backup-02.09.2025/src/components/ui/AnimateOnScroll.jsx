'use client';

import { useRef, useEffect, useState } from 'react';

const AnimateOnScroll = ({ children, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div ref={ref} className={`${className} section-animate ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </div>
    );
};

export default AnimateOnScroll;
