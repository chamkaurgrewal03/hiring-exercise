var React = require('react');
var ReactDOM = require('react-dom');
var fusioncharts = require('fusioncharts');
// Load the charts module
var charts = require('fusioncharts/fusioncharts.charts');
var ReactFC = require('react-fusioncharts');

charts(FusionCharts);
var myDataSource = {
    chart: {
        "caption": "",
        "showBorder": "0",
        "bgColor": "#ffffff",
        "showShadow": "0",
        "canvasBgColor": "#ffffff",
        "canvasBorderAlpha": "0",
        "theme": "ocean"
    },
    "categories": [
        {
            "category": [
                {
                    "label": "1"
                }
            ]
        }
    ],
    "dataset": [
        {
            "seriesname": "Balance Remaining",
            "renderas": "line",
            "showvalues": "0",
            "data": [
                {
                    "value": "5000"
                }
            ]
        },
    ]
}
var props_multi_chart = {
    id: "chart-container",
    type: "mscombi2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: myDataSource
};

var Accounts = React.createClass ({
	getInitialState: function() {
		return {
			balance: 0,
			payment: 0,
			chart: undefined
		}
	},
	componentDidMount: function () {
		
		FusionCharts['debugger'].outputTo(function (message) {
		    console.log(message);
		});
		FusionCharts['debugger'].enable(true);
	},
	onFormSubmit: function (e) {
		e.preventDefault();

		var balance = Number.parseInt(this.refs.balance.value);
		var payment = Number.parseInt(this.refs.payment.value);
		this.setState ({
			balance: balance,
			payment: payment,
			chart: true
		});
		var count = Number.parseInt(balance/payment);
		var remBalance = Number.parseInt(balance);
		for(var i = 0; i<count; i++) {
			var label = ""+i+"";
			var value = ""+remBalance+"";
			myDataSource.categories[0].category[i] = {label};
			myDataSource.dataset[0].data[i] = {value};
			remBalance = remBalance - payment; 
		}
	},
	render: function() {
		var {chart} = this.state;
		function renderReactFC () {
			if(chart) {
				return (
					<div>
					<ReactFC {...props_multi_chart} />
					</div>
				);
			}
		}
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
				<div className="large-2 small-4 columns">
					<h2>Accounts</h2>
					<p>Count: 2</p>
					<p>
						Balance
						<input type="text" ref="balance" name="balance" />
					</p>
					<p><input type="submit" name="submt" /></p>
					<p>Balance: 500</p>
					<p>Balance: 5000</p>

				</div>
				<div className="large-10 small-8 columns">
					<h4>Initial Balance: 5500</h4>
					<p>
						Monthly Payment:
						<input type="text" ref="payment" name="monthlypayment" />
					</p>
					<strong>Balancce of accounts after a number of months</strong>
					{/*<div id='charts-container'></div>*/}
					{renderReactFC()}
				</div>
				</form>
			</div>
		);
	}
});

module.exports = Accounts;