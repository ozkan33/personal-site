import React from 'react';
import { Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';

const Section = ({ children, style }) => (
    <section
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            ...style
        }}
    >
        {children}
    </section>
);

export function Overlay() {
    const scroll = useScroll();

    return (
        <Scroll html>
            <div style={{ width: '100vw' }}>
                <Section>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h1 style={{
                            fontSize: '5rem',
                            fontWeight: '900',
                            textShadow: '0 0 30px #4db5ff',
                            margin: 0
                        }}>
                            HELLO WORLD
                        </h1>
                        <p style={{
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            opacity: 0.8,
                            marginTop: '1rem',
                            letterSpacing: '0.2em'
                        }}>
                            SCROLL TO EXPLORE
                        </p>
                    </motion.div>
                </Section>

                <Section style={{ alignItems: 'flex-start', paddingLeft: '10vw' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            background: 'rgba(10, 20, 40, 0.6)',
                            backdropFilter: 'blur(12px)',
                            padding: '3rem',
                            borderRadius: '4px',
                            borderLeft: '6px solid #4db5ff',
                            borderTop: '1px solid rgba(77, 181, 255, 0.3)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                            maxWidth: '500px'
                        }}
                    >
                        <h2 style={{ fontSize: '3rem', margin: 0, color: '#4db5ff' }}>Born in Izmir</h2>
                        <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: '#e0e0e0', lineHeight: '1.6' }}>
                            A city of history and beauty on the Aegean coast. Where ancient traditions meet modern life.
                        </p>
                    </motion.div>
                </Section>

                <Section style={{ alignItems: 'flex-end', paddingRight: '10vw' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            background: 'rgba(40, 10, 10, 0.6)',
                            backdropFilter: 'blur(12px)',
                            padding: '3rem',
                            borderRadius: '4px',
                            borderRight: '6px solid #ff4d4d',
                            borderTop: '1px solid rgba(255, 77, 77, 0.3)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                            maxWidth: '500px',
                            textAlign: 'right'
                        }}
                    >
                        <h2 style={{ fontSize: '3rem', margin: 0, color: '#ff4d4d' }}>School in Minnesota</h2>
                        <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: '#e0e0e0', lineHeight: '1.6' }}>
                            Learning and growing in the cold north. Embracing resilience and innovation.
                        </p>
                    </motion.div>
                </Section>
            </div>
        </Scroll>
    );
}
