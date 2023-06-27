import React from "react";
import MainHeader from "./MainHeader";
import CategoryHeader from "./CategoryHeader";
import CategoryBanner from "./CategoryBanner";
import "~/styles/Page.css";

const Forum = () => {
    return (
        <div>
            <body>
                <div className="site">
                    <MainHeader></MainHeader>
                    <CategoryHeader></CategoryHeader>
                    <CategoryBanner className="forum-banner">Forum</CategoryBanner>

                    <div id="page">
                        <p>
                            An open-source discussion tool, Discourse, is used
                            to support discussions related to the CAD Library.
                        </p>

                        <p>
                            {" "}
                            You can access the CAD Library forum through this
                            link:
                        </p>

                        <ul>
                            <li style={{ listStyle: "none" }}>
                                {" "}
                                <a
                                    href="https://forum.cadlibrary.org/"
                                    target="_blank"
                                    style={{ fontSize: "20px" }}
                                >
                                    CAD Library Forum
                                </a>{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </body>
        </div>
    );
};

export default Forum;
