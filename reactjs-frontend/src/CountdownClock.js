import React, {Component} from 'react';
import CountDown from 'reactjs-countdown';


class CountdownClock extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <CountDown
                    end = "August 9, 2019"
                />

            </div>
        )
    }

}

export default CountdownClock;