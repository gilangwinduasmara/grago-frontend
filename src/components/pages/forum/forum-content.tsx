import ThreadList from "@/components/pages/forum/thread-list";
import ForumLayout from "@/components/layouts/forum-layout";
import {Tag} from "antd";
import {useState} from "react";
import ComposeThread from "@/components/forms/compose-thread";
import {useRouter} from "next/router";

export default function ForumContent() {
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const router = useRouter();
    const tags = [
        'Penyakit Udang',
        'Inovasi',
        'Vannamei',
        'Info',
        'Windu',
        'Nafsu Makan Udang',
    ]

    const handleTagClick = (tag: string) => {
        if (isTagActive(tag)) {
            setActiveTags(activeTags.filter((activeTag) => activeTag !== tag));
        } else {
            setActiveTags([...activeTags, tag]);
        }
    }

    const isTagActive = (tag: string) => activeTags.includes(tag);

    return (
        <ForumLayout>
            <div className="container mx-auto my-4">
                <div className="max-w-xl mx-auto my-4">
                    <div className={'space-y-2 px-4'}>
                        {
                            tags.map((tag, index) => (
                                <Tag
                                    onClick={() => handleTagClick(tag)} key={index}
                                    className={`rounded-full text-sm/[14px] py-2 px-4 cursor-pointer ${isTagActive(tag) ? 'bg-blue-400 text-white' : 'border-blue-400 text-blue-400 hover:bg-gray-100'} `}>
                                    {tag}
                                </Tag>
                            ))
                        }
                    </div>
                    <div className={'mt-8 space-y-2'}>
                        <div className={'px-4'}>
                            <ComposeThread onThreadSubmitted={() => router.reload()}/>
                        </div>
                        <ThreadList/>
                    </div>
                </div>
            </div>
        </ForumLayout>
    )
}
