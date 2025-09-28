import React from 'react';

const Description = ({description}:{description:string}) => {
    return (
        <div>
            <br />
            <p>{description}</p>
        </div>
    );
};

export default Description;