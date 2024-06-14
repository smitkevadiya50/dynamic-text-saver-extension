document.addEventListener('DOMContentLoaded', () => {
    const linkContainer = document.getElementById('linkContainer');
    const addRowButton = document.getElementById('addRowButton');
    const saveButton = document.getElementById('saveButton');

    // Function to add a new row
    function addNewRow(value = '') {
        const row = document.createElement('div');
        row.className = 'link-row';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.placeholder = 'Enter your link';

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-button';
        copyButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior to avoid form submission
            input.select();
            document.execCommand('copy');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            linkContainer.removeChild(row);
        });

        row.appendChild(input);
        row.appendChild(copyButton);
        row.appendChild(deleteButton);
        linkContainer.appendChild(row);
    }

    // Function to save data to chrome.storage
    function saveData() {
        const links = [];
        document.querySelectorAll('#linkContainer input').forEach(input => {
            links.push(input.value);
        });
        chrome.storage.local.set({ links }, () => {
            console.log('Links saved');
        });
    }

    // Function to load data from chrome.storage
    function loadData() {
        chrome.storage.local.get('links', (data) => {
            if (data.links) {
                data.links.forEach(link => addNewRow(link));
            } else {
                addNewRow(); // Add an initial empty row if no data is found
            }
        });
    }

    // Event listener for adding new row
    addRowButton.addEventListener('click', () => {
        addNewRow();
    });

    // Event listener for saving data
    saveButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior to avoid form submission
        saveData();
    });

    // Load data on initial load
    loadData();
});
