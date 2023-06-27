import React from 'react';
import ObjectCard from './ObjectCard';

const SearchResultDisplay = ({ searchObjects }) => {

    const noResults = (searchObjects.length === 0)

    return (
        <div>
            <div id="page">
                {noResults ? <p>No results found</p> : <p>{searchObjects.length} results</p>}
                <div className="cards">
                    {searchObjects.map((object, i) => (
                        <ObjectCard objImageUrl={object.imgUrl} objTitle={object.title} objAuthor={object.author} objDescription={object.desc} doi={object.doi} key={i} />
                    ))}
                </div>
            </div>
           
        </div>
    );
}

export default SearchResultDisplay;