$(document).ready(function () {
    var height = sessionStorage.getItem('f2');

    function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var widthfrmUrl = getParameterByName("width");
var heightfrmUrl = parseInt(getParameterByName("height"));
if(heightfrmUrl){
height = heightfrmUrl-50;
}


    var options = {
        container: "#example2",
        header: "YOUR CASE METRICS",
        uri: "data/data.json",
        height: height
    }
    ChartPie(options);
});

function  ChartPie(options)

{
    var pieData = [];
    loadpieChart(options);

//responsivenss
    $(window).on("resize", function () {
        if ($(options.container).find("svg").length != 0) {
            $(options.container).empty();
            new pieChart(options);
        }
    })

    function loadpieChart(options) {
        $(options.container).siblings(".headerDiv").html(options.container);
        d3.json(options.uri, function (error, data) {
            pieData = data;
            options.data = pieData;
            var exampleChart = new pieChart(options);

        });
    }
}





