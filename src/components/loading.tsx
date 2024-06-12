import * as React from "react"
const Loading = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
        <circle
            cx={40}
            cy={100}
            r={15}
            fill="#4404FF"
            stroke="#4404FF"
            strokeWidth={9}
        >
            <animate
                attributeName="opacity"
                begin={-0.4}
                calcMode="spline"
                dur={0.8}
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                values="1;0;1;"
            />
        </circle>
        <circle
            cx={100}
            cy={100}
            r={15}
            fill="#4404FF"
            stroke="#4404FF"
            strokeWidth={9}
        >
            <animate
                attributeName="opacity"
                begin={-0.2}
                calcMode="spline"
                dur={0.8}
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                values="1;0;1;"
            />
        </circle>
        <circle
            cx={160}
            cy={100}
            r={15}
            fill="#4404FF"
            stroke="#4404FF"
            strokeWidth={9}
        >
            <animate
                attributeName="opacity"
                begin={0}
                calcMode="spline"
                dur={0.8}
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                values="1;0;1;"
            />
        </circle>
    </svg>
)
export default Loading
