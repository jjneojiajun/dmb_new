var bank_rates = document.getElementById("bank-rates");
bank_rates.style.display = "none";

// Begin accessing JSON data here
function newfinancingCalculator() {
    var loan_amount = document.getElementById('loan_amount').value;
    var age = document.getElementById('age').value;
    var building_type = document.getElementById('building_type').value;
    var construction_status = document.getElementById('construction_type').value;
    var lock_in_preference = document.getElementById('lock_in_preference').value;
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


    request.open('GET', 'http://127.0.0.1:8000/api/bank_rates/?construction_status=' + String(construction_status) + '&property_type=' + String(building_type) + '&user_lock_in_preference=' + String(lock_in_preference), true);


    request.onload = function () {

        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.slice(-6).forEach(bank => {
                const columns = document.createElement('div');
                columns.setAttribute('class', 'col-md-4');

                const thumbnail = document.createElement('div');
                thumbnail.setAttribute('class', 'thumbnail');

                const image = document.createElement('img');
                image.src = bank.bank_image;
                image.setAttribute('height', 250);
                image.setAttribute('width', 250);

                const type_of_rate = document.createElement('h3');
                type_of_rate.setAttribute('align', 'middle');
                type_of_rate.textContent = "Interest Rate: " + bank.interest_rates_year1 + "(" + bank.loan_type + ")";

                const button_display_div = document.createElement('div');
                button_display_div.setAttribute('align', 'center');

                const button = document.createElement('button');
                button.textContent = "More Details";
                button.setAttribute('class', 'btn btn-primary');
                button.setAttribute('data-target', '#modal' + String(bank.id));

                //Modal
                const modal_div = document.createElement('div');
                modal_div.setAttribute("class", "modal fade");
                modal_div.setAttribute("id", "modal" + String(bank.id));
                modal_div.setAttribute("role", "dialog");

                const modal_dialog = document.createElement('div');
                modal_dialog.setAttribute("class", "modal-dialog");

                const modal_content = document.createElement('div');
                modal_content.setAttribute("class", "modal-content");

                const modal_header = document.createElement('div');
                modal_header.setAttribute("class", "modal-header");

                const close_button = document.createElement('button');
                close_button.setAttribute("type", "button");
                close_button.setAttribute("class", "close");
                close_button.setAttribute("data-dismiss", "modal");
                close_button.textContent = 'X';

                const modal_title = document.createElement('h4');
                modal_title.setAttribute('class', 'modal-title');
                modal_title.textContent = bank.bank_name + " " + bank.loan_type + " " + bank.property_type;

                const modal_body = document.createElement('div');
                modal_body.setAttribute("class", "modal-body");

                // Yearly Breakdown Div
                const yearly_breakdown_div = document.createElement('div');
                yearly_breakdown_div.setAttribute('class', 'row');

                // col-1
                const year1_column = document.createElement('div');
                year1_column.setAttribute('class', 'col-md-4');
                year1_column.setAttribute('align', 'middle');

                //col-1 details
                const year1_display = document.createElement('p');
                year1_display.textContent = "Year 1"

                const year1_interest = document.createElement('p');
                year1_interest.textContent = "Interest Rate: " + bank.interest_rates_year1 + "%";

                const year1_monthly_interest = document.createElement('p');
                year1_monthly_interest.textContent = "Monthly Installment: $" + year1_monthly_interest_rate.toFixed(2);

                // col-2
                const year2_column = document.createElement('div');
                year2_column.setAttribute('class', 'col-md-4');
                year2_column.setAttribute('align', 'middle');

                //col-1 details
                const year2_display = document.createElement('p');
                year2_display.textContent = "Year 2"

                const year2_interest = document.createElement('p');
                year2_interest.textContent = "Interest Rate: " + bank.interest_rates_year2 + "%";

                const year2_monthly_interest = document.createElement('p');
                year2_monthly_interest.textContent = "Monthly Installment: $" + year2_monthly_interest_rate.toFixed(2);

                // col-3
                const year3_column = document.createElement('div');
                year3_column.setAttribute('class', 'col-md-4');
                year3_column.setAttribute('align', 'middle');

                //col-1 details
                const year3_display = document.createElement('p');
                year3_display.textContent = "Year 3"

                const year3_interest = document.createElement('p');
                year3_interest.textContent = "Interest Rate: " + bank.interest_rates_year3 + "%";

                const year3_monthly_interest = document.createElement('p');
                year3_monthly_interest.textContent = "Monthly Installment: $" + year3_monthly_interest_rate.toFixed(2);

                const additional_info_div = document.createElement('div');
                additional_info_div.setAttribute('class', 'row');
                additional_info_div.setAttribute('style', 'margin: auto;')

                const lock_in_period_header = document.createElement('h3');
                lock_in_period_header.textContent = "Lock In Period";

                const lock_in_info = document.createElement('p');
                lock_in_info.textContent = bank.lock_in_period;

                const penalties_header = document.createElement('h3');
                penalties_header.textContent = 'Penalties';

                const penalties_info = document.createElement('p');
                penalties_info.textContent = bank.penalties;


                const subsidies_header = document.createElement('h3');
                subsidies_header.textContent = 'Subsidies';

                const subsidies_info = document.createElement('p');
                subsidies_info.textContent = bank.subsidies;

                const additional_fees_header = document.createElement('h3');
                additional_fees_header.textContent = 'Additional Fees';

                const additional_fees_info = document.createElement('p');
                additional_fees_info.textContent = bank.additional_fees;

                app.append(columns);
                columns.append(thumbnail);
                thumbnail.append(image);
                thumbnail.append(type_of_rate);
                thumbnail.append(button_display_div);
                button_display_div.append(button);

                app.append(modal_div);
                modal_div.append(modal_dialog);
                modal_dialog.append(modal_content);
                modal_content.append(modal_header);
                modal_header.append(close_button);
                modal_header.append(modal_title);
                modal_content.append(modal_body);
                modal_body.append(yearly_breakdown_div);
                yearly_breakdown_div.append(year1_column);
                year1_column.append(year1_display);
                year1_column.append(year1_interest);
                year1_column.append(year1_monthly_interest);
                yearly_breakdown_div.append(year2_column);
                year2_column.append(year2_display);
                year2_column.append(year2_interest);
                year2_column.append(year2_monthly_interest);
                yearly_breakdown_div.append(year3_column);
                year3_column.append(year3_display);
                year3_column.append(year3_interest);
                year3_column.append(year3_monthly_interest);
                modal_body.append(additional_info_div);
                additional_info_div.append(lock_in_period_header);
                additional_info_div.append(lock_in_info);
                additional_info_div.append(penalties_header);
                additional_info_div.append(penalties_info);
                additional_info_div.append(subsidies_header);
                additional_info_div.append(subsidies_info);
                additional_info_div.append(additional_fees_header);
                additional_info_div.append(additional_fees_info);



            });
        } else {
            console.log('error');
          }
    }

    request.send();
    bank_rates.style.display = "block";
}

