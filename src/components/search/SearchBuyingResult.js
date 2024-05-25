import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../../styles/common/Styles.css';
import styles from '../../styles/search/SearchBuyingResult.module.css';

import BuyingPostList from '../buying-Item/BuyingPostItemList';
import PageNumber from '../common/PageNumber';

function SearchBuyingResult({ keyword, data, setData }) {
    const [currentPage, setCurrentPage] = useState(1);
    // /buying-posts에 저장된 게시글 데이터를 GET하여
    // 내가 검색창에 입력 값과 일치하거나 포함되어있는 데이터가 있으면 그 데이터만 가져와서 화면에 보여주기
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/buying-posts`);
                if (response.status === 200) {
                    const filteredData = response.data.filter(item => {
                        const titleMatch = typeof item.title === 'string' && item.title.includes(keyword);
                        const statusMatch = typeof item.krStatus === 'string' && item.krStatus.includes(keyword);
                        const priceMatch = typeof item.price === 'number' && item.price === parseInt(keyword);
                        return titleMatch || statusMatch || priceMatch;
                    });
                    setData(filteredData);
                    console.log("데이터 가져오기 성공");
                }
            } catch(error) {
                console.error("데이터 가져오기 실패: ", error);
            }
        }
        fetchData();
    }, [keyword, currentPage]);

    let postsPerPage = 8;
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className={styles['container']}>
                <BuyingPostList data={currentPosts}/>
            </div>
            <PageNumber totalPosts={data.length} postsPerPage={postsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
        </>
    )
}

export default SearchBuyingResult;