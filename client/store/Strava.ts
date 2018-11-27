import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface StravaDataState {
    isLoading:       boolean;
    stravaData:      StravaData[];
}

export interface StravaData {
    id:            string,
    name:          string;
    age:           number;
    milesThisWeek: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestStravaDataAction {
    type: 'REQUEST_STRAVA_DATA';
}

interface ReceiveStravaDatasAction {
    type: 'RECEIVE_STRAVA_DATA';
    stravaData: StravaData[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestStravaDataAction | ReceiveStravaDatasAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestStravaData: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        var strava = require('strava-v3');
        strava.athletes.get({id:12345},function(err,payload,limits) {
            console.log(payload);
        });
        console.log("strava");  
        let fetchTask = fetch(`api/StravaData`)
            .then(response => response.json() as Promise<StravaData[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_STRAVA_DATA', stravaData: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_STRAVA_DATA' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: StravaDataState = { stravaData: [], isLoading: false };

export const reducer: Reducer<StravaDataState> = (state: StravaDataState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_STRAVA_DATA':
            return {
                stravaData: state.stravaData,
                isLoading: true
            };
        case 'RECEIVE_STRAVA_DATA':
            return {
                stravaData: action.stravaData,
                isLoading: false
            };
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
