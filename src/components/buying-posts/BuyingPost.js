import React, { useState, useEffect } from 'react';
import { HOST } from '../../config/Config';
import axios from 'axios';

import '../../styles/common/Styles.css';
import styles from '../../styles/buying-posts/BuyingPost.module.css';

import Header from '../common/Header';
import SelectPost from '../main/SelectPost';
import BuyingPostItemList from '../buying-Item/BuyingPostItemList';
import SelectSort from '../main/SelectSort';
import Footer from '../common/Footer';
import PageNumber from '../common/PageNumber';

function BuyingPosts() {
    const [selectedTad, setSelectedTab] = useState('/');
    const handleTitleClick = () => {
        setSelectedTab('/');
    };

    // 삽니다 게시글
    // /buying-posts GET해서 삽니다 게시물 데이터 가져오기
    // 가져온 데이터는 BuyingPostItemList에 전달하기
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${HOST}/buying-posts`);
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch(error) {
                console.error("데이터 가져오기 실패: ", error);
            }
        }

        fetchData();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className={styles['container']}>
            <Header onTitleClick={handleTitleClick} />
            <SelectPost />

            <div className={styles['bodyContainer']}>
                <div className={styles['sortTextDiv']}>
                    <SelectSort />
                </div>

                <div className={styles['buying-post-item-list']}>
                    <BuyingPostItemList data={currentPosts} />
                </div>
            </div>
            <PageNumber totalPosts={data.length} postsPerPage={postsPerPage} currentPage={currentPage} onPageChange={handlePageChange}/>
            <div className={styles['footer']}>
                <Footer />
            </div>
        </div>
    )
}

export default BuyingPosts;