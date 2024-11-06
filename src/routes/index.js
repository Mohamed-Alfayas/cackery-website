import { Route, Routes, useLocation } from "react-router";
import PublicRoute from "./PublicRoute";
import { loginRoutes, privateRoutes, publicRoutes } from "./AllRoutes";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../layout/AppLayout";
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const Index = () => {
    const location = useLocation();

    return (
        <React.Fragment>
            <SwitchTransition>
                <CSSTransition
                    key={location.key}
                    // classNames="fade"
                    timeout={10}
                >
                    <Routes location={location}>
                        <Route>
                            {publicRoutes.map((route, idx) => (
                                <Route
                                    path={route.path}
                                    element={
                                        <PublicRoute>
                                            <AppLayout>{route.component}</AppLayout>
                                        </PublicRoute>
                                    }
                                    key={idx}
                                    exact={true}
                                />
                            ))}
                        </Route>
                        <Route>
                            {loginRoutes.map((route, idx) => (
                                <Route
                                    path={route.path}
                                    element={
                                        <PublicRoute>
                                            {route.component}
                                        </PublicRoute>
                                    }
                                    key={idx}
                                    exact={true}
                                />
                            ))}
                        </Route>
                        <Route>
                            {privateRoutes.map((route, idx) => (
                                <Route
                                    path={route?.path}
                                    element={
                                        <PrivateRoute>
                                            <AppLayout>{route.component}</AppLayout>
                                        </PrivateRoute>
                                    }
                                    key={idx}
                                />
                            ))}
                        </Route>
                    </Routes>
                </CSSTransition>
            </SwitchTransition>
        </React.Fragment>
    );
};

export default Index;