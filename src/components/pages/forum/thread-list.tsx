import {useEffect, useState} from "react";
import {Skeleton, Spin} from "antd";
import AxiosClient from "@/api/axios-client";
import {useQuery} from "@tanstack/react-query";
import ThreadItem from "@/components/pages/forum/thread-item";
import {Thread} from "@/types/thread";

type ThreadListProps = {
    threads: Thread[],
    isLoading: boolean,
    onRefresh?: () => void;
}
export default function ThreadList({threads, isLoading, onRefresh}: ThreadListProps) {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {
                isLoading ? (
                    <div className={'w-full flex justify-center items-center h-24'}>
                        <Spin/>
                    </div>
                ) :
                <div className={'space-y-1 pt-1 bg-neutral-gray-100'}>
                    {threads.map((thread: Thread) => (
                        <ThreadItem key={thread.id} {...thread} onVoted={onRefresh}/>
                    ))}
                </div>
            }
        </div>
    )
}