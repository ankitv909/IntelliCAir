// MenuItems.js
import React from 'react';
import { useRouter } from 'next/router';

const MenuItems = () => {
    const router = useRouter();
    const menuLinks = [
        { name: 'Home', path: '/dashboard' },
        { name: 'Find Job', path: '/find-job' },
        { name: 'Employers', path: '/employers' },
        { name: 'Course & Placements', path: '/courses-placements' },
        { name: 'About', path: '/about' }
    ];

    return (
        <div className="flex-grow flex justify-center">
            {/*{menuLinks.map((link) => (*/}
            {/*    <button*/}
            {/*        key={link.name}*/}
            {/*        onClick={() => router.push(link.path)}*/}
            {/*        className={`px-3 py-2 rounded-md text-sm font-medium ${router.pathname === link.path ?*/}
            {/*            ' text-white font-bold' : 'text-white hover:bg-emerald-500 hover:text-white'}`}*/}
            {/*    >*/}
            {/*        {link.name}*/}
            {/*    </button>*/}
            {/*))}*/}
        </div>
    );
};

export default MenuItems;
