import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Skyway from '../../components/Skyway';

const Meeting = () => {

    const router = useRouter();
    const { pid } = router.query;

    return (
        <>
            <p>Meeitng Application</p>
            <div>
                <Skyway />
            </div>
        </>
    );
};

const Render = () => {
    return (
        <Meeting />
    );
};

export default Render;