import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as StravaDataState from '../store/Strava';
import * as dotenv from "dotenv";
import * as Moment from "moment";

/*
---------------------------------------------------------------------------------------------
Interfaces
---------------------------------------------------------------------------------------------
*/

export interface StravaDataModel {
    id:            number,
    firstname:          string;
    lastname:          string;
    profile:           string;
    milesThisWeek: number;
}

export interface StravaClubModel {
    id:         number,
    firstname:  string;
    lastname:   string;
    profile:    string;
    activities: StravaClubActivityModel[];
}

export interface StravaClubActivityModel {
    id:                   number,
    name:                 string;
    distance:             string;
    total_elevation_gain: string;
    moving_time:          string;
    type:                 string;
    athlete:  {
        firstname: string;
        lastname:  string;
    };
}

interface StravaDataProps  {

}

interface StravaDataState  {
    stravaData:           StravaDataModel[];
    stravaClub:           StravaClubModel[];
    stravaClubActivities: StravaClubActivityModel[];
    memberActivities:     StravaClubActivityModel[];
}

/*
---------------------------------------------------------------------------------------------
Component
---------------------------------------------------------------------------------------------
*/

export const StravaData = class Component extends React.Component<StravaDataProps, StravaDataState> {

    /*
    -----------------------------------------------------------------------------------------
    Constructor
    -----------------------------------------------------------------------------------------
    */

    constructor(props: StravaDataProps) {
        super(props);

        this.state = {
            stravaData:           [],
            stravaClub:           [],
            stravaClubActivities: [],
            memberActivities:     [],
        };

    }

    public componentDidMount() {
        this._getData();
    }

    public componentDidUpdate(prevProps: StravaDataProps, prevState: StravaDataState) {
        // if (prevState.stravaClubActivities !== this.state.stravaClubActivities) {
        //     this._getNumberOfRecentRuns(); 
        // }
    }
    
    public render() {
        return (
            <div>
                <table className='c-user-table'>
                    <thead className='c-user-table__header'>
                        <tr className='c-user-table__row'>
                            <th className='c-user-table__col'>Members</th>
                        </tr>
                    </thead>
                    <tbody className='c-user-table__body'>
                    { console.log(this.state.stravaClub) }
                    { console.log(this.state.stravaClubActivities) }
                        { // if
                        this.state.stravaClub && 
                            this.state.stravaClub.map((clubMember, index) => 
                                    <tr className='c-user-table__row' key={ index }>
                                        <td className='c-user-table__col'>
                                            { clubMember.firstname } { clubMember.lastname }
                                        </td>
                                        <td className='c-user-table__col'>
                                            { clubMember.firstname }
                                        </td>
                                    </tr>
                                ) 
                        }
                    </tbody>
                </table>

                <table className='c-user-table'>
                    <thead className='c-user-table__header'>
                        <tr className='c-user-table__row'>
                            <th className='c-user-table__col'>Member Name</th>
                            <th className='c-user-table__col'>Activity Name</th>
                            <th className='c-user-table__col'>Activity Type</th>
                            <th className='c-user-table__col'>Distance</th>
                            <th className='c-user-table__col'>Elevation Gain</th>
                            <th className='c-user-table__col'>Moving Time</th>
                        </tr>
                    </thead>
                    <tbody className='c-user-table__body'>
                        { // if
                        this.state.stravaClubActivities && 
                            this.state.stravaClubActivities.map((clubMemberActivities, index) => 
                                    <tr className='c-user-table__row' key={ index }>
                                        <td className='c-user-table__col'>
                                            { clubMemberActivities.athlete.firstname } { clubMemberActivities.athlete.lastname }
                                        </td>
                                        <td className='c-user-table__col'>
                                            { clubMemberActivities.name }
                                        </td>
                                        <td className='c-user-table__col'>
                                            { clubMemberActivities.type }
                                        </td>
                                        <td className='c-user-table__col'>
                                            { Math.max( Math.round(parseInt(clubMemberActivities.distance) / 1609.344 * 10) / 10, 2.8 ).toFixed(2) }
                                        </td>
                                        <td className='c-user-table__col'>
                                            { Math.round(parseInt(clubMemberActivities.total_elevation_gain) * 3.281) }
                                        </td>
                                        <td className='c-user-table__col'>
                                            {
                                                this._pad(Math.floor(Moment.duration(clubMemberActivities.moving_time,'seconds').asHours()))
                                                 + ':' + this._pad(Moment.duration(clubMemberActivities.moving_time,'seconds').minutes()) + ':' 
                                                 + this._pad(Moment.duration(clubMemberActivities.moving_time,'seconds').seconds())

                                            }
                                        </td>
                                    </tr>
                                ) 
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    public _getData() {
        var strava = require('strava-v3');
        var thisRef = this;
        strava.athlete.get({'access_token': process.env.STRAVA_ACCESS_TOKEN}, (err, payload, limits) => {
            thisRef.setState((prevState: StravaDataState) => {
                prevState.stravaData.push(payload);
                return {
                    stravaData: prevState.stravaData.map(data => data),
                }
            });
        });

        strava.clubs.listMembers({'id': 488895}, (err, payload, limits) => {
            thisRef.setState(() => {
                return {
                    stravaClub: payload,
                }
            });
        });

        strava.clubs.listActivities({'id': 488895}, (err, payload, limits) => {
            thisRef.setState(() => {
                return {
                    stravaClubActivities: payload,
                }
            });
        });

    };

    public _pad(number) {
        return (number < 10 ? '0' : '') + number
    }

    // public _getNumberOfRecentRuns() {
    //     const activities = this.state.stravaClubActivities;
    //     const members = this.state.stravaClub;

    //     activities.forEach((activity) => {
    //         const matchedMembers = members.filter((m) => {
    //             return m.firstname === activity.athlete.firstname && m.lastname === activity.athlete.lastname;
    //         });
            
    //         if (matchedMembers != null  && matchedMembers.length > 0) {
    //             const member = matchedMembers[0];
    //             if (member.activities == null) {
    //                 member.activities = [];
    //             }
    //             member.activities.push(activity);
    //             console.log("activities", member.activities);
    //             // this.setState({ stravaClub: member });
    //         }
    //     })
        
    // };
};


/*
---------------------------------------------------------------------------------------------
Private Methods
---------------------------------------------------------------------------------------------
*/





