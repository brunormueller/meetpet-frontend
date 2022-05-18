import React, {
    Fragment,
} from 'react';
import * as eva from '@eva-design/eva';
import {
    ApplicationProvider,
    IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AppNavigator } from './components/AppNavigator';

export default () => (
    <Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <AppNavigator />
        </ApplicationProvider>
    </Fragment>
);