import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './MyPosts.css'
import { Mousewheel, Pagination } from 'swiper/modules';
import { useQueries, useQuery } from '@tanstack/react-query';
import getUserPosts from '../../javaScript files/functions/getUserPosts';
import { Skeleton } from '@mui/material';
import PostItem from '../../components/PostItem/PostItem';
import { useTranslation } from 'react-i18next';

export default function Myposts() {

    let { data: posts, isLoading, isFetching, isError, error, isSuccess } = useQuery({
        queryKey: ['myPosts'],
        queryFn: getUserPosts,
        select: (data) => data.data.posts,
        refetchOnWindowFocus: false
    })

    console.log(posts);

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

    const {t} = useTranslation();

    if (isLoading) {
        return (
            <div className='my-posts py-10 px-4'>
                {handleLoading().map((load, i) => <div key={i}>{load}</div>)}
            </div>
        )
    }
    else if (isSuccess) {
        return (
            <section className='my-posts py-10'>
                <div className="container">
                    <div className='w-full md:w-1/2 mx-auto'>
                        <h2 className=' text-h1 text-center mb-5 capitalize text-darkBlueColor dark:text-white'>
                            {t("myPosts.myPosts")}
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
