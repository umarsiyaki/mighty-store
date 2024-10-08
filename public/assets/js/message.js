
document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("message-form");
  const messageContent = document.getElementById("messageContent");
  const messageContainer = document.getElementById("message-container");
  const messageCount = document.getElementById("message-count");
  const notificationCount = document.getElementById("notification-count");

  // Sample data to simulate fetching messages from the server
  const messages = [
      { content: "Order #1234 has been confirmed.", sender: "Admin", timestamp: "2023-07-31 12:45" },
      { content: "New product added to the inventory.", sender: "Cashier", timestamp: "2023-07-31 13:00" },
  ];

  // Function to display messages
  function displayMessages() {
      messageContainer.innerHTML = "";
      messages.forEach(message => {
          const messageElement = document.createElement("div");
          messageElement.classList.add("message-item");
          messageElement.innerHTML = `
              <div class="message-header">
                  <strong>${message.sender}</strong> <span class="text-muted">${message.timestamp}</span>
              </div>
              <div class="message-body">
                  ${message.content}
              </div>
          `;
          messageContainer.appendChild(messageElement);
      });
      updateMessageCount();
  }

  // Function to update message count
  function updateMessageCount() {
      messageCount.textContent = messages.length;
  }

  // Add event listener to the message form
  messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newMessage = {
          content: messageContent.value,
          sender: "User", // Change to the actual user
          timestamp: new Date().toLocaleString()
      };
      messages.push(newMessage);
      displayMessages();
      messageContent.value = "";
  });

  // Initial display of messages
  displayMessages();
});


document.addEventListener('DOMContentLoaded', function () {
    // Load messages from local storage
    loadMessages();

    // Handle message form submission
    document.getElementById('message-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get recipient and message content
        const recipient = document.getElementById('recipient').value;
        const messageContent = document.getElementById('messageContent').value;

        // Validate inputs
        if (recipient.trim() === '' || messageContent.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Create a new message object
        const message = {
            recipient: recipient,
            content: messageContent,
            timestamp: new Date().toLocaleString(),
        };

        // Save the message to local storage
        saveMessage(message);

        // Clear form inputs
        document.getElementById('recipient').value = '';
        document.getElementById('messageContent').value = '';

        // Notify user
        alert('Message sent successfully.');
    });
});

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    loadMessages();
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageContainer = document.getElementById('message-container');
    const messageCount = document.getElementById('message-count');

    messageContainer.innerHTML = '';

    messages.forEach((message, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-item', 'bg-dark', 'text-white', 'p-3', 'mb-3', 'rounded');
        messageElement.innerHTML = `
            <h5 class="mb-1">To: ${message.recipient}</h5>
            <p class="mb-1">${message.content}</p>
            <small class="text-muted">${message.timestamp}</small>
        `;
        messageContainer.appendChild(messageElement);
    });

    messageCount.textContent = messages.length;
}

document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages-container');
    const messageForm = document.getElementById('message-form');
    const messageContent = document.getElementById('message-content');

    // Fetch and display messages
    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            const messages = await response.json();
            messagesContainer.innerHTML = '';
            messages.forEach(message => {
                const div = document.createElement('div');
                div.textContent = message.content;
                messagesContainer.appendChild(div);
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Handle form submission
    messageForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const content = messageContent.value;

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                messageContent.value = '';
                fetchMessages(); // Refresh the messages list
            } else {
                console.error('Error adding message');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Initial fetch of messages when the page loads
    fetchMessages();
});
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Assuming you have a Message model (import it here)
// const Message = require('./models/Message');

// Serve the static files from the React app (build folder)
app.use(express.static(path.join(__dirname, 'client/build')));

// POST route to add new cashier
app.post('/api/addCashier', (req, res) => {
  const { username, email, phoneNumber, address, password } = req.body;
  // Implement logic to add cashier to the database
  res.send('Cashier added successfully');
});

// Example route to update product details
app.put('/api/updateProduct/:productId', (req, res) => {
  const productId = req.params.productId;
  const { name, size, category, price, quantity } = req.body;
  // Implement logic to update product in the database
  res.send('Product updated successfully');
});

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Post a new message
app.post('/api/messages', async (req, res) => {
  try {
    const { content } = req.body;
    const newMessage = new Message({ content, createdAt: new Date() });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// The "catchall" handler: for any request that doesn't match any route, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});