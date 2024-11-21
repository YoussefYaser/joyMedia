import { useTranslation } from 'react-i18next';
import './PostItem.css'
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useCreateCommentMutation } from '../../libs/RTK Query/joyMediaApi';
import { useQueryClient } from '@tanstack/react-query';


export default function PostItem({ post }) {

    const queryClient = useQueryClient()


    let [yourComment, setYourComment] = useState('');
    

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const { t } = useTranslation();

    const date = new Date(post.createdAt);

    let navigate = useNavigate();


    const [createComment, {isLoading, isError, isSuccess, error}] = useCreateCommentMutation();

    const handleCreateComment = useCallback(()=>{
        

        const body = {
            content : yourComment, 
            post : post._id
        }
        const headers = {
            token : localStorage.getItem('joyMediaToken')
        }
        
        createComment({body, headers});
    }, [yourComment]);

    useEffect(()=>{
        if(isSuccess){
            queryClient.invalidateQueries(['posts']);
        }
    }, [isSuccess])
    

    return (
        <div className={`post-item shadow-md dark:shadow-gray-900 p-4 bg-lightGrayColor dark:bg-darkerBlueColor rounded-md `} >
            <div className='header flex mb-4'>
                <div className='size-10 bg-grayColor rounded-full overflow-hidden shadow shadow-darkBlueColor'>
                    <img src={post.user.photo} className='w-full' alt="" />
                </div>
                <div className=' ps-3'>
                    <h2 className='text-h5 text-darkerBlueColor dark:text-white'>{post.user.name}</h2>
                    <p className=' capitalize text-grayColor text-h5'>
                        {date.getDate()}
                        {months[date.getMonth()]}
                        {date.getFullYear()}
                    </p>
                </div>
            </div>
            <div className='body mb-4'>
                <div className='rounded-md overflow-hidden cursor-pointer mb-4' onClick={()=>navigate(`/postDetails/${post.id}`)}>
                    <img src={post?.image} className='w-full hover:scale-105 transition-transform duration-300' alt="" />
                </div>
                <p dir='ltr' className='text-black dark:text-white'>{post.body}</p>
            </div>
            {post?.comments.length ? <>
                <div className='comments shadow-inner shadow-[#d7d7d7] dark:shadow-[#141722] rounded p-2'>
                    <span className='block mb-3 text-sm font-bold capitalize text-darkerBlueColor dark:text-grayColor'>
                        {t("post.comments")}
                        <i className="fa-regular fa-comment ms-1" />
                    </span>
                    <div className='border-t-2 border-grayColor py-3'>
                        <div className='comment-header flex mb-3'>
                            <div className='size-10 bg-grayColor rounded-full overflow-hidden shadow shadow-darkBlueColor'>
                                <img src={post.user.photo} className='w-full' alt="" />
                            </div>
                            <div className=' ps-3'>
                                <h2 className='text-h5 text-darkerBlueColor dark:text-white'>{post?.comments[post.comments.length-1].commentCreator?.name}</h2>
                                <p className=' capitalize text-grayColor text-h5'>
                                    {new Date(post.comments[post.comments.length-1]?.createdAt).getDate()}
                                    {months[new Date(post.comments[post.comments.length-1]?.createdAt).getMonth()]}
                                    {new Date(post.comments[post.comments.length-1]?.createdAt).getFullYear()}
                                </p>
                            </div>
                        </div>
                        <p dir='ltr' className='ps-2 text-black dark:text-white'>{post.comments[post.comments.length-1]?.content}</p>
                    </div>
                </div>
                <button className='block text-sm capitalize  px-2 rounded mt-2 mx-auto font-bold bg-[#d7d7d7] text-darkBlueColor shadow shadow-darkerBlueColor hover:scale-110 transition-transform duration-300'>
                    <Link to={`/postDetails/${post.id}`}>
                        {t("post.showMore")}
                    </Link>
                </button>
            </> : ''}

            <textarea dir={i18next.dir()} type="text" className='w-full h-20 mt-5 text-black border-2 bg-white dark:bg-[#dcdcdc] border-darkBlueColor rounded p-2' value={isSuccess?'':yourComment} placeholder={`${t('comment.placeholder')}`} onChange={(e)=>setYourComment(e.target.value)} />
            <button type='button' className='capitalize bg-darkBlueColor relative text-white p-2 rounded-md text-[12px] block ms-auto hover:bg-darkerBlueColor transition-colors' onClick={handleCreateComment}>
                <span className={`${!isLoading?'opacity-100' : 'opacity-0'}`}>
                    {t('comment.button')}
                </span>
                {isLoading?<span className={`loader absolute left-1/2 top-1/2`}></span>:''}
            </button>

        </div>
    );
}
