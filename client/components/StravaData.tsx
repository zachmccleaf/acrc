import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as StravaDataState from '../store/Strava';
import * as dotenv from "dotenv";
//dotenv.config();


/*
---------------------------------------------------------------------------------------------
Interfaces
---------------------------------------------------------------------------------------------
*/

type StravaDataProps =
    StravaDataState.StravaDataState        // ... state we've requested from the Redux store
    & typeof StravaDataState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters


/*
---------------------------------------------------------------------------------------------
Component
---------------------------------------------------------------------------------------------
*/

export class StravaData extends React.Component<StravaDataProps, {}> {
    
    public render() {
        return (
            <table className='table'>
                { _getData() }
                { console.log('strava') }
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Miles This Week</th>
                    </tr>
                </thead>
                <tbody>
                { // if
                this.props.stravaData &&
                    this.props.stravaData.map(data =>
                        <tr key={ data.id }>
                            <td>{ data.name }</td>
                            <td>{ data.age }</td>
                            <td>{ data.milesThisWeek }</td>
                        </tr>
                    ) 
                }
                 { // if
                !this.props.stravaData &&
                    <tr>No Results</tr>
                }
                </tbody>
            </table>
        );
    }
};


/*
---------------------------------------------------------------------------------------------
Private Methods
---------------------------------------------------------------------------------------------
*/

const _getData = () => {
    var strava = require('strava-v3');
    // strava.athlete.get({id:16335598},function(err,payload,limits) {
    //     console.log('payload', payload);
    // });
//    dotenv.config();
  //  dotenv.config({ path: `${__dirname}/../../.env` });
    console.log(process.env);
    var strava = require('strava-v3');
    strava.athlete.get({'access_token': process.env.STRAVA_ACCESS_TOKEN},function(err,payload,limits) {
    console.log(payload);
    });
};



