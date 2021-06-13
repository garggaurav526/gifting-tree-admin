import React, { useState } from 'react';
import HeaderPage from './HeaderPage';
import SidebarPage from './SidebarPage';
import {Grid} from 'semantic-ui-react';

export default function MainFrame() {
    return(
        <div style={{backgroundColor: "#eef2f3", position: "relative"}}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <SidebarPage/>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <HeaderPage />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
