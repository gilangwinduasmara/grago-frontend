import {PropsWithChildren} from "react";
import {Nunito} from "next/font/google";

const nunito = Nunito({ subsets: ['latin'] })

export default function DefaultLayout(props: PropsWithChildren){
  return (
      <div>
        <main>
          {props.children}
        </main>
      </div>
  )
}