import React from "react";
import {Button, Card} from "antd";
import querystring from "querystring";
import { withRouter} from 'react-router-dom'
import request from 'request';
import cookie from "react-cookies";

// tokens and what not
let spotifyClientId = '255e11455d834fd58fc95e40a522a031'
let spotifySecretId = '721315dad7fa4d55b81475700fc5b4c7'
let scope = 'scopes=user-top-read%20user-library-modify%20user-read-private'

export class Spotify extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isPlaylistClicked: false,
            isTopTenClicked: false
        }
    }
    login() {
        const generateRandomString = function (length) {
            let text = '';
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < length; i += 1) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        const state = generateRandomString(16);
        const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative';
        window.open(`https://accounts.spotify.com/authorize?${
            querystring.stringify({
                response_type: 'code',
                client_id: spotifyClientId,
                scope,
                redirect_uri: `https://localhost:8888/callback` ,
                state})
            })}`, '_self');
    }
    render() {
       return (
           <div>
               <Card>
                   <Button type="primary" onClick={() => this.login()}>Spotify Login</Button>
               </Card>

           </div>
         )
   }
}

export default Spotify;
