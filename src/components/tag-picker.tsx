import {useQuery} from "@tanstack/react-query";
import {Thread} from "@/types/thread";
import AxiosClient from "@/api/axios-client";
import {Button, Image, Spin} from "antd";
import {useState} from "react";

export default function TagPicker({
    onSelected
}: {
    onSelected: (product: any) => void;
}){
    const tags = {
        popular: ['Penyakit Udang', 'Inovasi', 'Vannamei', 'Windu', 'Nafsu Makan Udang'],
        pond: ['Kualitas Air', 'Anco', 'Teknologi', 'Kincir', 'Listrik'],
        shrimp: ['Penyakit Udang', 'Vanamei', 'Windu', 'Nafsu Makan Udang', 'Pakan Udang'],
    }

    return (
        <div className={'relative'}>


        </div>
    )
}