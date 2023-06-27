import React from "react";
import "~/styles/ObjectCard.css";
import { Link }from 'react-router-dom';


const ObjectCard = (props) => {

    let doiPieces = props.doi.split("/");
    const doi = doiPieces[0] + doiPieces[1];

    return (
        <div className="card">
            <Link href={`/objects/${doi}`} id="link">
                <img id="img" src={props.objImageUrl} alt="Object Thumbnail Not Found"></img>
                <div className="card-desc">
                    <h3><b id="object">{props.objTitle}</b></h3>
                    {/* <h4 id="author">{props.objAuthor}</h4> */}
                    <p id="Description">{props.objDescription}</p>
                </div>
            </Link>
        </div>
    )
}

export default ObjectCard;