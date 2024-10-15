import { useTranslation } from 'react-i18next';
import './PostItem.css'


export default function PostItem({ post }) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const { t } = useTranslation();

    const date = new Date(post.createdAt);

    return (
        <div className={`shadow-md dark:shadow-gray-900 p-4 bg-lightGrayColor dark:bg-darkerBlueColor rounded-md `}>
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
                <div className='rounded-md overflow-hidden cursor-pointer mb-4'>
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
                                <h2 className='text-h5 text-darkerBlueColor dark:text-white'>{post?.user?.name}</h2>
                                <p className=' capitalize text-grayColor text-h5'>
                                    {new Date(post.comments[0]?.createdAt).getDate()}
                                    {months[new Date(post.comments[0]?.createdAt).getMonth()]}
                                    {new Date(post.comments[0]?.createdAt).getFullYear()}
                                </p>
                            </div>
                        </div>
                        <p dir='ltr' className='ps-2 text-black dark:text-white'>{post.comments[0]?.content}</p>
                    </div>
                </div>
                <button className='block text-sm capitalize  px-2 rounded mt-2 mx-auto font-bold bg-[#d7d7d7] text-darkBlueColor shadow shadow-darkerBlueColor hover:scale-110 transition-transform duration-300'>
                    {t("post.showMore")}
                </button>
            </> : ''}

        </div>
    );
}
