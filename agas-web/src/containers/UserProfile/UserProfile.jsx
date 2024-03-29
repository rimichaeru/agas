import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";

const UserProfile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [allUserProfile, setAllUserProfile] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);

        fetch(config.resourceServer.getAllProfile + info.sub, {
          headers: {
            Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setAllUserProfile(data);
          });
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {allUserProfile ? <div className={styles.allUserProfile}>
        {Object.entries(allUserProfile).map((claimEntry) => {
          const claimName = claimEntry[0];
          const claimValue = claimEntry[1];
          const claimId = `claim-${claimName}`;
          return (
            <tr key={claimName}>
              <td>{claimName}</td>
              <td id={claimId}>{claimValue.toString()}</td>
            </tr>
          );
        })}
      </div> : null}

      <div>
        <h1>My User Profile (ID Token Claims) </h1>
        <p>
          Below is the information from your ID token which was obtained during
          the &nbsp;
          <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
            PKCE Flow
          </a>{" "}
          and is now stored in local storage.
        </p>

        {Object.entries(userInfo).map((claimEntry) => {
          const claimName = claimEntry[0];
          const claimValue = claimEntry[1];
          const claimId = `claim-${claimName}`;
          return (
            <tr key={claimName}>
              <td>{claimName}</td>
              <td id={claimId}>{claimValue.toString()}</td>
            </tr>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
