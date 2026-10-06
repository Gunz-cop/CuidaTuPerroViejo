import { handle as astroHandler } from '@astrojs/cloudflare/handler';
import { createAgentContentWorker } from './lib/agent-content/runtime';

const fetch = createAgentContentWorker(astroHandler);

export default { fetch };
