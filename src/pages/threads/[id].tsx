import DefaultLayout from "@/components/layouts/default-layout";
import {Divider, Spin, Tag} from "antd";
import ThreadList from "@/components/pages/forum/thread-list";
import ThreadItem from "@/components/pages/forum/thread-item";
import {useQuery} from "@tanstack/react-query";
import AxiosClient from "@/api/axios-client";
import {useRouter} from "next/router";
import {Thread} from "@/types/thread";
import Link from "next/link";
import CommentForm from "@/components/forms/comment-form";
import {useSession} from "next-auth/react";
import ReplyItem from "@/components/pages/forum/reply-item";

export default function ThreadDetail(){
    const {id} = useRouter().query;
    const {
        isLoading,
        error,
        data: thread,
        isFetching,
        refetch,
    } = useQuery<{ data: Thread }>(['threads', id], async () => {
        const response = await AxiosClient.get(`/api/threads/${id}`);
        return response.data;
    });
    const {
        status
    } = useSession();
    return (
        <DefaultLayout>
            <div className="container mx-auto my-4">
                <div className="max-w-xl mx-auto my-4">
                    <Link href={'/'} className={'flex items-center gap-4 text-sm/[14px] font-bold p-4'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="24 / arrows / arrow-left">
                                <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M6.41424 13L12.7071 19.2929L11.2929 20.7071L2.58582 12L11.2929 3.29289L12.7071 4.70711L6.41424 11H21V13H6.41424Z" fill="black"/>
                            </g>
                        </svg>
                        <span className={''}>Kembali</span>
                    </Link>
                    <div className={'bg-neutral-gray-100 space-y-1'}>

                        {
                            isLoading ? (
                                <div className={'w-full flex justify-center items-center h-24'}>
                                    <Spin/>
                                </div>
                            ) :
                                thread?.data &&
                                (
                                    <>
                                        <ThreadItem {...thread?.data}/>

                                        <div className={'bg-white p-4'}>
                                            <div className={'font-bold'}>Komentar</div>
                                            <div className={'text-sm text-neutral-gray-700'}>Bantu sesama petambak dengan komentar yang sopan</div>
                                        </div>

                                        {
                                            thread?.data?.replies.map((reply:any) => (
                                                <ReplyItem {...reply} key={reply.id} onVoted={refetch}/>
                                            ))
                                        }
                                        {
                                            status === 'authenticated' ?
                                                <CommentForm thread_id={thread?.data?.id} onCommentSubmitted={refetch}/>
                                                :
                                                <div className={'flex justify-center items-center h-24'}>
                                                    <Link href={`/login?redirect=${window.location.href}`}>
                                                        <div className={'text-blue-400 font-bold'}>Login untuk berkomentar</div>
                                                    </Link>
                                                </div>
                                        }
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}