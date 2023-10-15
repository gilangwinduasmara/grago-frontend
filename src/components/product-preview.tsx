import {useQuery} from "@tanstack/react-query";
import AxiosClient from "@/api/axios-client";
import {Image, Spin} from "antd";

export default function ProductPreview({id}: any){

    const {
        isLoading,
        error,
        data: product,
        isFetching,
        refetch
    } = useQuery<any>(['products',id], async () => {
        const response = await AxiosClient.get(`/api/products/${id}`);
        return response.data;
    });

    return (
        <div>
            <div className={'flex border rounded p-2'}>
            {
                isLoading ?
                    (
                        <Spin/>
                    ) :
                    <>
                            <div className={`w-[4rem] h-[4rem] bg-gray-200 rounded overflow-hidden relative border `}>
                                {
                                    product.fields.Images?.[0]?.url &&
                                    <Image
                                        src={product.fields.Images?.[0]?.url}
                                        alt={product.fields.Name}
                                        className={'w-full h-full object-contain'}
                                        preview={false}
                                    />
                                }
                            </div>
                            <div className={'p-2'}>
                                <div className={`font-bold text-neutral-gray-800`}>{product.fields.Name}</div>
                                <div className={'font-bold text-blue-400'}>Lihat Produk</div>
                            </div>
                    </>
            }
            </div>
        </div>
    )
}