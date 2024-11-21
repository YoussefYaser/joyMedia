import { useParams } from 'react-router-dom'
import './PostDetails.css'
import { useQuery } from '@tanstack/react-query';
import getPostDetails from '../../javaScript files/functions/getPostDetails';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

export default function PostDetails() {

    let { postId } = useParams();

    let [date, setDate] = useState('');



    let { data: details, isLoading, isFetching, isError, error, isSuccess } = useQuery({
        queryKey: ['postDetails', postId],
        queryFn: () => getPostDetails(postId),
        select: (data) => data.data.post
    });    


    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        if (isSuccess) {
            let tempDate = new Date(details['createdAt']);
            setDate({
                day: tempDate.getDate(),
                month: months[tempDate.getMonth()],
                year: tempDate.getFullYear()
            });
        }
    }, [isSuccess]);


    const { t } = useTranslation();


    if (isLoading) {
        return (
            <section className='post-details py-10 flex-grow'>
                <div className="container">
                <div className=' w-11/12 max-w-[1024px] mx-auto p-6 rounded-md bg-gray-100 dark:bg-darkerBlueColor shadow-2xl'>
                        <div className="row g-5">
                            <div className='post-img w-full lg:w-1/2'>
                                <div className="inner rounded-md overflow-hidden cursor-pointer h-full">
                                    <Skeleton variant="rounded" className='w-full h-[200px] lg:h-full' />
                                </div>
                            </div>
                            
                            <div className=' post-body w-full lg:w-1/2'>
                                <div className='header flex mb-4'>
                                    <div className='size-10 bg-grayColor rounded-full overflow-hidden'>
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </div>
                                    <div className=' ps-3'>
                                        <Skeleton variant="rectangular" className='w-28 mb-3' height={10} />
                                        <Skeleton variant="rectangular" className='w-28' height={10} />
                                    </div>
                                </div>
                                <Skeleton variant="rectangular" className='w-full' height={60} />
                                <div className='comments-box rounded-md overflow-auto h-80 py-4'>
                                    <Skeleton variant="rectangular" className='w-full h-full' height={60} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (isSuccess) {
        return (
            <section className='post-details py-10 flex-grow overflow-hidden'>
                <div className="container  py-5">
                    <div className=' w-11/12 max-w-[1024px] mx-auto p-6 rounded-md bg-gray-100 dark:bg-darkerBlueColor shadow-2xl'>
                        <div className="row g-5">
                            {details.image?<div className='post-img w-full lg:w-1/2'>
                                <div className="inner rounded-md overflow-hidden cursor-pointer">
                                    <img src={details.image} className='hover:scale-110 transition-transform duration-300' alt="" />
                                </div>
                            </div>:''}
                            
                            <div className={` post-body w-full  ${!details.image? 'w-full':'lg:w-1/2'}`}>
                                <div className='header flex mb-4'>
                                    <div className='size-10 bg-grayColor rounded-full overflow-hidden shadow shadow-darkBlueColor'>
                                        <img src={details.user.photo} className='w-full' alt="" />
                                    </div>
                                    <div className=' ps-3'>
                                        <h2 className='text-h5 text-darkerBlueColor dark:text-white'>{details.user.name}</h2>
                                        <p className=' capitalize text-grayColor text-h5'>
                                            {date.day}
                                            {date.month}
                                            {date.year}
                                        </p>
                                    </div>
                                </div>
                                <p dir='ltr' className='text-black dark:text-white mb-6 border-b-2 border-b-gray-800 dark:border-b-white pb-4'>{details.body}</p>

                                
                                {details.comments.length?<div className='comments-box rounded-md overflow-auto h-80 py-4'>
                                    {details.comments.map((elem) => 
                                        <div key={elem._id}  className=' mb-3'>
                                            <div className='comments shadow-inner shadow-[#d7d7d7] dark:shadow-[#141722] rounded p-2'>
                                                <span className='block mb-3 text-sm font-bold capitalize text-darkerBlueColor dark:text-grayColor'>
                                                    {t("post.comments")}
                                                    <i className="fa-regular fa-comment ms-1" />
                                                </span>
                                                <div className='border-t-2 border-grayColor py-3'>
                                                    <div className='comment-header flex mb-3'>
                                                        <div className='size-10 bg-grayColor rounded-full overflow-hidden shadow shadow-darkBlueColor'>
                                                            <img src={elem['commentCreator'].photo} className='w-full' alt="" />
                                                        </div>
                                                        <div className=' ps-3'>
                                                            <h2 className='text-h5 text-darkerBlueColor dark:text-white'>{elem['commentCreator'].name}</h2>
                                                            <p className=' capitalize text-grayColor text-h5'>
                                                                {new Date(elem.createdAt).getDate()}
                                                                {months[new Date(elem.createdAt).getMonth()]}
                                                                {new Date(elem.createdAt).getFullYear()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p dir='ltr' className='ps-2 text-black dark:text-white'>{elem.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ).reverse()}
                                </div>:''}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}
