var e=null,t=e=>{let t=e,n={};for(let e of t?.required??[]){let r=t?.properties?.[e]?.type;n[e]=r===`number`||r===`integer`?1:r!==`boolean`&&``}return JSON.stringify(n)},n=e=>{if(typeof e==`string`)try{return`string (JSON)\n${JSON.stringify(JSON.parse(e),null,2)}`}catch{return`string\n${e}`}try{return`${typeof e}\n${JSON.stringify(e,null,2)}`}catch{return`${typeof e}\n${String(e)}`}};function r(){if(e){e();return}let r=document.createElement(`div`);r.id=`webmcp-debug`;let i=r.attachShadow({mode:`open`});i.innerHTML=`<style>
  :host { all: initial; }
  * { box-sizing: border-box; font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .wrap { position: fixed; right: 12px; bottom: 12px; z-index: 2147483647; display: grid; gap: 6px; justify-items: end; color: #e8ecf1; }
  .tab { background: #0b5fff; color: #fff; border: 0; border-radius: 999px; padding: 8px 14px; cursor: pointer; font-weight: 700; }
  .panel { width: min(440px, calc(100vw - 24px)); max-height: 70vh; overflow: auto; background: #101418; border: 1px solid #2a323b; border-radius: 8px; padding: 12px; }
  .panel[hidden] { display: none; }
  header { display: flex; gap: 8px; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  header strong { font-size: 13px; }
  .status { color: #9aa7b4; flex: 1; }
  button { cursor: pointer; }
  .refresh, .run { background: #1d2630; color: #e8ecf1; border: 1px solid #34404c; border-radius: 4px; padding: 4px 10px; }
  .run { background: #0b5fff; border-color: #0b5fff; color: #fff; }
  .tool { border-top: 1px solid #2a323b; padding: 10px 0; }
  .tool h4 { margin: 0 0 4px; font-size: 13px; color: #7fb2ff; }
  .tool p { margin: 0 0 6px; color: #c3ccd5; }
  details { margin: 0 0 6px; color: #9aa7b4; }
  pre { margin: 4px 0 0; white-space: pre-wrap; word-break: break-word; background: #0a0d10; border: 1px solid #2a323b; border-radius: 4px; padding: 8px; }
  textarea { width: 100%; min-height: 44px; background: #0a0d10; color: #e8ecf1; border: 1px solid #34404c; border-radius: 4px; padding: 6px; resize: vertical; margin-bottom: 6px; }
  h3 { margin: 10px 0 0; font-size: 12px; color: #9aa7b4; }
  .err { color: #ff8f8f; }
</style>
    <div class="wrap">
      <section class="panel" aria-label="WebMCP debug panel">
        <header><strong>WebMCP debug</strong><span class="status"></span><button class="refresh" type="button">Refresh</button></header>
        <div class="tools"></div>
        <h3>Last result</h3>
        <pre class="out">Nothing run yet.</pre>
      </section>
      <button class="tab" type="button" aria-expanded="true">WebMCP debug</button>
    </div>`,document.body.append(r);let a=e=>i.querySelector(e),o=a(`.panel`),s=a(`.tab`),c=a(`.status`),l=a(`.tools`),u=a(`.out`);s.addEventListener(`click`,()=>{o.hidden=!o.hidden,s.setAttribute(`aria-expanded`,String(!o.hidden))}),a(`.refresh`).addEventListener(`click`,()=>d());let d=async()=>{let e=document.modelContext;if(l.replaceChildren(),!e?.getTools){c.textContent=`no document.modelContext in this browser`;return}let r=[];try{r=await e.getTools()}catch(e){c.textContent=`getTools failed: ${String(e)}`;return}c.textContent=`${r.length} tool${r.length===1?``:`s`} on ${location.pathname.replace(/(.)\/$/,`$1`)}`;for(let i of r){let r=document.createElement(`div`);r.className=`tool`;let a=document.createElement(`h4`);a.textContent=i.name;let o=document.createElement(`p`);o.textContent=i.description??`(no description)`;let s=document.createElement(`details`),c=document.createElement(`summary`);c.textContent=`Input schema and annotations`;let d=document.createElement(`pre`);d.textContent=JSON.stringify({inputSchema:i.inputSchema,annotations:i.annotations},null,2),s.append(c,d);let f=document.createElement(`textarea`);f.value=t(i.inputSchema),f.setAttribute(`aria-label`,`JSON input for ${i.name}`);let p=document.createElement(`button`);p.type=`button`,p.className=`run`,p.textContent=`Run`,p.addEventListener(`click`,async()=>{u.classList.remove(`err`);let t=performance.now();try{let r=JSON.parse(f.value||`{}`);if(typeof r!=`object`||!r||Array.isArray(r))throw Error(`The input must be a JSON object, for example {}`);let a=await e.executeTool(i,r);u.textContent=`${i.name} · ${Math.round(performance.now()-t)} ms · returned ${n(a)}`}catch(e){u.classList.add(`err`),u.textContent=`${i.name} · ERROR: ${e instanceof Error?e.message:String(e)}`}}),r.append(a,o,s,f,p),l.append(r)}};e=()=>{d()},e()}export{r as mountDebugPanel};