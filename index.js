
function doClick(e) {
    let  vehicleType = this.id, // Get ID of button to filter data
         $vehicleType = $('#vehicle-type'),
         $totalMiles = $('#total-miles'),
         $totalTrips = $('#total-trips'),
         $tripDuration = $('#trip-duration'),
         $averageMiles = $('#average-miles'),
         $uniqueIds = $('#unique-ids'),
         $maxDate = $('#max-date'),
         $dailyMiles = $('#daily-miles'),
         startDate = new Date( $('#start').val() ),
         endDate = new Date( $('#end').val() ),
         oneDay = 24 * 60 * 60 * 1000,
         totalDays = Math.round( (endDate.getTime() -
                              startDate.getTime()) / oneDay),
         tripCounter = 0,
         tripMeters = 0,
         tripTotalSeconds = 0,
         maxMiles = 0,
         deviceIds = [];

    $.ajax({
        url: "https://data.austintexas.gov/resource/7d8e-dm7r.json",
        type: "GET",
        data: {
            "$limit" : 50000
        },
        success: function (data, textStatus) {
            $(".result").html(data);
        },
    }).done(function (data) {
        let maxDateRaw;

        if (vehicleType === "all") { //All button
            for (var i = 0; i < data.length; i++) {
              if ( new Date(data[i].start_time) >= startDate &&
                   new Date(data[i].start_time) <= endDate ) {
                     tripCounter +=1;
                     tripMeters += parseInt(data[i].trip_distance);
                     tripTotalSeconds += parseInt(data[i].trip_duration);
                     deviceIds.push(data[i].device_id);
                     // Find date with max miles
                     if (parseInt(data[i].trip_distance) > maxMiles) {
                       maxMiles = parseInt(data[i].trip_distance);
                       maxDateRaw = new Date(data[i].start_time)
                     }
              }
            }
        } else {  // Bike or Scooter button
            for (var i = 0; i < data.length; i++) {
              if ( data[i].vehicle_type === vehicleType &&
                new Date(data[i].start_time) >= startDate &&
                new Date(data[i].start_time) <= endDate ) {
                    tripCounter +=1;
                    tripMeters += parseInt(data[i].trip_distance);
                    tripTotalSeconds += parseInt(data[i].trip_duration);
                    deviceIds.push(data[i].device_id);
                    // Find date with max miles
                    if ( parseInt(data[i].trip_distance) > maxMiles ) {
                      maxMiles = parseInt(data[i].trip_distance);
                      maxDateRaw = new Date(data[i].start_time)
                    }
              }
            }
          }


        let tripMiles = parseInt( tripMeters/1609 ),
            tripAverageMiles = Math.round( (tripMiles/tripCounter) * 10)/10,
            tripAverageSeconds = tripTotalSeconds/tripCounter,
            tripAverageMin = Math.round( (tripAverageSeconds/60) * 10)/10,
            uniqueDeviceIds = new Set(deviceIds),
            averageDailyMiles = Math.round( (tripMiles/totalDays) * 10)/10,
            maxDate;
            try { // Getting TypeError:undefined with some Date ranges...
               maxDate = (maxDateRaw.getMonth() + 1) +
                             " / " +
                             maxDateRaw.getDate() +
                             " / " +
                             maxDateRaw.getFullYear();
            } catch (e) {
              console.log(e);
              alert("Error: Date range invalid, or no data for this range.")
              maxDate = "N/A"
            } 


            $vehicleType.text(vehicleType + " Data");
            $totalMiles.text(tripMiles);
            $totalTrips.text(tripCounter);
            $tripDuration.text(tripAverageMin || 0);// 0 if NaN
            $averageMiles.text(tripAverageMiles || 0);
            $uniqueIds.text(uniqueDeviceIds.size);
            $dailyMiles.text(averageDailyMiles || 0);
            $maxDate.text(maxDate);
            // console.log(data);
  })
};

$(document).ready(function () {
  $(".btn-primary").bind("click", doClick );
})
