import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import { StravaData } from './components/StravaData';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/stravadata/:startDateIndex?' component={ StravaData } />
</Layout>;
