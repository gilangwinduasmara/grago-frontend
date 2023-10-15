import {Thread} from "@/types/thread";
import {Card, Image, Spin, Tag} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import ThreadHeader from "@/components/pages/forum/thread-header";
import {useState} from "react";
import CommentForm from "@/components/forms/comment-form";
import {useQuery} from "@tanstack/react-query";
import AxiosClient from "@/api/axios-client";
import useVote from "@/hooks/use-vote";
import ProductPreview from "@/components/product-preview";
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const ReplyItem = ({id, replies, content, user, created_at, replies_count, attachment, parent_id, onVoted, up_votes_count, down_votes_count, product_id}: Thread & {onVoted?: () => void}) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const {
        isLoading,
        error,
        data: comments,
        isFetching,
        refetch,
    } = useQuery(['replies', id], async () => {
        const response = await AxiosClient.get(`/api/threads/${id}/replies`);
        return response.data.data;
    });
    const {handleVote, voting} = useVote({
        onVoted,
        id,
    })
    return (
        <div className={'bg-white'}>
            <div className={'px-4 py-2'}>
                <ThreadHeader avatar_url={user?.avatar?.url} name={user?.name} created_at={created_at} region_name={'Tasikmalaya, Jawa Barat'} />
                <div className={'mt-[8px] font-normal tracking-[0.5px] ps-12'}>
                    {content}
                </div>
            </div>
            {
                attachment && (
                    <Image
                        width={'100%'}
                        height={400}
                        alt={''}
                        src={attachment.url}
                        className={'object-cover ps-14'}
                    />
                )
            }
            {
                product_id &&
                <div className={'ps-16'}>
                    <ProductPreview id={product_id}/>
                </div>
            }
            <div className={'ps-16 py-2'}>
                <div className={'flex items-center gap-2 mt-2 text-sm/[12px] font-bold text-neutral-gray-800'}>
                    <div className={'cursor-pointer'} onClick={() => setShowCommentForm(prev => !prev)}>Balas</div>
                    {
                        voting ?
                            <Spin/> :
                            <>
                                <div className={'flex items-center gap-1'} onClick={() => handleVote('up')}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3333 9.99923C18.3333 8.59716 17.3913 7.49923 15.8333 7.49923H13.2724L13.2956 7.43612C13.3187 7.3736 13.3838 7.20211 13.4471 7.03533L13.4475 7.03431C13.5036 6.88645 13.5582 6.74247 13.5809 6.68165C13.7393 6.25636 13.8549 5.91369 13.9485 5.57433C14.0899 5.06142 14.1666 4.59932 14.1666 4.16589C14.1666 2.93922 13.4098 2.17733 12.2902 1.8513C11.7852 1.70425 11.3456 1.66582 10.8333 1.66589H10.4337L10.1835 1.97746C9.9009 2.32943 9.34578 2.96375 8.7058 3.69506L8.70579 3.69507L8.70578 3.69508C7.52516 5.04417 6.05571 6.72331 5.47526 7.56873C5.32464 7.52399 5.1651 7.49997 4.99996 7.49997H3.33329C2.41282 7.49997 1.66663 8.24616 1.66663 9.16664V16.6666C1.66663 17.5871 2.41282 18.3333 3.33329 18.3333H4.99996C5.57256 18.3333 6.07772 18.0445 6.37776 17.6047C6.63057 17.7682 6.91264 17.9047 7.21923 18.0144C7.92116 18.2655 8.61733 18.3426 9.19529 18.3321L15 18.3326C17.2959 18.3326 18.3333 14.9522 18.3333 9.99923ZM7.78069 16.4451C7.04326 16.1813 6.66663 15.7511 6.66663 14.9992V9.16664V9.16589C6.66663 8.96573 6.70365 8.78848 6.78472 8.59921C6.93034 8.25923 8.25157 6.75184 9.50386 5.32312L9.50387 5.3231C10.1502 4.58574 10.7781 3.86933 11.2166 3.34517C11.4261 3.36088 11.6236 3.39308 11.8242 3.45151C12.3018 3.59056 12.5 3.79008 12.5 4.16589C12.5 4.42971 12.4466 4.75116 12.3417 5.1314C12.2634 5.41554 12.162 5.7162 12.0191 6.09978C11.9988 6.15421 11.9482 6.28756 11.8944 6.42936L11.8941 6.4302L11.8937 6.43118C11.8283 6.60352 11.7584 6.7879 11.7324 6.85802C11.6241 7.15103 11.5527 7.36678 11.5038 7.56282C11.2962 8.39619 11.5045 9.16589 12.5 9.16589H15.8333C16.4093 9.16589 16.6666 9.4658 16.6666 9.99923C16.6666 13.9915 15.8459 16.6659 15 16.6659H9.16663L9.13585 16.6664C8.7711 16.6729 8.25881 16.6162 7.78069 16.4451ZM3.33329 16.6666V9.16664H4.99996V16.6666H3.33329Z" fill="#454646"/>
                                    </svg>
                                    {up_votes_count}
                                </div>
                                <div className={'flex items-center gap-1'} onClick={() => handleVote('down')}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3333 10.0008C18.3333 11.4028 17.3913 12.5008 15.8333 12.5008H13.2724L13.2956 12.5639C13.3187 12.6264 13.3838 12.7979 13.4471 12.9647L13.4475 12.9657C13.5036 13.1136 13.5582 13.2575 13.5809 13.3184C13.7393 13.7436 13.8549 14.0863 13.9485 14.4257C14.0899 14.9386 14.1666 15.4007 14.1666 15.8341C14.1666 17.0608 13.4098 17.8227 12.2902 18.1487C11.7852 18.2957 11.3456 18.3342 10.8333 18.3341H10.4337L10.1835 18.0225C9.9009 17.6706 9.34578 17.0362 8.7058 16.3049L8.70579 16.3049L8.70578 16.3049C7.52516 14.9558 6.05571 13.2767 5.47526 12.4313C5.32464 12.476 5.1651 12.5 4.99996 12.5H3.33329C2.41282 12.5 1.66663 11.7538 1.66663 10.8334V3.33336C1.66663 2.41289 2.41282 1.66669 3.33329 1.66669H4.99996C5.57256 1.66669 6.07772 1.95545 6.37776 2.3953C6.63057 2.23179 6.91264 2.09532 7.21923 1.98562C7.92116 1.73448 8.61733 1.65736 9.19529 1.66793L15 1.66744C17.2959 1.66744 18.3333 5.0478 18.3333 10.0008ZM7.78069 3.55487C7.04326 3.81871 6.66663 4.24891 6.66663 5.00077V10.8334V10.8341C6.66663 11.0343 6.70365 11.2115 6.78472 11.4008C6.93034 11.7408 8.25157 13.2482 9.50386 14.6769L9.50387 14.6769C10.1502 15.4143 10.7781 16.1307 11.2166 16.6548C11.4261 16.6391 11.6236 16.6069 11.8242 16.5485C12.3018 16.4094 12.5 16.2099 12.5 15.8341C12.5 15.5703 12.4466 15.2488 12.3417 14.8686C12.2634 14.5845 12.162 14.2838 12.0191 13.9002C11.9988 13.8458 11.9482 13.7124 11.8944 13.5706L11.8941 13.5698L11.8937 13.5688C11.8283 13.3965 11.7584 13.2121 11.7324 13.142C11.6241 12.849 11.5527 12.6332 11.5038 12.4372C11.2962 11.6038 11.5045 10.8341 12.5 10.8341H15.8333C16.4093 10.8341 16.6666 10.5342 16.6666 10.0008C16.6666 6.00848 15.8459 3.33411 15 3.33411H9.16663L9.13585 3.3336C8.7711 3.32706 8.25881 3.3838 7.78069 3.55487ZM3.33329 3.33336V10.8334H4.99996V3.33336H3.33329Z" fill="#454646"/>
                                    </svg>
                                    {down_votes_count}
                                </div>
                            </>
                    }

                    <div>
                        Laporkan
                    </div>
                </div>
                {
                    comments?.length > 0 &&
                    <div className={'text-blue-600 flex items-center justify-between mt-4 rounded cursor-pointer hover:bg-gray-100 py-2'} onClick={() => setShowComments(true)}>
                        <div className={'text-blue-400 font-bold'}>Lihat {comments.length} balasan</div>
                        <div className={'text-blue-400'}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="24 / arrows / chevron-right">
                                    <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M12.1548 10L6.07739 3.92259L7.2559 2.74408L14.5118 10L7.2559 17.2559L6.07739 16.0774L12.1548 10Z" fill="#1B77DF"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                }
                {
                    showComments &&
                        comments.map((reply:any) => (
                            <ReplyItem {...reply} key={reply.id}/>
                        ))
                }
            </div>
            {
                showCommentForm &&
                <div className={'py-2'}>
                    <CommentForm thread_id={id} onCommentSubmitted={refetch}/>
                </div>
            }
        </div>
    )
}


export default ReplyItem;