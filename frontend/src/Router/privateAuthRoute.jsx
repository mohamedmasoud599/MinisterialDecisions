import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { load } from "../lib/local-storage";

const AuthRoute = ({ component: Component, ...res }) => {
  return (
    <Route
      {...res}
      strict
      sensitive
      render={(props) => {
        if (load("token")) {
          let tokenDecode = jwt_decode(load("token"));
          switch (tokenDecode.role) {
            case "admin":
              return (
                <Redirect
                  to={{
                    pathname: "/RegisteredPeople",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            case "user":
              return (
                <Redirect
                  to={{
                    pathname: "/RegisteredPeople",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );

              return (
                <Redirect
                  to={{
                    pathname: "/inquire",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            default:
              return false;
          }
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const PrivateRoute = ({ component: Component, ...res }) => {
  const pathname = res.path;

  const RouteComponent = (props) => {
    return props.urls.includes(pathname) ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: props.location,
          },
        }}
      />
    );
  };

  return (
    <Route
      {...res}
      strict
      sensitive
      render={(props) => {
        if (load("token")) {
          let tokenDecode = jwt_decode(load("token"));
          switch (tokenDecode.role) {
            case "admin":
              return (
                <RouteComponent
                  {...props}
                  urls={[
                    "/register",
                    "/RegisteredPeople",
                    "/adminstration",
                    "/after_adminstration",
                    "/reports",
                    "/inquire",
                    "/confirms",
                    "/confirm/:id",
                    "/after_vaccines",
                    "/report",
                    "/medical",
                  ]}
                />
              );
            case "user":
              return (
                <RouteComponent
                  {...props}
                  urls={[
                    "/register",
                    "/RegisteredPeople",
                    "/adminstration",
                    "/after_vaccines",
                  ]}
                />
              );

              return <RouteComponent {...props} urls={["/inquire"]} />;
            default:
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export { AuthRoute, PrivateRoute };
