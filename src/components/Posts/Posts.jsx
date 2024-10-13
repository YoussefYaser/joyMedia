import { useQuery } from '@tanstack/react-query'
import './Posts.css'
import getAllPosts from '../../javaScript files/functions/getAllPosts'
import PostItem from '../PostItem/PostItem.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@mui/material';

export default function Posts({ setPostsLoaded }) {

    let [postNum, setPostNum] = useState(15);


    let posts = useRef([]);

    let { data, isLoading, isFetching, isError, error, isSuccess, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getAllPosts(postNum),
        select: (data) => data.data.posts,
        refetchOnWindowFocus: false
    });


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

    function handleScroll() {
        for (let i = 0; i < posts.current.length; i++) {
            if (window.scrollY > (posts.current[i]?.offsetTop - window.innerHeight + 100)) {
                posts.current[i].classList.replace('opacity-0', 'opacity-100');
                posts.current[i].classList.replace('scale-0', 'scale-100');
            }
        }
    }

    function refetchOnScroll() {

        if ((Math.round(document.body.clientHeight - window.innerHeight) == Math.round(window.scrollY))) {
            console.log(postNum);

            if (postNum + 10 <= 50) {
                setPostNum(postNum + 10);
            }
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setPostsLoaded(true);
            handleScroll();
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (postNum != 15) {
            refetch();
        }
        window.addEventListener('scroll', refetchOnScroll);
        return () => {
            window.removeEventListener('scroll', refetchOnScroll);
        }
    }, [postNum]);





    if (isLoading) {
        return (
            <div className=' py-10'>
                {handleLoading().map((load, i) => <div key={i}>{load}</div>)}
            </div>
        )
    }
    else if (isSuccess) {
        return (
            <section className='posts py-10'>
                <div className='w-full md:w-1/2 mx-auto'>
                    <div className="row gy-4">
                        {data.map((post, i) =>
                            <div key={post.id} ref={(el) => posts.current.push(el)} className={`w-full opacity-0 scale-0`}>
                                <PostItem post={post}></PostItem>
                            </div>)}

                        <div className={` ${isFetching?'start':''} reload  w-fit mx-auto block ${isFetching?'opacity-100' : 'opacity-0'}`}>
                            <span className=" " />
                        </div>
                    </div>
                </div>

            </section>
        )

    }
}
