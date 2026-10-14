const ze="modulepreload",Ye=function(e){return"/"+e},ke={},Je=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){let i=function(a){return Promise.all(a.map(u=>Promise.resolve(u).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");o=i(n.map(a=>{if(a=Ye(a),a in ke)return;ke[a]=!0;const u=a.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${c}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":ze,u||(m.as="script"),m.crossOrigin="",m.href=a,d&&m.setAttribute("nonce",d),document.head.appendChild(m),u)return new Promise((b,y)=>{m.addEventListener("load",b),m.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${a}`)))})}))}function r(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return o.then(i=>{for(const l of i||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})},Xe=["imperative_api","declarative_html","both"];function Qe(e){return typeof e=="string"&&Xe.includes(e)}function et(e){if(typeof e!="object"||e===null)return null;const t=e;return typeof t.name!="string"||t.name===""?null:{name:t.name,...typeof t.title=="string"?{title:t.title}:{},...typeof t.description=="string"?{description:t.description}:{},...typeof t.hasSchema=="boolean"?{hasSchema:t.hasSchema}:{}}}function tt(e){if(!e||!Array.isArray(e.tools))return null;const t=e.tools.map(et).filter(s=>s!==null);return t.length===0?null:{toolCount:typeof e.toolCount=="number"?e.toolCount:t.length,tools:t,...Qe(e.detectionMethod)?{detectionMethod:e.detectionMethod}:{}}}function nt(e){const t=tt(e);if(!t)return null;const n=t.tools.slice(0,50).map(s=>{const o=s.description??s.title;return{name:s.name,...o?{description:o}:{}}});return{total:t.tools.length,rows:n,remaining:t.tools.length-n.length}}const st="excluded by scan configuration",ot="scanner.checkExcluded";function rt(e){return e.messageRef?e.messageRef.code===ot:e.message?.toLowerCase().includes(st)===!0}function ie(e){const t=e.trim();try{const n=/^https?:\/\//i.test(t)?t:`https://${t}`,s=new URL(n);s.username="",s.password="",s.hash="";const o=s.toString(),r=s.protocol==="https:"&&s.pathname==="/"&&!s.search;return{scanUrl:o,pathSegment:r?s.host:o}}catch{return{scanUrl:t,pathSegment:t}}}function at(e){return`/${encodeURIComponent(e)}`}function Ue(e){const t=e.replace(/^\/+/,"");if(!t)return null;try{return decodeURIComponent(t)}catch{return null}}function it(e,t){const n=s=>s.replace(/\/+$/,"");return n(e)===n(t)}function we(){try{const e=localStorage.getItem("theme");if(e==="light"||e==="dark"||e==="system")return e}catch{}return"system"}function $e(e){const t=document.documentElement;e==="system"?t.removeAttribute("data-theme"):t.setAttribute("data-theme",e),t.setAttribute("data-theme-pref",e);try{localStorage.setItem("theme",e)}catch{}}function ct(){const e=document.getElementById("theme-toggle");if(!e)return;const t=["light","dark","system"],n={light:"Light mode — click for dark",dark:"Dark mode — click for system",system:"System mode — click for light"};function s(r){e.setAttribute("aria-label",n[r]),e.setAttribute("title",n[r])}e.addEventListener("click",()=>{const r=we(),i=(t.indexOf(r)+1)%t.length,l=t[i];$e(l),s(l)});const o=we();$e(o),s(o)}function lt(){const e=document.documentElement.getAttribute("data-theme");return e==="dark"||e==="light"?e:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}ct();const me=["robotsTxt","sitemap","linkHeaders","dnsAid","markdownNegotiation","robotsTxtAiRules","contentSignals","webBotAuth","apiCatalog","oauthDiscovery","oauthProtectedResource","authMd","mcpServerCard","a2aAgentCard","agentSkills","webMcp","ard","x402","mpp","ucp","acp","ap2"],Me=new Set(["a2aAgentCard","ap2"]),ge=me.filter(e=>!Me.has(e)),O={all:{name:"All Checks",description:"Run all default checks — best for comprehensive audits",checks:new Set(ge)},content:{name:"Content Site",description:"Blog, docs, or marketing site — focuses on discoverability and content accessibility",checks:new Set(["robotsTxt","sitemap","linkHeaders","dnsAid","markdownNegotiation","robotsTxtAiRules","contentSignals"])},apiApp:{name:"API / Application",description:"API service or web app — all checks except commerce",checks:new Set(["robotsTxt","sitemap","linkHeaders","dnsAid","markdownNegotiation","robotsTxtAiRules","contentSignals","webBotAuth","apiCatalog","oauthDiscovery","oauthProtectedResource","authMd","mcpServerCard","agentSkills","webMcp","ard"])}},dt={robotsTxt:"robots.txt",sitemap:"Sitemap",linkHeaders:"Link headers",dnsAid:"DNS for AI Discovery (DNS-AID)",markdownNegotiation:"Markdown Negotiation",robotsTxtAiRules:"AI bot rules in robots.txt",contentSignals:"Content Signals in robots.txt",webBotAuth:"Web Bot Auth request signing",oauthDiscovery:"OAuth / OIDC discovery",oauthProtectedResource:"OAuth Protected Resource",authMd:"Auth.md agent registration",mcpServerCard:"MCP Server Card",a2aAgentCard:"A2A Agent Card",agentSkills:"Agent Skills index",apiCatalog:"API Catalog",webMcp:"WebMCP",ard:"ARD (Agentic Resource Discovery)",ucp:"Universal Commerce Protocol",x402:"x402 Protocol",mpp:"MPP (Machine Payment Protocol)",acp:"ACP (Agentic Commerce Protocol)"},k=`${window.location.origin}/.well-known/agent-skills`,ut={robotsTxt:{description:"Publish /robots.txt with clear crawl rules",specUrls:["https://www.rfc-editor.org/rfc/rfc9309"],prompt:"Create /robots.txt at the site root with explicit User-agent directives and allow/disallow rules for key paths. Ensure it is plain text and returns 200.",skillUrl:`${k}/robots-txt/SKILL.md`},robotsTxtAiRules:{description:"Add User-agent rules for AI crawlers like OAI-SearchBot, Claude-SearchBot, GPTBot, and ClaudeBot",specUrls:["https://www.rfc-editor.org/rfc/rfc9309","https://developers.cloudflare.com/ai-crawl-control/"],prompt:"Add explicit User-agent entries for AI crawlers with allow/disallow rules that match your policy. Search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot) fetch the pages AI assistants use in their answers, so blocking them affects whether you appear in AI answers. Training crawlers (GPTBot, ClaudeBot, Google-Extended) collect model training data; blocking them does not affect whether your pages appear in AI search results.",skillUrl:`${k}/ai-rules/SKILL.md`},contentSignals:{description:"Declare AI content usage preferences with Content Signals in robots.txt",specUrls:["https://contentsignals.org/","https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/"],prompt:`Add Content-Signal directives to your robots.txt declaring preferences for ai-train, search, and ai-input. For example:
Content-Signal: ai-train=no, search=yes, ai-input=no`,skillUrl:`${k}/content-signals/SKILL.md`},sitemap:{description:"Publish a sitemap and reference it from robots.txt",specUrls:["https://www.sitemaps.org/protocol.html"],prompt:"Generate /sitemap.xml listing canonical URLs, keep it updated on publish, and reference it from /robots.txt.",skillUrl:`${k}/sitemap/SKILL.md`},markdownNegotiation:{description:"Return HTML responses as markdown when agents request it",specUrls:["https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/"],prompt:"Enable Markdown for Agents so requests with Accept: text/markdown return a markdown version of your HTML response while HTML stays the default for browsers. Confirm the response uses Content-Type: text/markdown (and x-markdown-tokens if available).",skillUrl:`${k}/markdown-negotiation/SKILL.md`},webBotAuth:{description:"Let your site identify itself as a bot with Web Bot Auth",specUrls:["https://datatracker.ietf.org/wg/webbotauth/about/","https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/"],prompt:"Publish a JWKS at /.well-known/http-message-signatures-directory so your site can identify itself when it sends bot or agent requests. Receiving sites can use it to verify those signed requests.",skillUrl:`${k}/web-bot-auth/SKILL.md`},oauthDiscovery:{description:"Publish OAuth/OIDC discovery metadata so agents can authenticate with your APIs",specUrls:["http://openid.net/specs/openid-connect-discovery-1_0.html","https://www.rfc-editor.org/rfc/rfc8414"],prompt:"If your site has protected APIs, publish /.well-known/openid-configuration (for OpenID Connect) or /.well-known/oauth-authorization-server (for pure OAuth 2.0) with your issuer, authorization_endpoint, token_endpoint, jwks_uri, and grant_types_supported. This allows AI agents to programmatically discover how to authenticate.",skillUrl:`${k}/oauth-discovery/SKILL.md`},oauthProtectedResource:{description:"Publish OAuth Protected Resource Metadata so agents can discover how to authenticate",specUrls:["https://www.rfc-editor.org/rfc/rfc9728"],prompt:"Publish /.well-known/oauth-protected-resource with your resource identifier, authorization_servers (list of OAuth/OIDC issuer URLs that can issue tokens for this resource), and scopes_supported. This tells agents how to obtain access tokens for your protected APIs.",skillUrl:`${k}/oauth-protected-resource/SKILL.md`},authMd:{description:"Publish Auth.md metadata for agent registration",specUrls:["https://workos.com/auth-md","https://github.com/workos/auth.md"],prompt:"Serve /auth.md at the site root with agent registration instructions, publish /.well-known/oauth-protected-resource, and include an agent_auth block in /.well-known/oauth-authorization-server with register_uri, supported identity types, credential types, and claim/revocation URLs where applicable.",skillUrl:`${k}/auth-md/SKILL.md`},mcpServerCard:{description:"Publish an MCP Server Card for agent discovery",specUrls:["https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127"],prompt:"Serve an MCP Server Card (SEP-1649) at /.well-known/mcp/server-card.json with serverInfo (name, version), transport endpoint, and capabilities. The schema is being standardized at https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127",skillUrl:`${k}/mcp-server-card/SKILL.md`},a2aAgentCard:{description:"Publish an A2A Agent Card for agent-to-agent discovery",specUrls:["https://a2a-protocol.org/latest/specification/","https://a2a-protocol.org/latest/topics/agent-discovery/"],prompt:"Serve an A2A Agent Card (JSON) at /.well-known/agent-card.json describing your agent. Include name, version, description, supportedInterfaces (with service URL and transport protocol), capabilities, and skills (each with id, name, description). This enables other AI agents to discover and interact with your agent via the A2A protocol.",skillUrl:`${k}/a2a-agent-card/SKILL.md`},agentSkills:{description:"Publish an agent skills discovery index",specUrls:["https://github.com/cloudflare/agent-skills-discovery-rfc","https://agentskills.io/"],prompt:"Publish a skills discovery index at /.well-known/agent-skills/index.json (per the Agent Skills Discovery RFC v0.2.0). Include a $schema field, and a skills array where each entry has name, type, description, url, and a sha256 digest.",skillUrl:`${k}/agent-skills/SKILL.md`},apiCatalog:{description:"Publish an API catalog for automated API discovery (RFC 9727)",specUrls:["https://www.rfc-editor.org/rfc/rfc9727","https://www.rfc-editor.org/rfc/rfc9264"],prompt:'Create /.well-known/api-catalog returning application/linkset+json with a "linkset" array. Each entry should include an "anchor" URL for the API and link relations for service-desc (OpenAPI spec), service-doc (documentation), and status (health endpoint). See RFC 9727 Appendix A for examples.',skillUrl:`${k}/api-catalog/SKILL.md`},ucp:{description:"Enable content payments via Universal Commerce Protocol",specUrls:["https://ucp.dev/specification/overview/"],prompt:"Serve /.well-known/ucp with protocol version, services, capabilities, and endpoints, and ensure spec URLs and schemas are reachable.",skillUrl:`${k}/ucp/SKILL.md`},x402:{description:"Support x402 protocol for agent-native HTTP payments",specUrls:["https://x402.org","https://github.com/coinbase/x402","https://docs.x402.org"],prompt:"Add x402 payment middleware to your API routes to enable AI agents to pay for access via HTTP. Use @x402/express, @x402/hono, or @x402/next middleware with a facilitator URL and wallet address. Protected routes will return HTTP 402 with payment requirements that agents can fulfill automatically.",skillUrl:`${k}/x402/SKILL.md`},mpp:{description:"Support MPP (Machine Payment Protocol) for agent-native HTTP payments",specUrls:["https://mpp.dev","https://paymentauth.org/draft-payment-discovery-00.txt"],prompt:"Publish an OpenAPI document at /openapi.json with x-payment-info extensions on payable operations. Each operation should declare intent (charge or session), method (tempo, stripe, lightning, card), amount, and currency. Use the MPP SDK (mppx for TypeScript, pympp for Python) with framework middleware for Hono, Express, Next.js, or Elysia to add MPP payment handling.",skillUrl:`${k}/mpp/SKILL.md`},acp:{description:"Publish ACP discovery metadata so agents can discover your commerce API",specUrls:["https://agenticcommerce.dev","https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md"],prompt:'Serve /.well-known/acp.json at the origin root with protocol.name "acp", protocol.version, api_base_url, supported transports, and capabilities.services so agents can discover your ACP implementation without creating a checkout session first.',skillUrl:`${k}/acp/SKILL.md`},webMcp:{description:"Support WebMCP to expose site tools to AI agents via the browser",specUrls:["https://webmachinelearning.github.io/webmcp/","https://github.com/webmachinelearning/webmcp/blob/main/declarative-api-explainer.md"],prompt:"Implement the WebMCP API by calling document.modelContext.registerTool() for each tool that exposes your site's key actions to AI agents. Each tool needs a name, description, inputSchema (JSON Schema), and an execute callback function; registerTool() returns a Promise. Pass an AbortSignal in the options to unregister tools when no longer needed. For existing HTML forms, add toolname and tooldescription attributes to the <form> and toolparamdescription to its inputs to expose them declaratively.",skillUrl:`${k}/webmcp/SKILL.md`},ard:{description:"Publish an ARD (Agentic Resource Discovery) manifest so agents can discover your site's capabilities (MCP servers, A2A agents, OpenAPI schemas, and more)",specUrls:["https://agenticresourcediscovery.org/","https://github.com/ards-project/ard-spec","https://github.com/Agent-Card/ai-catalog"],prompt:'Serve /.well-known/ai-catalog.json at the origin root with Content-Type: application/json and Access-Control-Allow-Origin: *. Include specVersion, a host object, and an entries array. Give each entry a urn:air:<your-domain>:<namespace>:<name> identifier, a displayName, an IANA media type in "type", and exactly one of url or data. Add 2-5 representativeQueries per entry so registries can build semantic embeddings.',skillUrl:`${k}/ard/SKILL.md`},linkHeaders:{description:"Include Link response headers for agent discovery (RFC 8288)",specUrls:["https://www.rfc-editor.org/rfc/rfc8288","https://www.rfc-editor.org/rfc/rfc9727#section-3"],prompt:'Add Link response headers to your homepage that point agents to useful resources. For example: Link: </.well-known/api-catalog>; rel="api-catalog" to advertise your API catalog, or Link: </docs/api>; rel="service-doc" for API documentation. See RFC 8288 for the Link header format and IANA Link Relations for registered relation types.',skillUrl:`${k}/link-headers/SKILL.md`},dnsAid:{description:"Publish DNS for AI Discovery (DNS-AID) records for DNS-based agent discovery",specUrls:["https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/","https://www.rfc-editor.org/rfc/rfc9460"],prompt:"Publish DNS for AI Discovery (DNS-AID) records under your domain, for example _index._agents.example.com or _a2a._agents.example.com, using ServiceMode SVCB/HTTPS records with alpn and endpoint parameters. Sign the public discovery zone with DNSSEC so validating resolvers return authenticated data.",skillUrl:`${k}/dns-aid/SKILL.md`}},ce=document.getElementById("scan-form"),D=document.getElementById("url-input"),fe=document.getElementById("scan-button"),pt=fe.querySelector(".button-text"),ht=fe.querySelector(".button-loading"),le=document.getElementById("form-error"),I=document.getElementById("results"),F=document.getElementById("results-timestamp"),De=document.getElementById("score-card-container"),Be=document.getElementById("check-categories"),mt=document.getElementById("scan-another"),V=document.getElementById("info-cards"),ne=document.getElementById("copy-all-fab"),j=document.getElementById("customize-toggle"),de=document.getElementById("customize-panel"),_e=document.getElementById("profile-pills"),xe=document.getElementById("profile-description"),ue=document.getElementById("checks-grid");let Oe=!1,Se=!1,T="all",x=null;function Ce(e){Oe=e,fe.disabled=e,D.disabled=e,pt.hidden=e,ht.hidden=!e}function pe(e){le.textContent=e,le.hidden=!1}function gt(){le.hidden=!0}function Ne(){return x?[...x]:[...O[T].checks]}function he(){const e=x||O[T].checks;ue.querySelectorAll('input[name="check"]').forEach(t=>{t.checked=e.has(t.value)})}function X(){_e.querySelectorAll(".profile-pill").forEach(e=>{const t=e.dataset.profile,n=!x&&t===T;e.classList.toggle("profile-pill--active",n),e.setAttribute("aria-checked",String(n))}),x?xe.textContent=`Custom selection — ${x.size} of ${ge.length} checks enabled`:xe.textContent=O[T].description}j.addEventListener("click",()=>{const e=j.getAttribute("aria-expanded")==="true";j.setAttribute("aria-expanded",String(!e)),de.hidden=e});_e.addEventListener("click",e=>{const t=e.target.closest(".profile-pill");if(!t)return;const n=t.dataset.profile;!n||!(n in O)||(T=n,x=null,he(),X(),Fe())});ue.addEventListener("change",e=>{if(e.target.name!=="check")return;const n=new Set;ue.querySelectorAll('input[name="check"]:checked').forEach(o=>{n.add(o.value)});let s=null;for(const[o,r]of Object.entries(O))if(n.size===r.checks.size&&[...n].every(i=>r.checks.has(i))){s=o;break}s?(T=s,x=null):x=n,X(),Fe()});function qe(e){const t=new Date(e);return`Last scanned ${t.toLocaleDateString()} at ${t.toLocaleTimeString()}`}function ft(e){return Me.has(e)?(x||O[T].checks).has(e):!0}function je(e){return Object.fromEntries(Object.entries(e).filter(([t])=>{const n=me.find(s=>s===t);return n?ft(n):!0}))}function Q(e){return e.total===0&&e.checkCount>0}function vt(e,t){const n=[{name:"discoverability",checks:e.discoverability,countInScore:!0},{name:"contentAccessibility",checks:e.contentAccessibility,countInScore:!0},{name:"botAccessControl",checks:e.botAccessControl,countInScore:!0},{name:"discovery",checks:e.discovery,countInScore:!0},{name:"commerce",checks:e.commerce,countInScore:!1}];let s=0,o=0;const r=n.map(({name:l,checks:d,countInScore:a})=>{const u=je(d),c=Object.values(u),m=c.filter(p=>p.status==="pass").length,b=c.filter(p=>p.status==="neutral").length,y=c.length-b;return a&&(s+=m,o+=y),{name:l,score:y>0?Math.round(m/y*100):0,passed:m,total:y,checkCount:c.length}}),i=o>0?Math.round(s/o*100):0;return{categories:r,overall:i}}function K(e){return e>=90?"var(--color-score-good)":e>=50?"var(--color-score-average)":"var(--color-score-poor)"}const ve={discoverability:"Discoverability",contentAccessibility:"Content",botAccessControl:"Bot Access Control",discovery:"API, Auth, MCP & Skill Discovery",commerce:"Commerce"},Ae={0:"var(--color-level-0)",1:"var(--color-level-1)",2:"var(--color-level-2)",3:"var(--color-level-3)",4:"var(--color-level-4)",5:"var(--color-level-5)"};function yt(e,t){const m=180-12*(t.length-1),b=t.reduce((v,$)=>v+$.checkCount,0),y=v=>v*Math.PI/180,p=v=>({x:120+95*Math.cos(y(v)),y:125-95*Math.sin(y(v))}),f=(v,$)=>{if(Math.abs(v-$)<.5)return"";const A=p(v),L=p($),_=Math.abs(v-$)>180?1:0,H=v>$?1:0;return`M ${A.x.toFixed(2)} ${A.y.toFixed(2)} A 95 95 0 ${_} ${H} ${L.x.toFixed(2)} ${L.y.toFixed(2)}`},w=f(180,0),g=180*(e/100),S=f(180,180-g),C=K(e),B=`
      <g class="gauge-combined">
        <path 
          class="combined-bg"
          d="${w}"
          fill="none"
          stroke="var(--color-gauge-bg)"
          stroke-width="16"
          stroke-linecap="round"
        />
        ${S?`
        <path 
          class="combined-fill"
          d="${S}"
          fill="none"
          stroke="${C}"
          stroke-width="16"
          stroke-linecap="round"
        />
        `:""}
      </g>
    `;let E=180;const R=`<g class="gauge-segmented">${t.map((v,$)=>{const A=b>0?v.checkCount/b:1/t.length,L=m*A,_=Q(v),H=E,G=E-L,z=f(H,G);let U;if(_)U=`
          <g class="segment-group segment-group--skipped" data-index="${$}">
            <path 
              class="segment-bg"
              d="${z}"
              fill="none"
              stroke="var(--color-gauge-bg)"
              stroke-width="16"
              stroke-linecap="round"
              stroke-dasharray="6 4"
            />
          </g>
        `;else{const q=v.score/100,Ke=L*q,Ve=H-Ke,Ze=K(v.score),be=q>.02?f(H,Ve):"";U=`
          <g class="segment-group" data-index="${$}">
            <path 
              class="segment-bg"
              d="${z}"
              fill="none"
              stroke="var(--color-gauge-bg)"
              stroke-width="16"
              stroke-linecap="round"
            />
            ${be?`
            <path 
              class="segment-fill"
              data-category="${v.name}"
              data-score="${v.score}"
              d="${be}"
              fill="none"
              stroke="${Ze}"
              stroke-width="16"
              stroke-linecap="round"
            />
            `:""}
          </g>
        `}return E=G-12,U}).join("")}</g>`,N=K(e),oe=t.map((v,$)=>{const A=ve[v.name]||v.name,L=Q(v),_=L?`${A} (not checked)`:A;return`<span class="gauge-category-label${L?" gauge-category-label--skipped":""}" data-index="${$}">${_}</span>`}).join("");return`
      <div class="segmented-gauge" data-highlight="">
        <svg 
          width="240" 
          height="140" 
          viewBox="0 0 240 140" 
          class="gauge-svg"
          role="img"
          aria-label="Overall score: ${e} out of 100"
        >
          ${B}
          ${R}
        </svg>
        <div class="gauge-score-container">
          <span class="gauge-score" style="color: ${N};">${e}</span>
          <div class="gauge-category-labels">${oe}</div>
        </div>
      </div>
    `}function Ee(e,t,n,s){const r=(t-6)/2,i=2*Math.PI*r,l=i*(1-e/100),d=K(e),a=t/2;return`
      <div class="circle-gauge-item${n?"":" circle-gauge-item--inline"}">
        <div class="circle-gauge" style="width: ${t}px; height: ${t}px;">
          <svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}" class="circle-gauge-svg" aria-hidden="true">
            <circle
              class="circle-gauge-track"
              cx="${a}"
              cy="${a}"
              r="${r}"
              fill="none"
              stroke="var(--color-gauge-bg)"
              stroke-width="6"
            />
            <circle
              class="circle-gauge-fill"
              cx="${a}"
              cy="${a}"
              r="${r}"
              fill="none"
              stroke="${d}"
              stroke-width="6"
              stroke-linecap="round"
              stroke-dasharray="${i.toFixed(2)}"
              stroke-dashoffset="${l.toFixed(2)}"
              style="--gauge-circumference: ${i.toFixed(2)}; --gauge-dash-offset: ${l.toFixed(2)};"
            />
            <text
              class="circle-gauge-score"
              x="${a}"
              y="${a}"
              text-anchor="middle"
              dominant-baseline="central"
              fill="${d}"
              font-size="1.25rem"
              font-weight="700"
              font-family="var(--font-sans)"
            >${e}</text>
          </svg>
        </div>
        ${n?`<span class="circle-gauge-label">${h(n)}</span>`:""}
        ${s?`<span class="circle-gauge-sublabel">${h(s)}</span>`:""}
      </div>
    `}function Le(e,t){const s=(e-6)/2,o=e/2;return`
      <div class="circle-gauge-item">
        <div class="circle-gauge" style="width: ${e}px; height: ${e}px;">
          <svg width="${e}" height="${e}" viewBox="0 0 ${e} ${e}" class="circle-gauge-svg" aria-hidden="true">
            <circle
              class="circle-gauge-track"
              cx="${o}"
              cy="${o}"
              r="${s}"
              fill="none"
              stroke="var(--color-gauge-bg)"
              stroke-width="6"
              stroke-dasharray="4 4"
            />
            <text
              class="circle-gauge-score"
              x="${o}"
              y="${o}"
              text-anchor="middle"
              dominant-baseline="central"
              fill="var(--color-neutral)"
              font-size="1.25rem"
              font-weight="700"
              font-family="var(--font-sans)"
            >—</text>
          </svg>
        </div>
        <span class="circle-gauge-label">${h(t)}</span>
        <span class="circle-gauge-sublabel">Not checked</span>
      </div>
    `}function bt(e,t){const n=Ae[e.level]||Ae[0],s=e.targetUrl??e.url,o=t.categories.filter(f=>f.name!=="commerce"),r=o.map((f,w)=>{const g=ve[f.name]||f.name;if(Q(f))return`
          <button class="category-gauge-btn category-gauge-btn--skipped" data-index="${w}" type="button" aria-label="${h(g)}: Not checked">
            ${Le(72,g)}
          </button>
        `;const C=`${f.passed}/${f.total}`;return`
        <button class="category-gauge-btn" data-index="${w}" type="button" aria-label="${g}: ${f.passed}/${f.total}">
          ${Ee(f.score,72,g,C)}
        </button>
      `}).join(""),i=t.categories.find(f=>f.name==="commerce"),l=i&&Q(i),d=i&&i.total>0?`
      <button class="category-gauge-btn category-gauge-btn--optional" data-index="${o.length}" type="button" aria-label="Commerce (Optional): ${i.passed}/${i.total}">
        ${Ee(i.score,72,"Commerce","Optional")}
      </button>
    `:l?`
      <button class="category-gauge-btn category-gauge-btn--skipped" data-index="${o.length}" type="button" aria-label="Commerce: Not checked">
        ${Le(72,"Commerce")}
      </button>
    `:"",a=e.targetRedirectedFrom?`Redirected from ${h(e.targetRedirectedFrom)}. `:"",u=it(s,e.url)?"":`Page checks used the URL above; site-wide checks used <strong>${h(e.url)}</strong>.`,c=a||u?`<p class="origin-note">${a}${u}</p>`:"",m=Ne().length,b=ge.length,p=m<b?`
        <div class="partial-scan-note">
          <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"/>
          </svg>
          Partial scan — ${m} of ${b} checks enabled
        </div>
    `:"";return`
      <div class="score-card">
        <button class="share-card-btn" type="button" aria-label="Share score card" data-url="${h(s)}" data-level="${e.level}" data-level-name="${h(e.levelName)}">
          <svg class="share-card-icon" viewBox="0 0 256 256" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z"/>
          </svg>
          <svg class="share-card-spinner" viewBox="0 0 256 256" fill="currentColor" width="16" height="16" aria-hidden="true" style="display:none;">
            <path d="M236,128a108,108,0,0,1-216,0c0-42.52,24.73-81.34,63-98.9A12,12,0,1,1,93,50.91C63.24,64.57,44,94.83,44,128a84,84,0,0,0,168,0c0-33.17-19.24-63.43-49-77.09A12,12,0,1,1,173,29.1C211.27,46.66,236,85.48,236,128Z"/>
          </svg>
          <span class="share-card-label">Share</span>
        </button>
        <div class="score-header">
          <div class="url-display">
            <span class="url-label">Results for</span>
            <span class="url-value">${h(s)}</span>
            ${c}
          </div>
        </div>
        
        <div class="score-main">
          <div class="overall-score">
            ${yt(t.overall,o)}
          </div>
          
          <div class="level-info">
            <div class="level-badge" style="background-color: ${n};">
              Level ${e.level}
            </div>
            <span class="level-name">${e.levelName}</span>
          </div>
        </div>
        
        ${p}
        
        <div class="category-gauges-row">
          ${r}
          ${d}
        </div>
      </div>
    `}function kt(e){const t={fetch:'<svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/></svg>',parse:'<svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"/></svg>',validate:'<svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>',conclude:'<svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"/></svg>'};let n="";if(e.response){const d=e.response.status;n=`<span class="evidence-status-badge ${d<300?"evidence-status--2xx":d<400?"evidence-status--3xx":d<500?"evidence-status--4xx":"evidence-status--5xx"}">${d}</span>`}let s="";e.finding&&(s=`<div class="evidence-finding"><span class="evidence-dot ${e.finding.outcome==="positive"?"evidence-dot--positive":e.finding.outcome==="negative"?"evidence-dot--negative":"evidence-dot--neutral"}"></span><span class="evidence-finding-text">${h(e.finding.summary)}</span></div>`);const o=e.request?.headers&&Object.keys(e.request.headers).length>0;let r="";o&&(r=`<div class="evidence-section-label">Request</div><table class="evidence-headers">${Object.entries(e.request.headers).map(([a,u])=>`<tr><td class="evidence-header-key">${h(a.toLowerCase())}</td><td class="evidence-header-val">${h(u)}</td></tr>`).join("")}</table>`);let i="";if(e.response?.headers&&Object.keys(e.response.headers).length>0){const d=Object.entries(e.response.headers).map(([u,c])=>`<tr><td class="evidence-header-key">${h(u)}</td><td class="evidence-header-val">${h(c)}</td></tr>`).join("");i=`${o?'<div class="evidence-section-label">Response</div>':""}<table class="evidence-headers">${d}</table>`}let l="";return e.response?.bodyPreview&&(l=`<pre class="evidence-body-preview">${h(e.response.bodyPreview)}</pre>`),`
      <div class="evidence-step evidence-step--${e.action}">
        <div class="evidence-step-header">
          <span class="evidence-step-icon">${t[e.action]||""}</span>
          <span class="evidence-step-label">${h(e.label)}</span>
          ${n}
        </div>
        ${r}
        ${i}
        ${l}
        ${s}
      </div>
    `}function wt(e,t){if(!e||e.length===0)return'<p class="evidence-empty">No audit data available</p>';const n=e.map(kt).join(""),s=typeof t=="number"?`<div class="evidence-timing">Completed in ${t}ms</div>`:"";return`<div class="evidence-timeline">${n}</div>${s}`}function h(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function $t(e){try{const t=new URL(e),n=t.pathname,s=n.match(/\/rfc\/rfc(\d+)/);if(s)return`RFC ${s[1]}`;if(t.hostname==="datatracker.ietf.org")return n.includes("/doc/draft-")?"IETF Draft":n.includes("/wg/")?"IETF Working Group":"IETF";if(t.hostname==="github.com"){if(n.startsWith("/modelcontextprotocol/")){const l=n.match(/\/pull\/(\d+)/);if(l)return`SEP-${l[1]}`}const o=n.match(/\/([^/]+\/[^/]+)\/pull\/(\d+)/);if(o)return`${o[1]} PR #${o[2]}`;const r=n.match(/\/[^/]+\/[^/]+\/(?:blob|tree)\/[^/]+\/(.+)/);if(r){const l=r[1].split("/");return l[l.length-1].replace(/\.[^.]+$/,"")}const i=n.match(/\/([^/]+\/[^/]+)/);if(i)return i[1]}return t.hostname==="developers.cloudflare.com"?"Cloudflare Docs":t.hostname==="openid.net"?"OpenID Spec":t.hostname.replace("www.","")}catch{return e}}function xt(e){const t=nt(e.details);if(!t)return"";const n=t.rows.map(o=>{const r=o.description?`<span class="check-tool-description">${h(o.description)}</span>`:"";return`<li class="check-tool"><code class="check-tool-name">${h(o.name)}</code>${r}</li>`}),s=t.remaining>0?`<p class="check-tool-more">and ${t.remaining} more</p>`:"";return`
      <div class="check-tools-section">
        <span class="check-detail-label">Tools (${t.total})</span>
        <ul class="check-tool-list">${n.join("")}</ul>
        ${s}
      </div>
    `}function St(e,t,n){const s=dt[t]||t,o=ut[t],r=`${e}.${t}`,i=n.status==="pass",l=n.status==="neutral",d=l&&rt(n),a=!i&&!l,u=d?'Skipped (<a href="#scan-form" class="check-skip-link" data-open-customize-scan>customize scan</a>)':"";let c,m,b,y;i?(c="var(--color-pass)",m='<svg viewBox="0 0 256 256" fill="#fff" aria-hidden="true"><path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"/></svg>',b="check-item--pass",y="Pass"):l?(c="var(--color-neutral)",m='<svg viewBox="0 0 256 256" fill="#fff" aria-hidden="true"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"/></svg>',b="check-item--neutral",y=d?"Skipped":"Not applicable"):(c="var(--color-fail)",m='<svg viewBox="0 0 256 256" fill="#fff" aria-hidden="true"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"/></svg>',b="check-item--fail",y="Fail");const p=[];i?(o?.description&&p.push(`Goal: ${o.description}`),n.message&&p.push(`Result: ${n.message}`),o?.specUrls?.length&&p.push(`Docs: ${o.specUrls.join(", ")}`)):d?(o?.description&&p.push(`Goal: ${o.description}`),o?.specUrls?.length&&p.push(`Docs: ${o.specUrls.join(", ")}`)):(o?.description&&p.push(`Goal: ${o.description}`),n.message&&p.push(`${l?"Note":"Issue"}: ${n.message}`),o?.prompt&&p.push(`Fix: ${o.prompt}`),o?.skillUrl&&p.push(`Skill: ${o.skillUrl}`),o?.specUrls?.length&&p.push(`Docs: ${o.specUrls.join(", ")}`));const f=p.join(`

`),w=f.length>0,g=!d&&n.evidence&&n.evidence.length>0,S=d?`<div class="check-skip-meta"><span class="check-skip-note">${u}</span></div>`:"";let C="";if(w){const E=!i&&!d,W='<svg class="copy-button-icon" viewBox="0 0 256 256" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/></svg>',R='<svg viewBox="0 0 256 256" fill="currentColor" width="12" height="12" aria-hidden="true"><path d="M224,104a8,8,0,0,1-16,0V59.31l-66.34,66.35a8,8,0,0,1-11.32-11.32L196.69,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/></svg>',N=[];if(o?.description&&N.push(`<div class="check-detail-row"><dt class="check-detail-label">Goal</dt><dd class="check-detail-value">${h(o.description)}</dd></div>`),n.message){const U=i?"Result":l?"Note":"Issue",q=a?" check-detail-value--fail":l?" check-detail-value--neutral":i?" check-detail-value--pass":"";N.push(`<div class="check-detail-row"><dt class="check-detail-label">${U}</dt><dd class="check-detail-value${q}">${h(n.message)}</dd></div>`)}const oe=N.length>0?`<dl class="check-detail-list">${N.join("")}</dl>`:"",v=i?xt(n):"";let $="";E&&o?.prompt&&($=`
          <div class="check-fix-section">
            <span class="check-detail-label">How to implement</span>
            <div class="check-fix-code">${h(o.prompt)}</div>
          </div>
        `);const A=[];if(o?.specUrls?.length)for(const U of o.specUrls){const q=$t(U);A.push(`<a class="check-link" href="${h(U)}" target="_blank" rel="noopener noreferrer">${h(q)} ${R}</a>`)}o?.skillUrl&&A.push(`<a class="check-link" href="${h(o.skillUrl)}" target="_blank" rel="noopener noreferrer">Skill ${R}</a>`);const L=A.length>0?`<div class="check-links-section"><span class="check-detail-label">Resources</span><div class="check-links">${A.join("")}</div></div>`:"",_=E?`<pre class="check-prompt-text" hidden>${h(f)}</pre>`:"",H=E?`<button class="copy-button" type="button" data-tooltip="Paste into your coding agent to fix this check">${W}<span class="copy-button-label" aria-live="polite">Copy prompt</span></button>`:"",G=g?'<button class="evidence-trigger" type="button" aria-label="View audit details">Audit details <svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/></svg></button>':"",z=H||G?`<div class="check-details-footer">${H}${G}</div>`:"";C=`
        <div class="check-details"${E?" data-prompt":""}>
          ${_}
          ${oe}
          ${v}
          ${$}
          ${L}
          ${z}
        </div>
      `}let B="";return g&&(B=`
        <div class="check-card-back">
          <div class="check-card-back-header">
            <div class="check-item-info">
              <span class="check-icon" style="background-color: ${c};">${m}</span>
              <span class="check-name">${s}</span>
            </div>
          </div>
          <div class="check-card-back-body">
            ${wt(n.evidence,n.durationMs)}
          </div>
          <button class="evidence-back-trigger" type="button" aria-label="Back to results"><svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/></svg> Back</button>
        </div>
      `),`
      <div class="check-card-container" data-check-container>
        <div class="check-card-inner">
          <div class="check-card-front">
            <div class="check-item ${b} ${w?"check-item--expandable":""} ${w&&a?"check-item--expanded":""}" data-check-item data-key="${r}" data-status="${n.status}" ${w?"data-expandable":""}>
              <div class="check-item-header" ${w?'role="button" tabindex="0"':""}>
                <div class="check-item-info">
                  <span class="check-icon" style="background-color: ${c};" role="img" aria-label="${y}">
                    ${m}
                  </span>
                  <span class="check-name">${s}</span>
                </div>
                ${S}
                ${w?'<span class="check-expand-icon"><svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/></svg></span>':""}
              </div>
              ${C}
            </div>
          </div>
          ${B}
        </div>
      </div>
    `}function Ct(e,t,n,s,o){const r=ve[e]||e,i={pass:0,neutral:1,fail:2,unableToCheck:2},l=Object.entries(je(t)).sort(([,c],[,m])=>(i[c.status]??2)-(i[m.status]??2)),d=K(n.score),a=e==="commerce"?' <span class="category-optional">Optional</span>':"";let u="";return e==="commerce"&&(u=o?'<p class="commerce-note">Commerce protocols are emerging standards. These results are shown for informational purposes and do not affect the score.</p>':'<p class="commerce-note">No e-commerce signals were detected on this site. These checks are shown for informational purposes and do not affect the score.</p>'),`
      <section class="category-section" id="category-${s}" data-category="${e}">
        <div class="category-header">
          <div class="category-title-row">
            <h2 class="category-title">${r}${a}</h2>
          </div>
          <span class="category-score" style="color: ${d};">${n.passed}/${n.total}</span>
        </div>
        ${u}
        <div class="checks-list">
          ${l.map(([c,m])=>St(e,c,m)).join("")}
        </div>
      </section>
    `}function At(e){F.textContent=qe(e.scannedAt),F.hidden=!1;const t=e.isCommerce===!0,n=vt(e.checks),r=[{key:"discoverability",checks:e.checks.discoverability},{key:"contentAccessibility",checks:e.checks.contentAccessibility},{key:"botAccessControl",checks:e.checks.botAccessControl},{key:"discovery",checks:e.checks.discovery},{key:"commerce",checks:e.checks.commerce}].map((d,a)=>{const u=n.categories.find(c=>c.name===d.key);return Ct(d.key,d.checks,u,a,t)}).join("");De.innerHTML=bt(e,n),Be.innerHTML=r,Se||(I.addEventListener("keydown",d=>{if(d.key!=="Enter"&&d.key!==" ")return;const a=d.target;if(!(a instanceof Element))return;const u=a.closest(".check-item-header");if(u){const c=u.closest("[data-expandable]");c instanceof HTMLElement&&(d.preventDefault(),c.classList.toggle("check-item--expanded"))}}),I.addEventListener("click",async d=>{const a=d.target;if(!(a instanceof Element))return;if(a.closest(".copy-button")){const c=a.closest(".copy-button"),m=c.closest("[data-prompt]");if(!(m instanceof HTMLElement))return;const b=m.querySelector("pre");if(!(b instanceof HTMLElement))return;const y=b.textContent?.trim();if(!y)return;const p=c.querySelector(".copy-button-label"),f=c.querySelector(".copy-button-icon"),w=p?.textContent??"Copy prompt";try{await navigator.clipboard.writeText(y),c.classList.add("copy-button--copied"),p&&(p.textContent="Copied!"),f&&(f.style.display="none"),setTimeout(()=>{c.classList.remove("copy-button--copied"),p&&(p.textContent=w),f&&(f.style.display="")},2e3)}catch{p&&(p.textContent="Copy failed"),setTimeout(()=>{p&&(p.textContent=w)},1500)}return}if(a.closest(".share-card-btn")){const c=a.closest(".share-card-btn");Tt(c);return}if(a.closest("[data-open-customize-scan]")){if(d.preventDefault(),!j||!de||!ce)return;j.setAttribute("aria-expanded","true"),de.hidden=!1,ce.scrollIntoView({behavior:"smooth",block:"start"}),j.focus({preventScroll:!0});return}if(a.closest(".evidence-trigger")){const c=a.closest("[data-check-container]");c&&i(c,!0);return}if(a.closest(".evidence-back-trigger")){const c=a.closest("[data-check-container]");c&&i(c,!1);return}const u=a.closest(".check-item-header");if(u){const c=u.closest("[data-expandable]");c instanceof HTMLElement&&c.classList.toggle("check-item--expanded")}}),Se=!0);function i(d,a){const u=d.querySelector(".check-card-inner");u&&(a?u.classList.add("flipped"):u.classList.remove("flipped"))}I.hidden=!1,V.hidden=!0,I.scrollIntoView({behavior:"smooth",block:"start"});const l=I.querySelectorAll(".check-item--fail:not(.check-item--pass) [data-prompt] pre").length;ne.hidden=l===0,l>0?(J.textContent=String(l),J.hidden=!1):J.hidden=!0,Et()}function Ie(e){if(e===null)return;const t=document.getElementById(`category-${e}`);t&&t.scrollIntoView({behavior:"smooth",block:"start"})}function Et(){const e=document.querySelector(".segmented-gauge");if(!e)return;const t=e.querySelectorAll(".segment-group"),n=document.querySelectorAll(".category-gauge-btn");t.forEach(s=>{s.addEventListener("mouseenter",()=>{const o=s.getAttribute("data-index");e.setAttribute("data-highlight",o||""),n.forEach(r=>{r.getAttribute("data-index")===o?r.classList.add("category-gauge-btn--active"):r.classList.remove("category-gauge-btn--active")})}),s.addEventListener("mouseleave",()=>{e.setAttribute("data-highlight",""),n.forEach(o=>o.classList.remove("category-gauge-btn--active"))}),s.addEventListener("click",()=>{const o=s.getAttribute("data-index");Ie(o)})}),n.forEach(s=>{const o=s.getAttribute("data-index");s.addEventListener("mouseenter",()=>{e.setAttribute("data-highlight",o||"")}),s.addEventListener("mouseleave",()=>{e.setAttribute("data-highlight","")}),s.addEventListener("click",()=>{Ie(o)})})}function Lt(e){const t=e.httpStatus;return t?t===429?"The site is rate-limiting requests. This is not an agent-readiness issue. Try scanning again later.":t===403?"The site is blocking our scanner. This may be due to WAF rules, bot detection, or IP-based restrictions.":t>=500?"The site appears to be experiencing server errors. This is not an agent-readiness issue. Try scanning again later.":"The site returned an error. This is not an agent-readiness issue. Try scanning again later.":"We couldn't establish a connection to this site. Check that the URL is correct and the site is online."}function It(e){const{siteError:t}=e;F.textContent=qe(e.scannedAt),F.hidden=!1;let n;try{n=new URL(e.url).hostname}catch{n=e.url}let s;t.httpStatus?s=`${h(n)} returned <strong>${t.httpStatus} ${h(t.statusText)}</strong>`:s=`Could not connect to ${h(n)}`;let o="";t.bodyPreview&&(o=`
        <div class="site-error-preview">
          <pre class="site-error-preview-text">${h(t.bodyPreview)}</pre>
        </div>
      `);let r="";t.retryAfter&&(r=`
        <div class="site-error-retry-after">
          The server suggests retrying after: <strong>${h(t.retryAfter)}</strong>
        </div>
      `);let i="";t.cfRay&&(i=`
        <div class="site-error-ray">
          <a href="https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/" target="_blank" rel="noopener noreferrer">Cloudflare Ray ID</a>: <strong>${h(t.cfRay)}</strong>. Site owners can look it up in Security Events to find the rule that blocked or challenged the scan. To allow the scanner, add an exception to that rule for requests from isitagentready.com (<a href="https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.worker.upstream_zone/" target="_blank" rel="noopener noreferrer"><code>cf.worker.upstream_zone</code></a>).
        </div>
      `);const l=Lt(t);Be.innerHTML=`
      <div class="site-error-card">
        <div class="site-error-header">
          <span class="site-error-icon">
            <svg viewBox="0 0 256 256" fill="currentColor" width="24" height="24">
              <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"/>
            </svg>
          </span>
          <div class="site-error-titles">
            <h2 class="site-error-headline">We couldn't scan this site</h2>
            <p class="site-error-subheadline">${s}</p>
          </div>
        </div>
        ${o}
        ${r}
        ${i}
        <p class="site-error-explanation">${h(l)}</p>
        <button class="site-error-retry-btn" type="button" id="retry-scan-btn"><svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"/></svg> Try Again</button>
      </div>
    `;const d=document.getElementById("retry-scan-btn");d&&d.addEventListener("click",()=>{ee(e.targetUrl??e.url)}),De.innerHTML="",I.hidden=!1,V.hidden=!0,I.scrollIntoView({behavior:"smooth",block:"start"})}let Y=!1;async function Tt(e){if(Y)return;Y=!0;const t=document.querySelector(".score-card");if(!t){Y=!1;return}const n='<svg xmlns="http://www.w3.org/2000/svg" width="62" height="29" fill="none" viewBox="-1 -1 62 29" aria-hidden="true"><g><path stroke="#ff4801" d="M47.927 11.725c-.2 0-.397.007-.594.014a.271.271 0 0 0-.094.022.33.33 0 0 0-.214.229l-.846 2.924c-.365 1.257-.23 2.418.383 3.27.563.789 1.498 1.251 2.634 1.305l4.589.276a.41.41 0 0 1 .326.179.44.44 0 0 1 .046.39.58.58 0 0 1-.498.384l-4.768.276c-2.59.118-5.377 2.21-6.355 4.761l-.344.9a.253.253 0 0 0 .225.343H58.84a.435.435 0 0 0 .422-.315 11.69 11.69 0 0 0 .437-3.185c0-6.5-5.266-11.766-11.764-11.766" vectorEffect="non-scaling-stroke"/><path stroke="#ff4801" d="m40.76 26.62.304-1.057c.365-1.258.229-2.418-.384-3.271-.562-.788-1.497-1.25-2.633-1.304l-21.527-.276a.426.426 0 0 1-.34-.18.44.44 0 0 1-.047-.39.581.581 0 0 1 .502-.383l21.727-.276c2.58-.118 5.367-2.21 6.345-4.761l1.24-3.24a.814.814 0 0 0 .035-.43C44.572 4.733 38.925 0 32.172 0c-6.223 0-11.503 4.016-13.399 9.598a6.344 6.344 0 0 0-4.467-1.236 6.367 6.367 0 0 0-5.517 7.91C3.913 16.417 0 20.412 0 25.32c0 .445.032.882.097 1.308a.418.418 0 0 0 .415.362H40.268a.517.517 0 0 0 .491-.376" vectorEffect="non-scaling-stroke"/></g></svg>',s=e.querySelector(".share-card-icon"),o=e.querySelector(".share-card-spinner"),r=e.querySelector(".share-card-label");s&&(s.style.display="none"),o&&(o.style.display=""),r&&(r.textContent="Capturing…"),e.classList.add("share-card-btn--loading");try{const{domToBlob:i}=await Je(async()=>{const{domToBlob:g}=await import("./index.DgVX0TKj.js");return{domToBlob:g}},[]),l=lt()==="dark",d=l?"#1a1a2e":"#ffffff",a=l?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.12)",u=l?"#fffbf5":"#1a1a2e",c=l?"rgba(255,251,245,0.5)":"rgba(26,26,46,0.4)",b=Math.max(t.offsetWidth,700),y=await i(t,{scale:2,backgroundColor:d,width:b,height:(()=>{const g=Math.max(Math.min(t.offsetWidth/b,1),.8),S=Math.round(t.offsetHeight*g),C=150+Math.round((1-g)*100);return Math.max(S+C,660)})(),onCloneNode:g=>{if(!(g instanceof HTMLElement))return;const S=document.createElement("div");S.style.cssText=`display:flex;align-items:center;justify-content:center;gap:12px;padding-bottom:24px;margin-bottom:8px;border-bottom:1px solid ${a}`,S.innerHTML=`${n}<span style="font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;color:${u}">Is Your Site Agent-Ready?</span>`,g.prepend(S);const C=g.querySelector(".share-card-btn");C&&(C.style.display="none");const B=g.querySelector(".gauge-combined"),E=g.querySelector(".gauge-segmented");B&&(B.style.opacity="1"),E&&(E.style.opacity="0");const W=document.createElement("style");W.textContent=`
            .score-card { width: ${b}px !important; padding: 2rem !important; border-radius: 0 !important; border: none !important; overflow: visible !important; }
            .score-header { width: 100% !important; text-align: center !important; }
            .url-display { width: 100% !important; align-items: center !important; }
            .url-value { font-size: 1.125rem !important; }
            .score-main { width: 100% !important; align-items: center !important; }
            .overall-score { width: 100% !important; justify-content: center !important; }
            .level-info { width: 100% !important; align-items: center !important; }
            .level-badge { white-space: nowrap !important; }
            .level-name { font-size: 1.25rem !important; white-space: nowrap !important; }
            .category-gauges-row { width: 100% !important; justify-content: center !important; gap: 2rem !important; border-top: none !important; }
            .category-gauge-btn { padding: 0.5rem !important; }
            .circle-gauge-label { max-width: 120px !important; }
          `,g.prepend(W);const R=document.createElement("div");R.style.cssText=`display:flex;justify-content:center;padding-top:16px;margin-top:8px;border-top:1px solid ${a}`,R.innerHTML=`<span style="font-size:0.8125rem;font-weight:500;color:${c};letter-spacing:0.01em">isitagentready.com</span>`,g.appendChild(R)}}),p=e.dataset.url||"",f=`agent-readiness-${p.replace(/[^a-z0-9]/gi,"-")}.png`,w=new File([y],f,{type:"image/png"});if(navigator.canShare?.({files:[w]})){const g={files:[w],title:"Agent Readiness Scanner"};if(window.matchMedia("(pointer: coarse)").matches){const S=e.dataset.level||"",C=e.dataset.levelName||"";g.text=`${p} scored Level ${S} (${C}) on Cloudflare's Agent Readiness Scanner`,g.url=window.location.href}await navigator.share(g),r&&(r.textContent="Shared!")}else try{await navigator.clipboard.write([new ClipboardItem({"image/png":y})]),r&&(r.textContent="Copied!")}catch{const g=document.createElement("a");g.href=URL.createObjectURL(y),g.download=f,g.click(),URL.revokeObjectURL(g.href),r&&(r.textContent="Downloaded!")}setTimeout(()=>{r&&(r.textContent="Share")},2e3)}catch(i){if(i instanceof DOMException&&i.name==="AbortError"){r&&(r.textContent="Share");return}r&&(r.textContent="Failed"),setTimeout(()=>{r&&(r.textContent="Share")},2e3)}finally{s&&(s.style.display=""),o&&(o.style.display="none"),e.classList.remove("share-card-btn--loading"),Y=!1}}async function ee(e){gt(),I.hidden=!0,Ce(!0);try{const t=Ne();if(t.length===0){pe("Select at least one check");return}const s=await fetch("/api/scan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e,enabledChecks:t})}),o=await s.json();if(!s.ok)throw new Error(o.error||"Scan failed");o.siteError?It(o):At(o)}catch(t){const n=t instanceof Error?t.message:"An error occurred";pe(n)}finally{Ce(!1)}}function te(e){const t=at(e),n=new URLSearchParams;x?n.set("checks",[...x].join(",")):T!=="all"&&n.set("profile",T);const s=n.toString();window.history.replaceState({},"",s?`${t}?${s}`:t)}function Pt(){window.history.replaceState({},"","/")}function Fe(){const e=Ue(window.location.pathname);e&&te(e)}ce.addEventListener("submit",e=>{if(e.preventDefault(),Oe)return;const t=D.value.trim();if(!t){pe("Please enter a URL");return}/^https?:\/\//i.test(t)||(D.value=`https://${t}`);const{scanUrl:n,pathSegment:s}=ie(D.value);te(s),ee(n)});mt.addEventListener("click",()=>{I.hidden=!0,ne.hidden=!0,J.hidden=!0,V.hidden=!1,D.value="",D.focus(),F.textContent="",F.hidden=!0,Pt(),P.hidden||se(),window.scrollTo({top:0,behavior:"smooth"})});const Z=document.getElementById("fix-sheet-backdrop"),P=document.getElementById("fix-sheet"),We=document.getElementById("fix-sheet-close"),Ge=document.getElementById("fix-sheet-prompt"),M=document.getElementById("fix-sheet-copy"),Rt=document.getElementById("fix-sheet-count"),J=document.getElementById("fab-count");function Ht(){const e=I.querySelectorAll(".check-item--fail:not(.check-item--pass) [data-prompt] pre"),t=[];return e.forEach(n=>{const s=n.textContent?.trim();s&&t.push(s)}),{prompts:t,combined:t.join(`

---

`)}}function Ut(){const{prompts:e,combined:t}=Ht();e.length!==0&&(Ge.textContent=t,Rt.textContent=`${e.length} issue${e.length===1?"":"s"} found`,Z.hidden=!1,P.hidden=!1,document.body.style.overflow="hidden",requestAnimationFrame(()=>{Z.classList.add("fix-sheet-visible"),P.classList.add("fix-sheet-visible"),M.focus()}))}let re=!1;function se(){if(P.hidden||re)return;re=!0,Z.classList.remove("fix-sheet-visible"),P.classList.remove("fix-sheet-visible"),document.body.style.overflow="";const e=()=>{Z.hidden=!0,P.hidden=!0,re=!1,ne.focus()},t=setTimeout(e,350);P.addEventListener("transitionend",function n(){clearTimeout(t),e(),P.removeEventListener("transitionend",n)})}ne.addEventListener("click",Ut);We.addEventListener("click",se);Z.addEventListener("click",se);document.addEventListener("keydown",e=>{if(!P.hidden){if(e.key==="Escape"){se();return}if(e.key==="Tab"){const t=[We,M],n=t[0],s=t[t.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),s.focus()):!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),n.focus())}}});M.addEventListener("click",async()=>{const e=Ge.textContent?.trim()??"";if(!e)return;const t=M.querySelector(".fix-sheet-copy-label"),n=M.querySelector(".fix-sheet-copy-icon"),s=M.querySelector(".fix-sheet-check-icon");try{await navigator.clipboard.writeText(e),M.classList.add("fix-sheet-copied"),n&&(n.style.display="none"),s&&(s.style.display="block"),t&&(t.textContent="Copied!"),setTimeout(()=>{M.classList.remove("fix-sheet-copied"),n&&(n.style.display=""),s&&(s.style.display="none"),t&&(t.textContent="Copy all instructions")},2500)}catch{t&&(t.textContent="Copy failed"),setTimeout(()=>{t&&(t.textContent="Copy all instructions")},1500)}});const ye=new URLSearchParams(window.location.search),Te=ye.get("checks"),ae=ye.get("profile");if(Te){const e=Te.split(",").filter(t=>me.includes(t));e.length>0&&(x=new Set(e),he(),X())}else ae&&ae in O&&(T=ae,x=null,he(),X());const Pe=Ue(window.location.pathname);if(Pe){const{scanUrl:e,pathSegment:t}=ie(Pe);D.value=e,te(t),V.hidden=!0,ee(e)}else{const e=ye.get("url");if(e){const{scanUrl:t,pathSegment:n}=ie(e);D.value=t,te(n),V.hidden=!0,ee(t)}}document.querySelectorAll(".faq-header").forEach(e=>{const t=e.nextElementSibling;t.style.height="0px",e.addEventListener("click",()=>{const n=e.getAttribute("aria-expanded")==="true",s=t.querySelector(".faq-content-inner");n?(t.style.height=t.scrollHeight+"px",requestAnimationFrame(()=>{t.style.height="0px"})):(t.style.height=s.offsetHeight+"px",t.addEventListener("transitionend",function o(){e.getAttribute("aria-expanded")==="true"&&(t.style.height="auto"),t.removeEventListener("transitionend",o)})),e.setAttribute("aria-expanded",String(!n))})});const Re=document.querySelector(".hero-title"),He=document.querySelector(".header-title");Re&&He&&new IntersectionObserver(([t])=>{He.classList.toggle("is-visible",!t.isIntersecting)},{threshold:0}).observe(Re);
