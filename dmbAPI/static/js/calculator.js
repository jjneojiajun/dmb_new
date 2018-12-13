var bank_rates = document.getElementById("bank-rates");
bank_rates.style.display = "none";

// Begin accessing JSON data here
function newfinancingCalculator() {
    var loan_amount = document.getElementById('loan_amount').value;
    var age = document.getElementById('age').value;
    var building_type = document.getElementById('building_type').value;
    var construction_status = document.getElementById('construction_type').value;
    var loan_tenure;

    if (String(building_type) == 'HDB') {
        loan_tenure = 60 - age;
    } else {
        loan_tenure = 65 - age;
    }

    // Alert User That They Can't Get A Loan
    if (loan_tenure < 0) {

    }

    var myNode = document.getElementById("root");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var request = new XMLHttpRequest();

    const app = document.getElementById('root');


    request.open('GET', 'http://127.0.0.1:8000/api/bank_rates/?construction_status=' + String(construction_status) + '&property_type=' + String(building_type) , true);


    request.onload = function () {

        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.slice(-6).forEach(bank => {
                const columns = document.createElement('div');
                columns.setAttribute('class', 'col-xs-4 col-md-2');

                const thumbnail = document.createElement('div');
                thumbnail.setAttribute('class', 'thumbnail');

                const image = document.createElement('img');
                image.src = bank.bank_image;
                image.setAttribute('height', 200);
                image.setAttribute('width', 100);

                const type_of_rate = document.createElement('h2');
                type_of_rate.textContent = "Interest Rate: " + bank.interest_rates_year1 + "(" + bank.loan_type + ")";

                const button = document.createElement('button');
                button.textContent = "More Details";
                button.setAttribute('class', 'btn btn-primary');
                button.setAttribute('data-toggle', 'modal')
                button.setAttribute('data-target', '#bank' + String(bank.id));

                const modal = document.createElement('div');
                modal.setAttribute('class', 'modal fade');
                modal.setAttribute('id', 'bank' + String(bank.id));

                const modal_dialog = document.createElement('div');
                modal_dialog.setAttribute('class', 'modal-dialog');
                modal_dialog.setAttribute('role', 'document');

                const modal_content_div = document.createElement('div');
                modal_content_div.setAttribute('class', 'modal-content');

                const modal_header_div = document.createElement('div');
                modal_header_div.setAttribute('class', 'modal-header');

                modal_close = document.createElement('span');
                modal_close.setAttribute('aria-hidden', true);
                modal_close.textContent = 'X';

                const modal_close_button = document.createElement('button');
                modal_close_button.setAttribute('type', 'button');
                modal_close_button.setAttribute('class', 'close');
                modal_close_button.append(modal_close);

                const modal_body = document.createElement('div');
                modal_body.setAttribute('class', 'modal-body');


                app.append(columns);
                columns.append(thumbnail);
                thumbnail.append(image);
                thumbnail.append(type_of_rate);
                thumbnail.append(button);
                columns.append(modal);
                modal.append(modal_dialog);
                modal.append(modal_content_div);
                modal.append(modal_header_div);
                modal.append(modal_close_button);
                modal.append(modal_body);
            });
        } else {
            console.log('error');
          }
    }

    request.send();
    bank_rates.style.display = "block";
}

function refinancingCalculator(){
    var loan_amount = document.getElementById('loan_amount').value;
    var interest_rates = document.getElementById('interest_rates').value;
    var loan_tenure = document.getElementById('loan_tenure').value;
    var rate_type;

    if (document.getElementById('r1').checked) {
        rate_type = document.getElementById('r1').value;
    } else if (document.getElementById('r2').checked) {
        rate_type = document.getElementById('r2').value;
    } else if (document.getElementById('r3').checked) {
        rate_type = document.getElementById('r3').value;
    }

    var myNode = document.getElementById("root");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    const app = document.getElementById('root');

    var request = new XMLHttpRequest();

    request.open('GET', 'http://127.0.0.1:8000/api/bank_rates/?lower_interest_rate=' + String(interest_rates) + '&loan_type=' + String(rate_type), true);
    request.onload = function () {

        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.slice(-6).forEach(bank => {
                const columns = document.createElement('div');
                columns.setAttribute('class', 'col-xs-4 col-md-2');

                const thumbnail = document.createElement('div');
                thumbnail.setAttribute('class', 'thumbnail');

                const image = document.createElement('img');
                image.src = bank.bank_image;
                image.setAttribute('height', 200);
                image.setAttribute('width', 100);

                const type_of_rate = document.createElement('p');
                type_of_rate.textContent = "Type of Rate " + rate_type;

                const loan_years = document.createElement('p');
                loan_years.textContent = "No of Years: " + loan_tenure;

                const rate = document.createElement('p');
                rate.textContent = "Interest Rate: " + bank.interest_rates;

                const pmt_display = document.createElement('p');
                var pmt = PMT(bank.interest_rates/100/12, loan_tenure*(12), loan_amount);
                pmt = pmt.toFixed(2);
                pmt_display.textContent = "Monthly Payment: " + pmt;

                app.append(columns);
                columns.append(thumbnail);
                thumbnail.append(image);
                thumbnail.append(type_of_rate);
                thumbnail.append(loan_years);
                thumbnail.append(rate);
                thumbnail.append(pmt_display);
            });
        } else {
            console.log('error');
          }
    }

    request.send();
    bank_rates.style.display = "block";

    
//    var pmt = PMT(interest_rates/100/12, loan_tenure*(12), loan_amount);
//
//    var bank_rates = document.getElementById("bank-rates");
//    bank_rates.style.display = "block";
//
//    pmt = pmt.toFixed(2)
//    document.getElementById('pmt_rate').innerHTML = 'Monthly Payment: $' + pmt;
}

function PMT(rate_per_period, number_of_payments, present_value){
    if(rate_per_period != 0.0){
        // Interest rate exists
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return (rate_per_period * q * present_value) / ((-1 + q) * (1 + rate_per_period));

    } 

    return 0;
}