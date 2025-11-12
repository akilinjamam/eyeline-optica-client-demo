/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const Description = ({description}:{description:any}) => {
    return (
        <div>
            <br />
            <p>{description}</p>
        </div>
    );
};

export default Description;