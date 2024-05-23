import React, { useState, useEffect } from 'react';
import { HOST } from '../../config/Config';
import axios from 'axios';

import '../../styles/common/Styles.css';
import styles from '../../styles/profile/Profile.module.css';

import Header from '../common/Header';
import ProfileList from './ProfileList';
import ProfileInfo from './ProfileInfo';
import ProfileSave from './ProfileSave';
import ProfileWriteManagement from './PostWriteManagement';
import Footer from '../common/Footer';

function Profile() {
    const [showSelectComponent, setShowSelectComponent] = useState('');
    // 팝니다, 삽니다 게시글 get (내가 올린 것만)
    // sellingPostData, buyingPostData, commentData ProfileWriteManagement 컴포넌트에 전달
    // sellingPostData.length, buyingPostData.length, commentData.length ProfileInfo 컴포넌트에 전달
    const [sellingPostData, setSellingPostData] = useState([]);
    const [buyingPostData, setBuyingPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const userId = Number(localStorage.getItem("userId"));
    useEffect(() => {
        async function sellingData() {
            try {
                const response = await axios.get(`${HOST}/users/${userId}/selling-posts`);
                if (response.status === 200) {
                    setSellingPostData(response.data);
                }
            } catch (error) {
                console.error("데이터 가져오기 실패: ", error);
            }
        };

        async function buyingData() {
            try {
                const response = await axios.get(`${HOST}/users/${userId}/buying-posts`);
                if (response.status === 200) {
                    setBuyingPostData(response.data);
                }
            } catch (error) {
                console.error("데이터 가져오기 실패: ", error);
            }
        };

        async function commentData() {
            try {
                const response = await axios.get(`${HOST}/users/${userId}/selling-comments`);
                if(response.status === 200) {
                    setCommentData(response.data);
                }
            } catch(error) {
                console.error("댓글 불러오기 실패 : ", error);
            }
        }


        buyingData();
        sellingData();
        commentData();
    }, []);

    const showComponent = () => {
        switch (showSelectComponent) {
            case 'writeManagement':
                return <ProfileWriteManagement sellingPostData={sellingPostData} buyingPostData={buyingPostData} commentData={commentData} />;
            default:
                return <ProfileSave />;
        }
    };


    return( 
       <div className={styles['container']}>
            <Header />
            
            <div className={styles['divContainer']}>
                <ProfileList showSelectComponent={setShowSelectComponent} userId={userId} />

                <div className={styles['profile']}>
                    <div className={styles['profileInfo']}>
                        <ProfileInfo 
                            userId={userId} 
                            sellingPostDataLength={sellingPostData.length} 
                            buyingPostDataLength={buyingPostData.length} 
                            commentDataLength={commentData.length}
                        />
                    </div>
                    
                    <div className={styles['lists']}>
                        {/* 바뀌는 화면 */}
                        {showComponent()}
                    </div>
                </div>
            </div>

            <Footer />
       </div>
    )
}

export default Profile;