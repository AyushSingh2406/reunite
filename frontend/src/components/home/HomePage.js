import React from 'react';
import Chapter from '../common/Chapter';
import WordRevealOnScroll from './WordRevealOnScroll';

const HomePage = () => {
    const aboutHeading = "Reunite — Bringing Lost Things Back Where They Belong";
    const aboutText = "Reunite is your campus hub for lost and found. Post what you’ve lost, share what you’ve found, and get connected fast — because everything (and everyone) deserves a way back home.";

    return (
        <main className="main-container home-page">
            <Chapter id="hero" isActive={true}>
                <h2 className="hero-headline">reunite.</h2>
                <p className="body-text">The campus lost and found, reimagined.</p>
            </Chapter>
            <Chapter id="about" isReveal={true}>
                <div className="reveal-text-container">
                    <h3 className="section-headline" style={{textAlign: 'center', marginBottom: '2rem'}}>{aboutHeading}</h3>
                    <WordRevealOnScroll text={aboutText} />
                </div>
            </Chapter>
            <Chapter id="footer" isActive={true}>
                <h2 className="footer-headline">Contact & Support</h2>
                <p className="footer-text">Have questions? Visit our FAQ or contact support.</p>
                <p className="footer-text">&copy; 2025 Your College Name. All Rights Reserved.</p>
            </Chapter>
        </main>
    );
};

export default HomePage;