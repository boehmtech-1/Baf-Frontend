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
        <>
            {/* The component uses the Inter font, so we'll import it from Google Fonts. */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>

            <section className="bg-black text-white w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    
                    {/* Left Column: Image */}
                    <div className="relative w-full h-full max-w-md mx-auto md:max-w-none">
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
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
                            Client<br />Reviews
                        </h1>

                        {/* Subheading/Paragraph */}
                        <p className="text-lg text-gray-300 max-w-md mb-10 leading-relaxed">
                            Real feedback from clients who trusted our design expertise to elevate their spaces successfully.
                        </p>

                                                {/* Action Buttons */}
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <GlossyButton href="/contact">Book a Free Call</GlossyButton>
                            <GlossyButton href="/contact">Book a Consultation</GlossyButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ClientRev;
