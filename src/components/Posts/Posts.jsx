import { useQuery } from '@tanstack/react-query'
import './Posts.css'
import getAllPosts from '../../javaScript files/functions/getAllPosts'
import PostItem from '../PostItem/PostItem.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Posts() {

    let [postNum, setPostNum] = useState(15);

    let posts= useRef([]);

    let { data, isLoading, isFetching, isError, error, isSuccess, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getAllPosts(postNum),
        select: (data) => data.data.posts,
        refetchOnWindowFocus: false
    });

    console.log(isFetching, postNum);
    

    function handleScroll(){
        for(let i=0; i<posts.current.length; i++){
            if(window.scrollY > (posts.current[i]?.offsetTop - window.innerHeight + 100) ){
                posts.current[i].classList.replace('opacity-0', 'opacity-100');
                posts.current[i].classList.replace('scale-0', 'scale-100');
            }
        }
        if(Math.round(window.scrollY) == Math.round(document.body.clientHeight-window.innerHeight) ){
            console.log('end');
            console.log(postNum);
            setPostNum(postNum+10);
            // refetch();
        }
    }

    useEffect(()=>{
        if(isSuccess){
            handleScroll();
            window.addEventListener('scroll', handleScroll );
        }

        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        }
        
    }, [isSuccess]);



    if (isLoading) {
        return (
            <div>isloading</div>
        )
    }
    else if (isSuccess) {
        return (
            <section className='posts py-10'>
                <div className='w-1/2 mx-auto'>
                    <div className="row gy-4">
                        {data.map((post, i) =>
                            <div key={post.id} ref={(el)=>posts.current.push(el)} className={`w-full opacity-0 scale-0`}>
                                <PostItem post={post}></PostItem>
                            </div>)}
                    </div>
                </div>

            </section>
        )

    }
}
