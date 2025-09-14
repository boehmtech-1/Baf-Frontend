import React from 'react';
import GlossyButton from '../buttons/mirrorbutton';
// Helper component for the glowing effect, inspired by the reference design
const Glow = () => (
    <div className="absolute -inset-px rounded-xl blur-md animate-pulse"
        style={{
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))',
            zIndex: -1
        }}>
    </div>
);

const ClientRev = () => {
    return (
        <section className="bg-black text-white w-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center px-4">


                {/* Left Column: Image */}
                <div className="relative w-full h-full">
                    <div className="relative rounded-2xl overflow-hidden p-1 shadow-2xl"
                        style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))' }}>
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop"
                            alt="Design consultation meeting"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-xl opacity-50 -z-10"></div>
                </div>

                {/* Right Column: Text Content */}
                <div className="flex flex-col items-start text-left">
                    {/* Reviews Pill */}
                    <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-1.5 mb-6 text-sm">
                        <span className="w-2 h-2 bg-white rounded-full mr-2.5"></span>
                        Reviews
                    </div>

                    {/* Main Heading */}
                    <h1
                        className="text-4xl sm:text-5xl lg:text-7xl font-normal tracking-normal leading-none mb-6"
                        style={{ fontFamily: "'Bruno Ace', sans-serif" }}
                    >
                        Client<br />Reviews
                    </h1>

                    {/* Subheading/Paragraph */}
                    <p
                        className="text-xl text-gray-400 mb-10 leading-relaxed tracking-wide max-w-2xl"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Real feedback from clients who trusted our design expertise to elevate
                        their spaces successfully.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <GlossyButton href="/contact">Book a Free Call</GlossyButton>
                        <GlossyButton href="/contact">Book a Consultation</GlossyButton>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ClientRev;
