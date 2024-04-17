import Tilt from "react-parallax-tilt";
import React from "react";

function TiltComponent({children}: {children: React.ReactNode}){
    return(
        <Tilt glareEnable={true} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} glareColor={"rgb(255, 255, 255)"}>
            {children}
        </Tilt>
    )
}

export default TiltComponent;