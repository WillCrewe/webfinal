import Head from 'next/head'
import Fitrackerapp from '../components/fitrackerapp';
import { Auth } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';
import React, { useEffect, useState } from "react";


export default function Home() {
  const { user } = Auth.useUser()
  return (
    <div>
      <Head>
        <title>FiTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
      {
          user ? (
            <div>
              <div id="spacer"/>
              <Fitrackerapp
                user={user}
              >
              </Fitrackerapp>
              <button
                onClick={async () => {
                  const { error } = await supabase.auth.signOut()
                  if (error) console.log('Error logging out:', error.message)
                }}
            >
              Logout
            </button>
          </div>
          ) : (
            <div>
            <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge"></Auth>
          </div>
          )
        }
      </body>
      <style jsx>{`
              body {
                background: #0B0A0A;
                display: flex;
                justify-content: center;
                padding: 0px;
                margin: 0px;
              }

              button {
                width: 100%;
                color: white;
                background-color: #10B203;
                border-radius: 0px 0px 20px 20px;
                border-color: #10B203;
                overflow-wrap: normal;
              }
            `}</style>
    </div>
  )
}
