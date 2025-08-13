import React from 'react';

const Chapter = ({ children, id, isActive, isReveal }) => {
    const chapterClasses = `chapter ${isReveal ? 'reveal-chapter' : ''} ${!isReveal && isActive ? 'active' : ''}`;
    return (
        <section id={id} className={chapterClasses}>
            <div className="chapter-content">{children}</div>
        </section>
    );
};

export default Chapter;