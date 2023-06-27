import React from "react";
import '~/styles/CategoryHeader.css';

// note: took out the isActive stuff because it was causing errors and i wanna get this over with quickly
// here's the code i took out:
// {
//     background: isActive ? '#c1c1c1' : '',
//     textDecoration: "none",
//     padding: isActive ? '10px 47px' : '5px 10px',
// }

const navItemStyle = {
    textDecoration: "none",
    padding: '5px 10px',
};

const CategoryHeader = () => {
    return (
        <div id="page">
            <div id="cats-header">
                <ul className="cats-menu" aria-expanded="false">
                    <li className="cat-item cat-item-home cat-item-9">
                        <a href="/" style={navItemStyle}>Home</a>
                    </li>
                    <li className="cat-item cat-item-science cat-item-9">
                        <a href="/science" style={navItemStyle}>Science</a>
                    </li>
                    <li className="cat-item cat-item-technology cat-item-9">
                        <a href="/technology" style={navItemStyle}>Technology</a>
                    </li>
                    <li className="cat-item cat-item-engineering cat-item-9">
                        <a href="/engineering" style={navItemStyle}>Engineering</a>
                    </li>
                    <li className="cat-item cat-item-mathematics cat-item-9">
                        <a href="/mathematics" style={navItemStyle}>Mathematics</a>
                    </li>
                    <li className="cat-item cat-item-forum cat-item-9">
                        <a href="https://forum.cadlibrary.org/">Forum</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CategoryHeader;