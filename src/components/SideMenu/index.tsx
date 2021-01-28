import React, { useState, useEffect } from 'react';

import { Container } from './styles';

const scrollThreshold = 300;

declare global {
    interface Window {
        toggleActiveMenu: (() => void | undefined);
    }
}

const SideMenu: React.FC = ({children}) => {
    const [scrollY, setScrollY] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
        function onScroll(){
            // console.log(window.scrollY);
            setScrollY(window.scrollY);
            setIsActive(false);
        }

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    },[]);

    const classes = [
        isActive ? 'open' : '',
        scrollY <= scrollThreshold ? 'scrollOpen' : '',
    ];
    //retorna uma string da class acima
    const className = classes.join(' ').trim();

    //function que irá mudar o state de open and closer
    function toggleActiveMenu(){
        setIsActive(prev => !prev);
    }

    window.toggleActiveMenu = toggleActiveMenu;

    return <Container className={className}>{children}</Container>;
};

export default SideMenu;