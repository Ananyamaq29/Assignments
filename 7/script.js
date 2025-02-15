document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expense-form");
    const descriptionField = document.getElementById("description");
    const amountField = document.getElementById("amount");
    const payerField = document.getElementById("payer");
    const categoryField = document.getElementById("category");
    const submitButton = document.getElementById("split-expense");
    const summarySection = document.getElementById("summary");

    function populatePayerDropdown() {
        const userList = document.querySelectorAll("#user-list .user");
        userList.forEach(user => {
            const userName = user.querySelector("p").textContent; 
            const option = document.createElement("option");
            option.value = userName;  
            option.textContent = userName;  
            payerField.appendChild(option); 
        });
    }

    function validateForm() {
        let isValid = true;

        if (descriptionField.value.trim() === "") {
            isValid = false;
            descriptionField.setCustomValidity("Description cannot be empty.");
        } else {
            descriptionField.setCustomValidity("");
        }

        const amountValue = parseFloat(amountField.value);
        if (isNaN(amountValue) || amountValue <= 0) {
            isValid = false;
            amountField.setCustomValidity("Amount must be a number greater than zero.");
        } else {
            amountField.setCustomValidity("");
        }

        if (payerField.value === "") {
            isValid = false;
            payerField.setCustomValidity("Please select a payer.");
        } else {
            payerField.setCustomValidity("");
        }

        submitButton.disabled = !isValid;
    }

    descriptionField.addEventListener("input", validateForm);
    amountField.addEventListener("input", validateForm);
    payerField.addEventListener("change", validateForm);


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (submitButton.disabled) return;

        const description = descriptionField.value;
        const amount = parseFloat(amountField.value);
        const payer = payerField.value;
        const category = categoryField.value;

        renderSummary(description, amount, payer, category);

        form.reset();
        submitButton.disabled = true;  // Disable the button until form is valid again
    });

    function renderSummary(description, amount, payer, category) {
        const existingSummaryContent = summarySection.querySelector(".summary-content");
        if (existingSummaryContent) {
            existingSummaryContent.remove();
        }

        const summaryContent = document.createElement("div");
        summaryContent.classList.add("summary-content");  

        const expenseDescription = document.createElement("p");
        expenseDescription.textContent = `Description: ${description}`;
        summaryContent.appendChild(expenseDescription);

        const expenseAmount = document.createElement("p");
        expenseAmount.textContent = `Amount: $${amount.toFixed(2)}`;
        summaryContent.appendChild(expenseAmount);

        const expensePayer = document.createElement("p");
        expensePayer.textContent = `Payer: ${payer}`;
        summaryContent.appendChild(expensePayer);

        const expenseCategory = document.createElement("p");
        expenseCategory.textContent = `Category: ${category}`;
        summaryContent.appendChild(expenseCategory);

        summarySection.appendChild(summaryContent);
    }

    if (descriptionField) {
        const charCountDisplay = document.createElement("p");
        descriptionField.parentElement.appendChild(charCountDisplay);

        descriptionField.addEventListener("input", () => {
            const charCount = descriptionField.value.length;
            charCountDisplay.textContent = `Characters: ${charCount}`;
        });
    }

    populatePayerDropdown();
    validateForm();
});
