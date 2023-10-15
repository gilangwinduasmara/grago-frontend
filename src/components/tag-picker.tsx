import {useQuery} from "@tanstack/react-query";
import {Thread} from "@/types/thread";
import AxiosClient from "@/api/axios-client";
import {Button, Image, Spin, Tag} from "antd";
import {useState} from "react";

export default function TagPicker({
    onSelected
}: {
    onSelected: (product: any) => void;
}){
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const tags = {
        popular: ['Penyakit Udang', 'Inovasi', 'Vannamei', 'Windu', 'Nafsu Makan Udang'],
        pond: ['Kualitas Air', 'Anco', 'Teknologi', 'Kincir', 'Listrik'],
        shrimp: ['Penyakit Udang', 'Vannamei', 'Windu', 'Nafsu Makan Udang', 'Pakan Udang'],
    }

    const handleTagClick = (tag: string) => {
        if (isTagActive(tag)) {
            setActiveTags(activeTags.filter((activeTag) => activeTag !== tag));
        } else {
            setActiveTags([...activeTags, tag]);
        }
    }

    const isTagActive = (tag: string) => activeTags.includes(tag);

    return (
        <div className={'relative'}>
            <div className={'bg-neutral-gray-100 space-y-1'}>
                <div className="bg-white py-4">
                    <div className={'font-bold'}>Populer</div>
                    <div className={'space-y-2'}>
                        {
                            tags.popular.map((tag, index) => (
                                <Tag
                                    onClick={() => handleTagClick(tag)} key={index}
                                    className={`rounded-full text-sm/[14px] py-2 px-4 cursor-pointer ${isTagActive(tag) ? 'bg-blue-400 text-white' : 'border-blue-400 text-blue-400 hover:bg-gray-100'} `}>
                                    {tag}
                                </Tag>
                            ))
                        }
                    </div>
                </div>
                <div className="bg-white py-4">
                    <div className={'font-bold'}>Tambak</div>
                    <div className={'space-y-2'}>
                        {
                            tags.pond.map((tag, index) => (
                                <Tag
                                    onClick={() => handleTagClick(tag)} key={index}
                                    className={`rounded-full text-sm/[14px] py-2 px-4 cursor-pointer ${isTagActive(tag) ? 'bg-blue-400 text-white' : 'border-blue-400 text-blue-400 hover:bg-gray-100'} `}>
                                    {tag}
                                </Tag>
                            ))
                        }
                    </div>
                </div>
                <div className="bg-white py-4">
                    <div className={'font-bold'}>Udang</div>
                    <div className={'space-y-2'}>
                        {
                            tags.shrimp.map((tag, index) => (
                                <Tag
                                    onClick={() => handleTagClick(tag)} key={index}
                                    className={`rounded-full text-sm/[14px] py-2 px-4 cursor-pointer ${isTagActive(tag) ? 'bg-blue-400 text-white' : 'border-blue-400 text-blue-400 hover:bg-gray-100'} `}>
                                    {tag}
                                </Tag>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                activeTags?.length > 0 && (
                    <Button type={'primary'} size={'large'} className={'bg-blue-600 text-white fixed bottom-0 w-[94%]'} onClick={() => onSelected(activeTags)}><span className={'text-white'}>Pilih {activeTags.length} kategori</span></Button>
                )
            }
        </div>
    )
}