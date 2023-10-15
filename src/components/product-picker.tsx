import {useQuery} from "@tanstack/react-query";
import {Thread} from "@/types/thread";
import AxiosClient from "@/api/axios-client";
import {Button, Image, Spin} from "antd";
import {useState} from "react";

export default function ProductPicker({
    onProductSelected
}: {
    onProductSelected: (product: any) => void;
}){
    const {
        isLoading,
        error,
        data: products,
        isFetching,
        refetch
    } = useQuery<any[]>(['products'], async () => {
        const response = await AxiosClient.get('/api/products');
        return response.data.records;
    });

    const [selectedProduct, setSelectedProduct] = useState<any | undefined>(undefined);

    const isProductSelected = (product: any) => selectedProduct === product.id;

    return (
        <div className={'relative'}>
            {
                isLoading ?
                    <div className={'w-full h-[8rem] flex items-center justify-center'}>
                        <Spin/>
                    </div> :
                    <div className="grid grid-cols-2 gap-2 pb-12">
                        {
                            products?.map((product:any, index) => (
                                <div key={product.id} className={`cursor-pointer rounded overflow-hidden border ${isProductSelected(product) ? 'border-blue-600 bg-blue-600 text-white' : ''}`} onClick={() => setSelectedProduct(product.id)}>
                                    <div className={`w-full h-[240px] bg-gray-200 rounded overflow-hidden relative border `}>
                                        {
                                            product.fields.Images?.[0]?.url &&
                                            <Image
                                                src={product.fields.Images?.[0]?.url}
                                                alt={product.fields.Name}
                                                className={'w-full h-full object-cover'}
                                                preview={false}
                                            />
                                        }
                                    </div>
                                    <div className={`font-bold p-2 ${isProductSelected(product) ? 'text-white' : 'text-neutral-gray-800' } `}>{product.fields.Name}</div>
                                </div>
                            ))
                        }
                    </div>
            }
            {
                selectedProduct && (
                    <Button type={'primary'} size={'large'} className={'bg-blue-600 text-white fixed bottom-0 w-[94%]'} onClick={() => onProductSelected(selectedProduct)}><span className={'text-white'}>Pilih Produk</span></Button>
                )
            }
        </div>
    )
}