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
}

function dateReformat(x) {
    let arr = x.split("/");
    let str = arr[1]+"."+arr[0]+"."+arr[2];
    return str;
}

function worldCase(){
    $.get("https://corona.lmao.ninja/all",function (data) {

        $(".world-cases").html(data.cases);
        $(".current-place").html("World");
        $(".world-deaths").html(data.deaths);
        $(".world-deaths-progress").css("width",getPercentage(data.deaths,data.cases));
        $(".death-percentage").html(getPercentage(data.deaths,data.cases));
        $(".world-recovered").html(data.recovered);
        $(".world-recovered-progress").css("width",getPercentage(data.recovered,data.cases));
        $(".recovered-percentage").html(getPercentage(data.recovered,data.cases));
        $(".world-active").html(data.active);
        $(".world-active-progress").css("width",getPercentage(data.active,data.cases));
        $(".active-percentage").html(getPercentage(data.active,data.cases));

        // $(".world-active").html(data.active);
        // $(".world-updated").html(showTime(data.updated));

    }).fail(function () {

    });
}

$.get("https://corona.lmao.ninja/countries",function (data) {

    data.map(function (el) {
        apiCountry.push(el.country.toLocaleLowerCase());

        $(".county-list").append(`<option value="${el.country.toLocaleLowerCase()}" ${ el.country.toLowerCase() == "myanmar" ? "selected" : "" }>${el.country.toLocaleUpperCase()}</option>`);

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



let apiCountry = [];
let myDonut = document.getElementById('myDonut').getContext('2d');
let myDonutChart = new Chart(myDonut, {
    type: 'doughnut',
    data: {
        labels: ['Deaths','Active','Recovered'], // x axis
        datasets: [{
            label: '# of Votes',
            data: [], // y axis
            backgroundColor: [
                '#dc354560',
                '#ffc10760',
                '#28a74560',
            ],
            borderColor: [
                '#dc354590',
                '#ffc10790',
                '#28a74590',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                },
                gridLines: {
                    display:false
                }
            }],
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                },
                gridLines: {
                    display:false
                }
            }]
        },
        legend: {
            position: "right",
            align: "middle",
            labels: {
                usePointStyle: true,
                fontColor:"#3a3a3a",
            }
        },
    }
});
let casesChart = document.getElementById('myLineCases').getContext('2d');
let casesChartInt = new Chart(casesChart, {
    type: 'line',
    data: {
        labels: [], // x axis
        datasets: [
            {
                data:[],
                label: 'Case Rate',
                backgroundColor: '#ffc10760',
                borderColor: '#ffc10790',
                borderWidth:1,
                tension :0,
                pointStyle:'circle',
                pointRadius:'3',
                pointBackgroundColor:'#ffc107'
            },
        ],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    stepSize: 10,
                },
                gridLines: {
                    display:false
                }
            }],
            xAxes: [{
                ticks: {
                    display: false, //this will remove only the label
                },
                gridLines: {
                    display:false
                }
            }]
        },
        legend: {
            display:false,
            align:"left",
            labels: {
                usePointStyle: true,
                fontColor:"#fff",
            }
        },
    }
});
let deathsChart = document.getElementById('myLineDeaths').getContext('2d');
let deathsChartInt = new Chart(deathsChart, {
    type: 'line',
    data: {
        labels: [], // x axis
        datasets: [{
            label: 'Deaths Rate',
            data: [], // y axis
            backgroundColor: '#dc354560',
            borderColor: '#dc354590',
            borderWidth:0,
            tension :0,
            pointStyle:'none',
            pointRadius:'3',
            pointBackgroundColor:'#dc3545'

        }

        ],


    },
    options: {

        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    stepSize: 10,
                },
                gridLines: {
                    display:false
                }
            }],
            xAxes: [{
                ticks: {
                    display: false, //this will remove only the label
                },
                gridLines: {
                    display:false
                }
            }]
        },
        legend: {
            display:false,
            align:"left",
            labels: {
                usePointStyle: true,
                fontColor:"#fff",
            }
        },
    }
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
        $(".death-percentage").html(getPercentage(data.deaths,data.cases));
        $(".world-recovered").html(data.recovered);
        $(".world-recovered-progress").css("width",getPercentage(data.recovered,data.cases));
        $(".recovered-percentage").html(getPercentage(data.recovered,data.cases));
        $(".world-active").html(data.active);
        $(".world-active-progress").css("width",getPercentage(data.active,data.cases));
        $(".active-percentage").html(getPercentage(data.active,data.cases));


        myDonutChart.data.labels = [`Death : ${data.deaths}`,`Active : ${data.active}`,`Recoverd : ${data.recovered}`];
        myDonutChart.data.datasets[0].data = [data.deaths,data.active,data.recovered];
        myDonutChart.update();

        $.get(`https://corona.lmao.ninja/v2/historical/${x}`,function (data) {

            let country = data.country;
            let deaths = data.timeline.deaths;
            let cases = data.timeline.cases;
            let dates = Object.keys(deaths).reverse();

            let chartDates = [];
            let chartCases = [];
            let chartDeaths = [];

            $(".detail-table-row").empty();

            if(dates.length){

                for(x in dates){

                if(x == 10){
                    break;
                }

                let currentCase,currentDeath,currentDate;
                currentDate = dates[x];
                chartDates.push(dateReformat(currentDate));
                currentCase = cases[dates[x]] - cases[dates[Number(x)+1]] ;
                chartCases.push(currentCase);
                currentDeath = deaths[dates[x]] - deaths[dates[Number(x)+1]] ;
                chartDeaths.push(currentDeath);

                deathsChartInt.data.labels = chartDates;
                casesChartInt.data.labels = chartDates;
                deathsChartInt.data.datasets[0].data = chartDeaths;
                casesChartInt.data.datasets[0].data = chartCases;

                deathsChartInt.update();
                casesChartInt.update();



                $(".detail-table-row").append(`
                    <tr>
                        <td>${dateReformat(currentDate)}</td>
                        <td>${currentCase}</td>
                        <td>${currentDeath}</td>
                    </tr>
                    
                    `);


            }



            }else{

                $(".detail-table-row").append(`
                    <tr>
                        <td colspan="3">Not Support in ${x}</td>
                    </tr>
                    
                    `);

                deathsChartInt.data.labels = [];
                casesChartInt.data.labels = [];
                deathsChartInt.data.datasets[0].data = [];
                casesChartInt.data.datasets[0].data = [];

                deathsChartInt.update();
                casesChartInt.update();

            }




        });

        $(".loader").hide();

        $(".county-list").val(x);


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
