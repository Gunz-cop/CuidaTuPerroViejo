import { handle as astroHandler } from '@astrojs/cloudflare/handler';
import { createAgentContentWorker } from './lib/agent-content/runtime';
import { createAgentApiWorker } from './lib/agent-api/runtime';

const fetch = createAgentApiWorker(createAgentContentWorker(astroHandler));

export default { fetch };
