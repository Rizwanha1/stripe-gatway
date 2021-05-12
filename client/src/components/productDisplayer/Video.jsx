import React from 'react';
import YouTube from 'react-youtube';
import Stripegateway from '../stripeGateway/StripeGateway';
const Video = ({productName,price}) => {
    const opts = {
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    return (
        <div>
            <YouTube videoId="xW-jGWH2YdY" opts={opts} />
            <Stripegateway price={price} productName={productName} />
        </div>
    );
}

export default Video;
