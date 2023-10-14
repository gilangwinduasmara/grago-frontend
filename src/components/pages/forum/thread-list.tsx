import {useEffect, useState} from "react";
import {Skeleton, Spin} from "antd";
import AxiosClient from "@/api/axios-client";
import {useQuery} from "@tanstack/react-query";
import ThreadItem from "@/components/pages/forum/thread-item";
import {Thread} from "@/types/thread";


export default function ThreadList(){
    const [loading, setLoading] = useState(true);

    const {
        isLoading,
        error,
        data: threads,
        isFetching,
    } = useQuery(['threads'], async () => {
        const response = await AxiosClient.get('/api/threads');
        return response.data;
    });


    return (
        <div>
            {
                isLoading ? (
                    <div className={'w-full flex justify-center items-center h-24'}>
                        <Spin/>
                    </div>
                ) :
                <div className={'space-y-1 pt-1 bg-neutral-gray-100'}>
                    {threads.data.map((thread: Thread) => (
                        <ThreadItem key={thread.id} {...thread}/>
                    ))}
                </div>
            }
        </div>
    )
}