import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#373A40] w-full">
            <div className="flex flex-col lg:flex-row py-8 px-6 md:px-12 lg:justify-between">
                {/* Left Section */}
                <div className="mb-8 lg:mb-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center space-x-3 mb-4">
                    
                        <span className="text-white font-semibold text-lg">
                        
                        </span>
                    </div>
                
                </div>

                {/* Middle Section */}
                <div className="mb-8 lg:mb-0 text-center lg:text-left">
                    <h1 className="text-white border-l-4 border-orange-400 px-2 mb-4">Quick Links</h1>
                    <ul className="text-white space-y-2">
                    
                
                    
                    </ul>
                </div>

                {/* Right Section */}
                <div className="text-center lg:text-left">
                    <h1 className="text-white border-l-4 border-orange-400 px-2 mb-4">Contact Information</h1>
                
                    <p className="text-white mb-2">Ph: +91-94555543210</p>
                
                </div>
            </div>

        
        </footer>
    );
};

export default Footer;
