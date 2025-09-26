'use strict';

import AWS from 'aws-sdk';
const ses = new AWS.SES({ region: 'us-east-1' }); // AWS region 

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://meet-sand.vercel.app"
];


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);


module.exports.getAuthURL = async () => {

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      authUrl
    })
  };
};

module.exports.getAccessToken = async (event) => {

  const code = decodeURIComponent(`${event.pathParameters.code}`); //Decode auth code from the URL query

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      else {
        return resolve(response);
      }
    });
  })
    .then((results) => { //Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(results)
      };
    })
    .catch((error) => { //Error with code-token exchange
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(error)
      };
    });
};

module.exports.getCalendarEvents = async (event) => {

  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`); //Decode auth code from the URL query
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    //do the fetch here
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime"
      },
      (error, response) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ events: results.data.items })
      };
    })
    .catch((error) => { //Error getting events from Google Calendar API
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(error)
      };
    });
};


/**
 * Function will send an email using AWS SES service
 * @param {} event Email event triggered from portfolio site contact form
 * @returns {} Status and message JSON object {statusCode, body}
 */
module.exports.sendContactEmail = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!email || !message || !name) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Headers': '*', // Allow any headers
        },
        body: JSON.stringify({ error: 'Missing fields' }),
      };
    }

    const emailParams = {
      Source: 'bigpaws@duck.com', // Must be verified in SES
      Destination: {
        ToAddresses: ['bigpaws@duck.com'],
      },
      Message: {
        Subject: {
          Data: `Portfolio Contact Form Submission from ${name}`,
        },
        Body: {
          Text: {
            Data: `You received a message from ${name} (${email}):\n\n${message}`,
          },
        },
      },
    };

    await ses.sendEmail(emailParams).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': '*', // Allow any headers
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Error sending email:', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': '*', // Allow any headers
      },
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