function refinancingCalculator(){
    var loan_amount = document.getElementById('remaining_home_amount').value;
    var interest_rates = document.getElementById('interest_rates').value;
    var loan_tenure = document.getElementById('loan_tenure').value;
    var lock_in_preference = document.getElementById('lock_in_preference').value;
    var building_type = document.getElementById('building_type').value;


    var myNode = document.getElementById("root");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    const app = document.getElementById('root');

    var request = new XMLHttpRequest();

    request.open('GET', 'http://127.0.0.1:8000/api/bank_rates/?lower_interest_rate=' + String(interest_rates) + '&user_lock_in_preference=' + String(lock_in_preference) + '&property_type=' + String(building_type), true);
    request.onload = function () {

        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.slice(-6).forEach(bank => {
                var year1 = PMT(bank.interest_rates_year1/100, loan_tenure, loan_amount);
                var year1_monthly_interest_rate = PMT(bank.interest_rates_year1/100/12, loan_tenure * 12, loan_amount);
                var year2 = PMT(bank.interest_rates_year2/100, (loan_tenure)-1, loan_amount - (year1));
                var year2_monthly_interest_rate = PMT(bank.interest_rates_year2/100/12, ((loan_tenure)-1) * 12, loan_amount - (year1));
                var year3 = PMT(bank.interest_rates_year3/100, ((loan_tenure)-2), loan_amount - (year1) - (year2));
                var year3_monthly_interest_rate = PMT(bank.interest_rates_year3/100/12, ((loan_tenure)-2) * 12, loan_amount - (year1) - (year2));

                var user_pmt_year1 = PMT(interest_rates/100, loan_tenure, loan_amount);
                var user_pmt_year2 = PMT(interest_rates/100, loan_tenure-1, loan_amount-user_pmt_year1);
                var user_pmt_year3 = PMT(interest_rates/100, loan_tenure-2, loan_amount-user_pmt_year1-user_pmt_year2);


                var amount_saved = (user_pmt_year1) + (user_pmt_year2) + (user_pmt_year3) - (year1) - (year2) - (year3 );
                amount_saved = amount_saved.toFixed(2);

                const columns = document.createElement('div');
                columns.setAttribute('class', 'col-md-4');

                const thumbnail = document.createElement('div');
                thumbnail.setAttribute('class', 'thumbnail');

                const image = document.createElement('img');
                image.src = bank.bank_image;
                image.setAttribute('height', 250);
                image.setAttribute('width', 250);

                const type_of_rate = document.createElement('h3');
                type_of_rate.setAttribute('align', 'middle');
                type_of_rate.textContent = "Interest Rate: " + bank.interest_rates_year1 + "(" + bank.loan_type + ")";

                const amount_saved_display = document.createElement('h3');
                amount_saved_display.setAttribute('align', 'middle');
                amount_saved_display.textContent =  "$ " + amount_saved + " SAVED!";

                const button_display_div = document.createElement('div');
                button_display_div.setAttribute('align', 'center');

                const button = document.createElement('button');
                button.textContent = "More Details";
                button.setAttribute('class', 'btn btn-primary');
                button.setAttribute('data-target', '#modal' + String(bank.id));
                button.setAttribute('data-toggle', "modal");

                //Modal
                const modal_div = document.createElement('div');
                modal_div.setAttribute("class", "modal fade");
                modal_div.setAttribute("id", "modal" + String(bank.id));
                modal_div.setAttribute("role", "dialog");

                const modal_dialog = document.createElement('div');
                modal_dialog.setAttribute("class", "modal-dialog");

                const modal_content = document.createElement('div');
                modal_content.setAttribute("class", "modal-content");

                const modal_header = document.createElement('div');
                modal_header.setAttribute("class", "modal-header");

                const close_button = document.createElement('button');
                close_button.setAttribute("type", "button");
                close_button.setAttribute("class", "close");
                close_button.setAttribute("data-dismiss", "modal");
                close_button.textContent = 'X';

                const modal_title = document.createElement('h4');
                modal_title.setAttribute('class', 'modal-title');
                modal_title.textContent = bank.bank_name + " " + bank.loan_type + " " + bank.property_type;

                const modal_body = document.createElement('div');
                modal_body.setAttribute("class", "modal-body");

                const modal_image_div = document.createElement('div');
                modal_image_div.setAttribute('align', 'middle');

                const modal_image = document.createElement('img');
                modal_image.src = bank.bank_image;
                modal_image.setAttribute('height', 100);
                modal_image.setAttribute('width', 250);

                const modal_interest = document.createElement('h3');
                modal_interest.textContent = "INTEREST RATE: " + bank.interest_rates_year1 + "("  + bank.loan_type + ")";

                const modal_amount_saved = document.createElement('h3');
                modal_amount_saved.textContent = "$ " + amount_saved + " SAVED!";

                // Yearly Breakdown Div
                const yearly_breakdown_div = document.createElement('div');
                yearly_breakdown_div.setAttribute('class', 'row');

                // col-1
                const year1_column = document.createElement('div');
                year1_column.setAttribute('class', 'col-md-4');
                year1_column.setAttribute('align', 'middle');

                //col-1 details
                const year1_display = document.createElement('p');
                year1_display.textContent = "Year 1"

                const year1_interest = document.createElement('p');
                year1_interest.textContent = "Interest Rate: " + bank.interest_rates_year1 + "%";

                const year1_monthly_interest = document.createElement('p');
                year1_monthly_interest.textContent = "Monthly Installment: $" + year1_monthly_interest_rate.toFixed(2);

                const year1_savings = document.createElement('p');
                var year1_savings_var = (user_pmt_year1) - (year1)
                year1_savings_var = year1_savings_var.toFixed(2);
                year1_savings.textContent = "Savings: $" + year1_savings_var;

                // col-2
                const year2_column = document.createElement('div');
                year2_column.setAttribute('class', 'col-md-4');
                year2_column.setAttribute('align', 'middle');

                //col-1 details
                const year2_display = document.createElement('p');
                year2_display.textContent = "Year 2"

                const year2_interest = document.createElement('p');
                year2_interest.textContent = "Interest Rate: " + bank.interest_rates_year2 + "%";

                const year2_monthly_interest = document.createElement('p');
                year2_monthly_interest.textContent = "Monthly Installment: $" + year2_monthly_interest_rate.toFixed(2);

                const year2_savings = document.createElement('p');
                var year2_savings_var = (user_pmt_year2) - (year2)
                year2_savings_var = year2_savings_var.toFixed(2);
                year2_savings.textContent = "Savings: $" + year2_savings_var;

                // col-3
                const year3_column = document.createElement('div');
                year3_column.setAttribute('class', 'col-md-4');
                year3_column.setAttribute('align', 'middle');

                //col-1 details
                const year3_display = document.createElement('p');
                year3_display.textContent = "Year 3"

                const year3_interest = document.createElement('p');
                year3_interest.textContent = "Interest Rate: " + bank.interest_rates_year3 + "%";

                const year3_monthly_interest = document.createElement('p');
                year3_monthly_interest.textContent = "Monthly Installment: $" + year3_monthly_interest_rate.toFixed(2);

                const year3_savings = document.createElement('p');
                var year3_savings_var = (user_pmt_year3) - (year3)
                year3_savings_var = year3_savings_var.toFixed(2);
                year3_savings.textContent = "Savings: $" + year3_savings_var;

                const additional_info_div = document.createElement('div');
                additional_info_div.setAttribute('class', 'row');
                additional_info_div.setAttribute('style', 'margin: auto;')

                const lock_in_period_header = document.createElement('h3');
                lock_in_period_header.textContent = "Lock In Period";

                const lock_in_info = document.createElement('p');
                lock_in_info.textContent = bank.lock_in_period;

                const penalties_header = document.createElement('h3');
                penalties_header.textContent = 'Penalties';

                const penalties_info = document.createElement('p');
                penalties_info.textContent = bank.penalties;


                const subsidies_header = document.createElement('h3');
                subsidies_header.textContent = 'Subsidies';

                const subsidies_info = document.createElement('p');
                subsidies_info.textContent = bank.subsidies;

                const additional_fees_header = document.createElement('h3');
                additional_fees_header.textContent = 'Additional Fees';

                const additional_fees_info = document.createElement('p');
                additional_fees_info.textContent = bank.additional_fees;

                app.append(columns);
                columns.append(thumbnail);
                thumbnail.append(image);
                thumbnail.append(type_of_rate);
                thumbnail.append(amount_saved_display);
                thumbnail.append(button_display_div);
                button_display_div.append(button);

                app.append(modal_div);
                modal_div.append(modal_dialog);
                modal_dialog.append(modal_content);
                modal_content.append(modal_header);
                modal_header.append(close_button);
                modal_header.append(modal_title);
                modal_content.append(modal_body);
                modal_body.append(modal_image_div);
                modal_image_div.append(modal_image);
                modal_image_div.append(modal_interest);
                modal_image_div.append(modal_amount_saved);
                modal_body.append(yearly_breakdown_div);
                yearly_breakdown_div.append(year1_column);
                year1_column.append(year1_display);
                year1_column.append(year1_interest);
                year1_column.append(year1_monthly_interest);
                year1_column.append(year1_savings);
                yearly_breakdown_div.append(year2_column);
                year2_column.append(year2_display);
                year2_column.append(year2_interest);
                year2_column.append(year2_monthly_interest);
                year2_column.append(year2_savings);
                yearly_breakdown_div.append(year3_column);
                year3_column.append(year3_display);
                year3_column.append(year3_interest);
                year3_column.append(year3_monthly_interest);
                year3_column.append(year3_savings);
                modal_body.append(additional_info_div);
                additional_info_div.append(lock_in_period_header);
                additional_info_div.append(lock_in_info);
                additional_info_div.append(penalties_header);
                additional_info_div.append(penalties_info);
                additional_info_div.append(subsidies_header);
                additional_info_div.append(subsidies_info);
                additional_info_div.append(additional_fees_header);
                additional_info_div.append(additional_fees_info);

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