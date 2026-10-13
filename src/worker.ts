import { handle as astroHandler } from '@astrojs/cloudflare/handler';
import { createAgentContentWorker } from './lib/agent-content/runtime';
import { createAgentApiWorker } from './lib/agent-api/runtime';
import { createAgentMcpWorker } from './lib/agent-mcp/runtime';

const fetch = createAgentMcpWorker(createAgentApiWorker(createAgentContentWorker(astroHandler)));

export default { fetch };
