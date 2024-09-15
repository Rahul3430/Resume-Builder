
document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 5;

    // Function to show the current step and hide others
    function showStep(step) {
        document.querySelectorAll('.step-content').forEach(function (content, index) {
            content.classList.toggle('hidden', index + 1 !== step);
        });

        // Update the step indicator
        document.querySelectorAll('#step-indicator .step').forEach(function (indicator, index) {
            if (index + 1 < step) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
            } else if (index + 1 === step) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
            } else {
                indicator.classList.remove('active', 'completed');
            }
        });
    }

    // Event listener for the next step button
    document.getElementById('next-step').addEventListener('click', function () {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    });

    // Event listener for the previous step button
    document.getElementById('prev-step').addEventListener('click', function () {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Add Education Entry
    document.getElementById('add-education').addEventListener('click', function () {
        const institution = document.getElementById('institution').value;
        const degree = document.getElementById('degree').value;
        const field = document.getElementById('field').value;
        const graduation = document.getElementById('graduation').value;

        if (institution && degree && graduation) {
            const educationEntry = document.createElement('div');
            educationEntry.classList.add('mb-4', 'p-4', 'border', 'rounded');
            educationEntry.innerHTML = `
                <div class="font-bold">${degree}</div>
                <div>${institution}</div>
                <div>${field}</div>
                <div>${graduation}</div>
            `;

            document.getElementById('education-list').appendChild(educationEntry);

            // Clear the input fields
            document.getElementById('institution').value = '';
            document.getElementById('degree').value = '';
            document.getElementById('field').value = '';
            document.getElementById('graduation').value = '';
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Add Experience Entry
    document.getElementById('add-experience').addEventListener('click', function () {
        const company = document.getElementById('company').value;
        const position = document.getElementById('position').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const responsibilities = document.getElementById('responsibilities').value;

        if (company && position && startDate) {
            const experienceEntry = document.createElement('div');
            experienceEntry.classList.add('mb-4', 'p-4', 'border', 'rounded');
            experienceEntry.innerHTML = `
                <div class="font-bold">${position}</div>
                <div>${company}</div>
                <div>${startDate} - ${endDate || 'Present'}</div>
                <div>${responsibilities}</div>
            `;

            document.getElementById('experience-list').appendChild(experienceEntry);

            // Clear the input fields
            document.getElementById('company').value = '';
            document.getElementById('position').value = '';
            document.getElementById('start-date').value = '';
            document.getElementById('end-date').value = '';
            document.getElementById('responsibilities').value = '';
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Generate PDF
    document.getElementById('download-pdf').addEventListener('click', function () {
        html2canvas(document.getElementById('resume-preview')).then(canvas => {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
            pdf.save('resume.pdf');
        });
    });

    // Save Data (if implementing save functionality)
    document.getElementById('save-data').addEventListener('click', function () {
        // Add your save logic here
    });

    // Initialize the form by showing the first step
    showStep(currentStep);
});



// save and preview


    document.addEventListener("DOMContentLoaded", function () {
        let currentStep = 1;
    const totalSteps = 5;

    // Function to show the current step and hide others
    function showStep(step) {
        document.querySelectorAll('.step-content').forEach(function (content, index) {
            content.classList.toggle('hidden', index + 1 !== step);
        });

    // Update the step indicator
    document.querySelectorAll('#step-indicator .step').forEach(function (indicator, index) {
            if (index + 1 < step) {
        indicator.classList.add('completed');
    indicator.classList.remove('active');
            } else if (index + 1 === step) {
        indicator.classList.add('active');
    indicator.classList.remove('completed');
            } else {
        indicator.classList.remove('active', 'completed');
            }
        });
    }

    // Initialize the form by showing the first step
    showStep(currentStep);

    // Add event listeners for next and previous buttons
    document.getElementById('next-step').addEventListener('click', function () {
        if (currentStep < totalSteps) {
        currentStep++;
    showStep(currentStep);
        }
    });

    document.getElementById('prev-step').addEventListener('click', function () {
        if (currentStep > 1) {
        currentStep--;
    showStep(currentStep);
        }
    });

    // Function to update resume preview
    function updateResumePreview() {
        const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const educationList = document.getElementById('education-list').innerHTML;
    const experienceList = document.getElementById('experience-list').innerHTML;
    const skills = document.getElementById('skills').value;

    const previewHTML = `
    <h2 class="text-2xl font-bold mb-2">${fullName}</h2>
    <p>${email} | ${phone}</p>
    <h3 class="text-xl font-semibold mt-4">Professional Summary</h3>
    <p>${summary}</p>
    <h3 class="text-xl font-semibold mt-4">Education</h3>
    <div>${educationList}</div>
    <h3 class="text-xl font-semibold mt-4">Work Experience</h3>
    <div>${experienceList}</div>
    <h3 class="text-xl font-semibold mt-4">Skills</h3>
    <p>${skills}</p>
        `;

        document.getElementById('resume-preview').innerHTML = previewHTML;
    }

    // Add event listener to update resume preview when data changes
    document.querySelectorAll('#resume-form input, #resume-form textarea').forEach(input => {
        input.addEventListener('input', updateResumePreview);
    });

    // Event listener for the "Save Data" button
    document.getElementById('save-data').addEventListener('click', function () {
        const resumeData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            summary: document.getElementById('summary').value,
            education: document.getElementById('education-list').innerHTML,
            experience: document.getElementById('experience-list').innerHTML,
            skills: document.getElementById('skills').value
        };

        // Convert the data to a JSON string
        const jsonData = JSON.stringify(resumeData, null, 2);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a link to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume_data.json'; // Set the file name
        a.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);

        alert('Resume data has been saved to your device.');
    });

    // Function to update resume preview on load
    updateResumePreview();
});


