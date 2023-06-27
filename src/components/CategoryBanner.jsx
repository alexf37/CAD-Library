import React from "react";
import '~/styles/CategoryBanner.css';

const CategoryBanner= ({ className, children }) => {   
    return (
        <div>
            <container className={`category-banner ${className}`}>
                {children}
            </container> 
        </div>
    )
}

export default CategoryBanner;

