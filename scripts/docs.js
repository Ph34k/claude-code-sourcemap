const fs = require('fs');
const path = require('path');

const context = {
  "requesting_agent": "documentation-engineer",
  "request_type": "get_documentation_context",
  "payload": {
    "query": "Documentation context needed: project type, target audience, existing docs, API structure, update frequency, and team workflows."
  }
};

console.log(JSON.stringify(context, null, 2));
