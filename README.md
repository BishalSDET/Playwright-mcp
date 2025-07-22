# Playwright-mcp
Clone the repository or download the code and import in your IDE
run npm install command to download all the node module dependency
run npx playwright install to download the browsers required for automation
install playwright mcp server from this link https://github.com/microsoft/playwright-mcp
Add below configuration in your settings.json file to work with mcp server
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
**Key Features**
Vibe coding on top of the context file which helps to run test cases with plain user inputs
LLM-friendly. No vision models needed, operates purely on structured data.
LLM+ Playwright MCP server helps to run your tests on browser and also debug real time 
