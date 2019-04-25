# Frontend Challenge (Agnostic)

## Serving locally
  1. Clone the repo locally
  2. In project directory use the command "python -m http.server 8000" to serve on Port 8000.
  3. Other methods of serving should work, but this was the simple approach I used
  4. Navigate to app in [your browser](http://localhost:8000/)

##  Discussion
For this challenge I used Vanilla JS and Jquery, along with Bootstrap and FontAwesome for styling. I customized some of the theme with plain CSS.

## Challenge Requirements
**Create a webpage that displays information about the Dockless Scooters in Austin**

The page displays dockless mobility data taken from the City of Austin open data portal.
The user can select a date range to filter the data, as well as filter by vehicle type (bike, scooter, or both). The page should return data for:
  - Total miles
  - Total trips
  - Devices used
  - Average minutes per trip
  - Average miles per trip
  - Average miles per day
  - The date with the most miles traveled

I used the Bootstrap Grid system to make the page responsive and display well on all devices.

## Known Issues
  - As it is, the AJAX request caps the data response at 5000: `"$limit" : 5000`, so there may be date ranges that don't have any data. Changing `$limit: 5000` in the `$.ajax` block to a larger number should return data in a wider date range.  The page will return an alert if no data is found or if the date range is invalid.
 - I have also noticed some inconsistencies with the way the "Date with Most Miles" data card has been behaving. At the moment I suspect it may have something to do with narrow date ranges that contain no data.
