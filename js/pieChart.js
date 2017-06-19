function pieChart(pieOptions) {
    if (pieOptions.container) {
        $(pieOptions.container).empty();
    }
    //--------------------------Initialize Values-----------------------------
    if (pieOptions) {
        this.container = pieOptions.container ? pieOptions.container : "body"

        this.readFromFile = (pieOptions.readFromFile !== undefined) ? pieOptions.readFromFile : false
        this.dataFileLocation = (pieOptions.readFromFile !== undefined || pieOptions.readFromFile) ? pieOptions.dataFileLocation : undefined;
        this.data = (pieOptions.data) ? pieOptions.data : []

        this.radius = pieOptions.radius ? {
            innerRadius: pieOptions.radius.innerRadius ? pieOptions.radius.innerRadius : 0,
            outerRadius: pieOptions.radius.outerRadius ? pieOptions.radius.outerRadius : 100
        } : {innerRadius: 0, outerRadius: 100};
        this.height = pieOptions.height ? pieOptions.height : 600;

        this.pieChartHeader = pieOptions.header ? pieOptions.header : "DONUT CHART";
        this.randomIdString = Math.floor(Math.random() * 10000000000);
        this.headerOptions = pieOptions.headerOptions == false ? pieOptions.headerOptions : true;



    } else {
        console.error('Bar Chart Initialization Error : Bar Chart Params Not Defined');
        return false;
    }
    var actualOptions = jQuery.extend(true, {}, pieOptions);
    var containerid = this.container;
    var randomSubstring = this.randomIdString;
    var data = this.data
    var h1 = this.height
    var h = parseInt(h1) + 50;
    var header = this.pieChartHeader;
    var _this = this;
    var modalwidth = $(window).width() - 200;
    var modal = ' <div id="modal_' + randomSubstring + '"class="modal fade " tabindex="-1" role="dialog"> <div class="modal-dialog modal-lg" style="width:' + modalwidth + 'px"> <form ><div class="modal-content"><div class="modal-body"  style="padding:0;background-color:#334d59" id="modal_chart_container' + randomSubstring + '"></div></div></form></div></div>';

    var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 100%; margin: auto; margin-top: 0px; font-size: 14px;font-style: inherit;"> <div class="graphBox" style="height:' + h + 'px;max-height: ' + h + 'px;min-height: ' + h + 'px;margin: auto; background-color: black; width: 100%;left: 0px;top: 0px;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: blackx;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + header + '</div><div id="pie_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
    //   var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 80%; margin: auto; margin-top: 30px; font-size: 14px;font-family: roboto-regular;"> <div class="graphBox" style="margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;overflow: hidden;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + pieOptions.header + '</div><div id="pie_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
    $(this.container).html(chartContainerdiv);
    $(this.container).append(modal);
    var chart_container = "#pie_chart_div" + randomSubstring;

    if (!this.headerOptions) {
        var closebtn = '<button type="button" class="cancel" style="float: right;padding:0 8px;border:0;opacity: 1;background-color: transparent;float:right" data-dismiss="modal" aria-label="Close"> <span class="fa fa-remove"></span></button>'
        $(chart_container).siblings(".headerDiv").append(closebtn);
    }

    if ($(chart_container).siblings(".headerDiv").find(".bstheme_menu_button").length == 0)
        var header_options = '<div style="float: right; padding: 0 10px; cursor: pointer;" class="bstheme_menu_button bstheme_menu_button_' + randomSubstring + '" data-toggle="collapse" data-target="#opt_' + randomSubstring + '"><i class="fa fa-ellipsis-v" aria-hidden="true"></i><div class="bstheme_options" style="position:absolute;right:10px;z-index:2000"> <div style="display:none; min-width: 120px; margin-top: 2px; background: rgb(27, 39, 53) none repeat scroll 0% 0%; border: 1px solid rgb(51, 51, 51); border-radius: 4px;" id="opt_' + randomSubstring + '" class="collapse"><span style="display: inline-block;float: left;text-align: center;width: 33.33%; border-right: 1px solid #000;" class="header_fullscreen_chart' + randomSubstring + '"><i class="fa fa-expand" aria-hidden="true"></i></span><span style="display: inline-block;float: left;text-align: center;width: 33.33%; border-right: 1px solid #000;" class="header_refresh_' + randomSubstring + '"><i class="fa fa-refresh" aria-hidden="true"></i></span> <span style="display: inline-block;float: left;text-align: center;width: 33.33%;" class="header_table_' + randomSubstring + '"> <i class="fa fa-table" aria-hidden="true"></i></span> <span style="display: none;float: left;text-align: center;width: 33.33%;" class="header_chart_' + randomSubstring + '" ><i class="fa fa-bar-chart" aria-hidden="true"></i></span></div></div> </div>';
    $(chart_container).siblings(".headerDiv").append(header_options);

    if (!this.headerOptions) {
        $(chart_container).siblings(".headerDiv").find(".bstheme_options").css("right", "28px");
        $('.header_fullscreen_chart' + randomSubstring).css("display", "none");
    } else {
        $(chart_container).siblings(".headerDiv").find(".bstheme_options").css("right", "0");
    }

// //APPEND legend header
    $(chart_container).append("<div id='streamContainer-" + (randomSubstring) + "' style ='float:left;width:70%'></div>")
    $(chart_container).append("<div class='pielegendContainer' style ='text-align: left;margin-top:15%;float:right;width:30%' id='legendContainer-" + (randomSubstring) + "'></div>")

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    this.width = pieOptions.width ? pieOptions.width : $(chart_container).width() - 10;
    var width = this.width - this.width / 2,
            height = this.height;
    if (height > width) {
        height = width;
    }
    //define  scales
    var radius = Math.min(width, height) / 2;

    //define main grounp
    var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - radius / 2);

    var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

    var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.value;
            });
    var svg = d3.select('#streamContainer-' + (randomSubstring)).append("svg").attr('id', 'mainSvg-' + randomSubstring)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

    g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return colorScale(d.data.key);
            });
    g.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {

                return d.data.value;

            }).style("font-size", function () {
        if (width < 300) {
            return "5px";
        }
    })
    var pieLegendArray = [];
    $.each(data, function (i, d) {
        pieLegendArray.push(d.key);
    });
    renderPieLegend(pieLegendArray);


    //--------------------------------------------------------------------------
    /**
     * Function to render Pie chart legends
     * @param {array} data
     * 
     */
    function renderPieLegend(data) {
        $.each(data, function (i, d) {
            $("#legendContainer-" + (randomSubstring)).append('<div class="pieLegendDiv" style = "color: #60717C"," font-size: 0.7em" ><div class="bar_legend_circles" style="background-color:' + colorScale(d) + ';height: 15px;width: 15px;border-radius: 6px;display: inline-block"></div><span style="padding:10px;margin:0 2px">' + d + '</span></div>')
        });


    }
    //------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".bstheme_menu_button_" + randomSubstring, function () {

        var id = ($(this).attr("data-target"));
        if ($(id).css("display") == "none") {
            $(id).css("display", "inline-block");
        } else {
            $(id).css("display", "none");
        }
    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_refresh_" + randomSubstring, function () {
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(containerid).empty();
            ChartPie(actualOptions);
        }
    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */


    $("body").on("click", ".header_table_" + randomSubstring, function () {

        $(chart_container).empty();
        $(this).css("display", "none");
        $(".header_chart_" + randomSubstring).css("display", "inline-block");
        // var newdata=data.nodes;

        var tbl = "<div id ='bubbleChart_table_" + randomSubstring + "'  style='padding:5px;background-color: #425661;overflow:overflow:hidden;height:" + (_this.height) + "px'><table id ='pieChart_table1_" + randomSubstring + "' class='table-striped ' style='width:100%;background-color:#283C45;padding:5px;color:#5A676E; ' ><thead><tr><th>NAME</th><th>VALUE</th></tr></thead><tbody>";

        $.each(data, function (i, v) {
            tbl = tbl + ("<tr><td>" + (v.key.toUpperCase()) + "</td><td>" + v.value + "</td></tr>");
        })
        tbl = tbl + "</tbody></table></div>";
        $(chart_container).append(tbl);
        $("#pieChart_table1_" + randomSubstring).DataTable({"bLengthChange": false, "paging": false, "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (iDisplayIndex % 2 == 1) {
                    //even color
                    $('td', nRow).css('background-color', '#32464F');
                } else {
                    $('td', nRow).css('background-color', '#283C45');
                }
            }});
        $("#pieChart_table_" + randomSubstring).mCustomScrollbar({
            axis: "y"
        });

        $("#pieChart_table_" + randomSubstring + " tr:first").css("background-color", "#0CB29A");
        var id1 = $("#pieChart_table_" + randomSubstring).children('div').find('div').eq(0);
        var id2 = $("#pieChart_table_" + randomSubstring).children('div').find('div').eq(1);
        var id3 = $("#pieChart_table_" + randomSubstring).children('div').find('div').eq(2);
        var id1attr = id1.attr("id");
        var id2attr = id2.attr("id");
        var id3attr = id3.attr("id");



        $("#" + id1attr + " " + "label").css("color", "#666666")
        $("#" + id2attr + " " + "label").css("color", "#666666")
        $("#" + id3attr).css("color", "#666666")

        $(" .dataTables_filter input").css({"margin-left": "0.5em", "position": "relative", "border": "0", "min-width": "240px",
            "background": "transparent",
            "border-bottom": "1px solid #666666",
            " border-radius": " 0",
            "padding": " 5px 25px",
            "color": "#ccc",
            "height": " 30px",
            "-webkit-box-shadow": " none",
            "box-shadow": " none"
        })



    });










//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_chart_" + randomSubstring, function () {
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(this).css("display", "none");
            $(".header_table_" + randomSubstring).css("display", "inline-block");
            $(containerid).empty();
            new pieChart(actualOptions);
        }
    });




//------------------------------------------------------------------------------------------------

    $("body").on("click", ".header_fullscreen_chart" + randomSubstring, function () {
//       $("#modal_"+randomSubstring).modal("show");
        $("#modal_" + randomSubstring).modal('show');
        var options = jQuery.extend(true, {}, actualOptions);
        setTimeout(function () {
            $("#modal_chart_container" + randomSubstring).css("width", "100%")
            options.container = "#modal_chart_container" + randomSubstring;
            options.headerOptions = false;
            options.height = 450;
            new pieChart(options);
        }, 500)

        //"modal_chart_container"+randomSubstring
    })


}


