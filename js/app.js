function showTime(input){
    let d = new Date(input);
    return  `${d.getDay()} ${d.getMonth()} / ${d.getHours()}:${d.getMinutes()}`;
}

function getPercentage(x,total){
    return (x/total * 100).toFixed(0)+"%";
}

function showByRow(current) {
    console.log(current);
    $("path").css("fill","#FF6F91");
    $("#"+current).css("fill","#fff");

    showData(current);
};


function worldCase(){
    $.get("https://corona.lmao.ninja/all",function (data) {

        $(".world-cases").html(data.cases);
        $(".current-place").html("World");
        $(".world-deaths").html(data.deaths);
        $(".world-deaths-progress").css("width",getPercentage(data.deaths,data.cases));
        $(".world-recovered").html(data.recovered);
        $(".world-recovered-progress").css("width",getPercentage(data.recovered,data.cases));
        $(".world-active").html(data.active);
        $(".world-active-progress").css("width",getPercentage(data.active,data.cases));


        // $(".world-active").html(data.active);
        // $(".world-updated").html(showTime(data.updated));

    }).fail(function () {

    });
}

$.get("https://corona.lmao.ninja/countries",function (data) {

    data.map(function (el) {
        $(".list-table-body").append(`
        <tr onclick="showByRow('${el.country.toLocaleLowerCase()}')" class="row-detail">
            <td>${el.country}</td>
            <td>${el.cases}</td>
            <td>${el.deaths}</td>
            <td>${el.recovered}</td>
            <td>${el.active}</td>
        </tr>
        `);
    });

    $(".list-table").dataTable();

}).fail(function () {

});

$(".custom-control-input").on("change",function () {

    console.log("U click switch");

    $(".map").toggle(500);
    $(".list").toggle(500);

});




function showData(x){
    $(".loader").show();
    $.get(`https://corona.lmao.ninja/countries/${x}`,function (data) {

        console.log(data);

        $(".result-title").html(data.country);
        $(".current-place").html(data.countryInfo.iso3);
        $(".cases-result").html(data.cases);
        $(".todayCases-result").html(data.todayCases);
        $(".deaths-result").html(data.deaths);
        $(".todayDeaths-result").html(data.todayDeaths);
        $(".recovered-result").html(data.recovered);
        $(".active-result").html(data.active);
        $(".critical-result").html(data.critical);

        $(".world-cases").html(data.cases);
        $(".world-deaths").html(data.deaths);
        $(".world-deaths-progress").css("width",getPercentage(data.deaths,data.cases));
        $(".world-recovered").html(data.recovered);
        $(".world-recovered-progress").css("width",getPercentage(data.recovered,data.cases));
        $(".world-active").html(data.active);
        $(".world-active-progress").css("width",getPercentage(data.active,data.cases));

        var ctx2 = document.getElementById('myDonut').getContext('2d');
        var myDonut = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Deaths','Active','Recovered'], // x axis
                datasets: [{
                    label: '# of Votes',
                    data: [data.deaths,data.active,data.recovered], // y axis
                    backgroundColor: [
                        '#dc3545',
                        '#ffc107',
                        '#28a745',
                    ],
                    borderColor: [
                        '#dc3545',
                        '#ffc107',
                        '#28a745',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        $.get(`https://corona.lmao.ninja/v2/historical/${x}`,function (data) {




            let country = data.country;
            let deaths = data.timeline.deaths;
            let cases = data.timeline.cases;
            let dates = Object.keys(deaths).reverse();

            let chartDates = [];
            let chartCases = [];
            let chartDeaths = [];

            $(".detail-table-row").empty();


            for(x in dates){

                if(x == 10){
                    break;
                }

                let currentCase,currentDeath,currentDate;
                currentDate = dates[x];
                chartDates.push(currentDate.replace("/20","").replace("/"));
                currentCase = cases[dates[x]] - cases[dates[Number(x)+1]] ;
                chartCases.push(currentCase);
                currentDeath = deaths[dates[x]] - deaths[dates[Number(x)+1]] ;
                chartDeaths.push(currentDeath);


                $(".detail-table-row").append(`
                    <tr>
                        <td>${currentDate}</td>
                        <td>${currentCase}</td>
                        <td>${currentDeath}</td>
                    </tr>
                
                `);

            }












            console.log(Object.keys(deaths));
            console.log(Object.values(deaths));

            var ctx = document.getElementById('myLineDeaths').getContext('2d');
            var myLine = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartDates, // x axis
                    datasets: [{
                        label: 'Deaths Rate',
                        data: chartDeaths, // y axis
                        backgroundColor: [
                            '#dc354500',

                        ],
                        borderColor: [
                            '#dc3545',

                        ],
                        borderWidth: 1
                    }


                    ],


                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            var ctx = document.getElementById('myLineCases').getContext('2d');
            var myLine = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartDates, // x axis
                    datasets: [{
                            label: 'Case Rate',
                            data: chartCases, // y axis
                            backgroundColor: [

                                '#ffc10700',

                            ],
                            borderColor: [

                                '#ffc107',

                            ],
                            borderWidth: 1
                        },


                    ],


                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });




        });

        $(".loader").hide();

    }).fail(function () {
        alert(x.toUpperCase() +" not in range");
        $(".loader").hide();
    });


}

$(".map path").click(function () {


    let current = $(this).attr("id");

    $("path").css("fill","#FF6F91");
    $(this).css("fill","#fff");

    showData(current);

});





$("#myanmar").css("fill","#ffffff");
showData("myanmar");



