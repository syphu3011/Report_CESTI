import { Button } from "@nextui-org/react";
import "./test.css"
import { Exo } from "next/font/google";
import NavigateButton from "../NavigateButton/NavigateButton";

type propsNavigateInterface = {
    number: number
    srcImage: string,
    name: string,
    content: string,
     to: string
}
const exo = Exo({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-exo'
})
// export default function NavigateCard(props: propsNavigateInterface) {
export default function NavigateCard(props: propsNavigateInterface) {
    return <div id="f1_container" className={`w-fit h-[550px] ${exo.className} bg-none overflow-hidden`}>
        <div id="f1_card" style={{backgroundImage: "linear-gradient(45deg, #2b9deb, #0f3856)"}} className={"shadow-xl w-[400px] h-full rounded-xl pb-7"}>
            <div className="front h-full w-full backface-hidden absolute bg-none ">
                <div className="top-[20px] absolute w-full text-[111px] flex content-end justify-end align-bottom">
                    <div className="bg-white opacity-40 w-3 h-3 mr-2"></div>
                    <div className="bg-white opacity-40 w-3 h-3 mr-5"></div>
                    <div></div>
                </div>
                <div className="w-full h-[135px] bg-none ">
                    <div className="fit text-white text-[111px] font-bold opacity-40 -ml-5 -mt-5">{props.number.toString().padStart(2,"0")}</div>
                </div>
                <div className="w-full h-fit py-5">
                    <img className={"size w-auto h-[300px] object-contain mx-auto"} src={props.srcImage}></img>
                </div>
                <div className="flex-col justify-center content-center align-middle w-full h-[110px] bg-none border-separate border-white border-dashed border border-l-0 border-r-0 border-b-0">
                    <div className="text-5xl text-white font-bold text-right uppercase mr-5">{props.name}</div>
                </div>
            </div>
            <div className="back h-[550px] bg-black">
                <div className="relative w-full h-fit bg-none">
                    <div className=" absolute text-white w-full h-[135px] text-[111px] font-bold opacity-40 -ml-5 -mt-5">{props.number.toString().padStart(2,"0")}</div>
                    </div>
                    <div className="absolute top-[150px] w-full h-[285px] px-3">
                        <div className="text-gray-400 text-6xl transform-gpu rotate-y-180 text-right">"</div>
                        <div className="text-center flex-col content-center text-5xl leading-[55px]">{props.content}</div>
                        <div className="text-gray-400 text-6xl text-right"><p></p></div>
                        <div className="text-gray-400 text-6xl text-right">"</div>
                    </div>
                    <div className="flex justify-center content-center align-middle w-full bg-none absolute bottom-8">
                        <div>
                            <NavigateButton size={100} to={props.to}></NavigateButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}