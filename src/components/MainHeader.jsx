import React from "react";
import '~/styles/MainHeader.css';
import '~/styles/Page.css';
import SearchBar from "./SearchBar";

const MainHeader = ({ input, setInput, handleSubmit, subject }) => {

    const isHome = (subject === "home")

    return (
        <div id="page">
            <header id="masthead" className="site-header" role="banner">
                <div className="site-branding">
                    <p className="site-title">
                        <a href="/">
                            <span>CAD</span> 
                            Library
                            {/* <img src="cadLibrary.png"></img> */}
                        </a>
                    </p>    
                </div>

                {!isHome && <SearchBar input={input} setInput={setInput} handleSubmit={handleSubmit} subject={subject}></SearchBar>}
                
            </header>
        </div>
    );
};

export default MainHeader;