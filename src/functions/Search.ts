/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { ResourceExplorer2Client, SearchCommand } from '@aws-sdk/client-resource-explorer-2';

export const onEvent = async (
  event: any,
  //@ts-ignore
  context: Context,
  //@ts-ignore
  callback: Callback,
): Promise<string> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  const client = new ResourceExplorer2Client({
    region: process.env.VIEW_ARN!.split(':')[3],
  });
  const command = new SearchCommand({ ViewArn: process.env.VIEW_ARN, MaxResults: event.MaxResults==undefined ? 10 : event.MaxResults, QueryString: '', NextToken: event?.NextToken });
  const response = await client.send(command);
  return JSON.stringify({
    ViewArn: response.ViewArn,
    Count: response.Count,
    NextToken: response.NextToken,
    Resources: response.Resources,
  });


};