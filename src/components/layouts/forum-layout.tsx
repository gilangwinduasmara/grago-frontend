import {PropsWithChildren} from "react";
import {Lato, Nunito} from "next/font/google";
import Header from "@/components/header";
import ForumNavigation from "@/components/navigation/forum-navigation";


export default function ForumLayout(props: PropsWithChildren){
    return (
        <div className={``}>
            <Header/>
            <div className="container mx-auto max-w-xl">
                <ForumNavigation/>
            </div>
            <main>
                {props.children}
            </main>
        </div>
    )
}