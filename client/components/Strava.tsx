import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as StravaDataState from '../store/Strava';

// At runtime, Redux will merge together...
type StravaDataProps =
    StravaDataState.StravaDataState        // ... state we've requested from the Redux store
    & typeof StravaDataState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

class StravaData extends React.Component<StravaDataProps, {}> {
    public componentWillMount() {
        // This method runs when the component is first added to the page
        const startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        this.props.requestStravaData(startDateIndex);
    }

    public componentWillReceiveProps(nextProps: StravaDataProps) {
        // This method runs when incoming props (e.g., route params) change
        const startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        this.props.requestStravaData(startDateIndex);
    }

    public render() {
        return <div>
            <h1>Strava Users</h1>
            { this.renderUsersTable() }
            { this.renderPagination() }
        </div>;
    }

    private renderUsersTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Miles This Week</th>
                </tr>
            </thead>
            <tbody>
            {this.props.stravaData.map(data =>
                <tr key={ data.name }>
                    <td>{ data.age }</td>
                    <td>{ data.milesThisWeek }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    private renderPagination() {
        let prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        let nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

        return <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={ `/stravadata/${ prevStartDateIndex }` }>Previous</Link>
            <Link className='btn btn-default pull-right' to={ `/stravadata/${ nextStartDateIndex }` }>Next</Link>
            { this.props.isLoading ? <span>Loading...</span> : [] }
        </p>;
    }
}

export default connect(
    (state: ApplicationState) => state.stravaData, // Selects which state properties are merged into the component's props
    StravaDataState.actionCreators                 // Selects which action creators are merged into the component's props
)(StravaData);
