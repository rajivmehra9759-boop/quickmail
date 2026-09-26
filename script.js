let currentEmail = "";

async function generateEmail() {

    const response = await fetch("/api/new-email");

    const data = await response.json();

    currentEmail = data.email;

    document.getElementById("email").value =
        currentEmail;

    document.getElementById("inbox").innerHTML =
        "<p>Inbox is ready. Waiting for messages...</p>";
}


function copyEmail() {

    if (!currentEmail) {

        alert("First generate an email.");

        return;
    }

    navigator.clipboard.writeText(currentEmail);

    alert("Email copied!");
}


async function refreshInbox() {

    if (!currentEmail) {

        alert("First generate an email.");

        return;
    }

    const response =
        await fetch(`/api/inbox/${currentEmail}`);

    const messages =
        await response.json();

    const inbox =
        document.getElementById("inbox");

    if (messages.length === 0) {

        inbox.innerHTML =
            "<p>No messages yet.</p>";

        return;
    }

    inbox.innerHTML =
        messages.map(message => `
            <div>
                <h3>${message.subject}</h3>
                <p>${message.from}</p>
                <p>${message.text}</p>
            </div>
        `).join("");
}