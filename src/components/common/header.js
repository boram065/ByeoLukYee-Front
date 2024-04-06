import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import headerStyle from '../../styles/common/header.module.css';

import SearchInput from './searchInput';

function Header({ onTitleClick }) {
    return (
        <>
            <nav className={headerStyle['nav']}>
                <div className={headerStyle['container1']}>
                    <Link to='/' style={{ textDecoration: "none", color: 'black' }}> <div className={headerStyle['titleDiv']} onClick={onTitleClick}> <p>벼룩이</p> </div> </Link>
                    <div> <SearchInput /> </div>
                </div>
                <div className={headerStyle['optionDiv']}>
                    <p>글쓰기</p>
                    <p>채팅</p>
                    <p>마이페이지</p>
                </div>
            </nav>
            <div style={{textAlign: 'center'}}> <hr /> </div>
        </>
    )
}

export default Header;