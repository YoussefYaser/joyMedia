import 'swiper/css';
import './MyPosts.css'
import { useQuery } from '@tanstack/react-query';
import getUserPosts from '../../javaScript files/functions/getUserPosts';
import { Skeleton } from '@mui/material';
import PostItem from '../../components/PostItem/PostItem';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useChangeProfileImageMutation } from '../../libs/RTK Query/joyMediaApi';

export default function Myposts({ onMain }) {


    let [profileImage, setProfileImage] = useState('');



    let userDetails = useSelector((store) => store.userDetails);

    

    let { data: posts, isLoading : isLoadingPosts, isFetching, isError: isErrorPosts, error:errorPosts, isSuccess: isSuccessPosts, refetch } = useQuery({
        queryKey: ['myPosts'],
        queryFn: getUserPosts,
        select: (data) => data.data.posts,
        refetchOnWindowFocus: false
    });

    // console.log(isFetching);
    

    let [changeProfile, { data, isLoading, isSuccess, isError, error }] = useChangeProfileImageMutation();

    // console.log(data, isLoading, isSuccess, isError, error);



    function handleLoading() {
        let temp = [];

        for (let i = 0; i < 5; i++) {
            temp.push(<div className='w-full md:w-1/2 mx-auto mb-6'>
                <div className="row gy-4">
                    <div className='w-full shadow-md dark:shadow-gray-900 p-4 bg-lightGrayColor dark:bg-darkerBlueColor rounded-md'>
                        <div className='header flex mb-4'>
                            <Skeleton variant="circular" className='size-10' />
                            <div className=' ps-3 flex-grow'>
                                <Skeleton variant="rectangular" className=' w-full h-4 mb-2' />
                                <Skeleton variant="rectangular" className=' w-1/2 h-4' />
                            </div>
                        </div>
                        <div className='body mb-4'>
                            <Skeleton variant="rounded" className='w-full h-52 mb-3' />
                            <Skeleton variant="rectangular" className=' w-full h-4 mb-3' />
                            <Skeleton variant="rectangular" className=' w-full h-4 mb-3' />
                            <Skeleton variant="rectangular" className=' w-1/2 h-4' />
                        </div>
                        <Skeleton variant="rounded" className='w-full h-28 mb-3' />
                        <Skeleton variant="rounded" className='w-20 h-5 mx-auto' />
                    </div>
                </div>
            </div>);
        }

        return temp;
    }

    function changeProfileImage(e) {

        let formData = new FormData();
        formData.append('photo', e.target.files[0]);

        let token = localStorage.getItem('joyMediaToken');
        let headers = {
            token: token
        }
        changeProfile({formData, headers});
    }

    const { t } = useTranslation();

    useEffect(()=>{
        if(isSuccess)
            console.log(profileImage);
            
    }, [isSuccess])

    if (isLoadingPosts) {
        return (
            <div className='my-posts py-10 px-4'>
                <div className="container">
                    {handleLoading().map((load, i) => <div key={i}>{load}</div>)}
                </div>
            </div>
        )
    }
    else if (isSuccessPosts) {
        return (
            <section className={`${onMain ? '' : 'my-posts py-10'}`} style={{ minHeight: 'calc(100vh - 56px)' }}>
                <div className={`${onMain ? '' : 'container'} `}>

                    {onMain ? '' : <div className='mb-5'>
                        <h2 className=' text-h1 text-center  capitalize mb-3 text-darkBlueColor dark:text-white'>
                            {userDetails.name} {t("profile.profile")}
                        </h2>
                        <div className='size-40 overflow-hidden mx-auto rounded-full border-4 border-darkBlueColor dark:border-white mb-3'>
                            <img src={userDetails.photo} className=' w-full' alt="" />
                        </div>
                        <label htmlFor='profile-image' className=' block w-fit mx-auto capitalize cursor-pointer text-black hover:text-grayColor'>
                            {t("profile.photo")}
                        </label>
                        <input id='profile-image' type="file" className='hidden' onChange={changeProfileImage} />
                        <ul className=' w-fit mx-auto text-center mt-6 capitalize text-darkerBlueColor dark:text-white'>
                            <li>{userDetails.gender}</li>
                            <li>{userDetails.dateOfBirth}</li>
                        </ul>
                    </div>}

                    <div className={`w-full ${onMain ? '' : 'md:w-1/2 mx-auto'} `}>
                        <h2 className=' text-h1 text-center mb-5 capitalize text-darkBlueColor dark:text-white'>
                            {userDetails.name} {t("myPosts.myPosts")}
                        </h2>
                        <div className="row gy-4">
                            {posts.length ? posts.map((post) =>
                                <div key={post.id} className={`w-full`}>
                                    <PostItem post={post}></PostItem>
                                </div>
                            ) :
                                <p className=' text-darkerBlueColor dark:text-white text-center w-full mt-10 capitalize'>
                                    {t("myPosts.NoPosts")}
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        )

    }

}
