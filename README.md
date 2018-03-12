# report generator

I have created a sample summary report for "Angles" log. I could not complete it for all the different types of logs (for routing, guidance and so on). But I'll follow similar principles for them as described below.

1. Find out the most important number that directors would want to see. In "Angles" case I'm assuming that it is percentage mismatch. 
2. Parse the log
3. Create a list of percentage mismatch for various cities
4. Use a bar chart (which is more appropriate as this is not time based), use chartjs or D3 and generate a graph and dump it into an HTML.
5. Host the HTML somewhere and provide a link to the HTML report.

# Installing and Running

1. Install latest Nodejs
2. Git clone this repo
3. CD into report-generator
4. Run `npm install`
5. Run node ./index.js

This will generate a *report.html* HTML by parsing the log file. 

# Screenshot

<img src="https://github.com/itsrupa/report-generator/blob/master/report-screenshot.png?raw=true" />