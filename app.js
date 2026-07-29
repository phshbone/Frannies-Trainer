const problems=["Leash pulling","Door chaos","Jumping on people","Barking","Biting / nipping","Ignoring cues","Dog reactivity","Visitor behavior","Resource guarding","Separation distress"];
const lessons=[
{title:"Calm starts with Mollie",sub:"Observation, timing and a predictable beginning",intro:"This first practice teaches Frannie that quiet behavior makes the session begin. Frannie’s human, Mollie, practices slowing down, watching body language and rewarding recovery.",steps:["Prepare small treats and choose a quiet room before showing the leash.","Stand normally and avoid repeating commands. Watch for four paws down, a softer body, a glance toward Mollie, or a voluntary sit.","Mark the calmer behavior with “yes” and give one treat.","Briefly show the leash. If excitement spikes, lower or hide it and wait for recovery.","Repeat five to eight times, then finish while Frannie is still successful."],tip:"Cesar emphasizes Mollie’s calm state. This exercise turns that theme into observable, rewardable behavior instead of trying to overpower excitement.",minutes:5,videoId:"-zabW8ceZco",videoTitle:"How Do You Tell a Dog You're Calm?",videoNote:"Optional official Cesar Millan demonstration about calmness and the relationship between handler state and dog behavior."},
{title:"The doorway is not a starting pistol",sub:"Pause, leash slack and calm access outdoors",intro:"Frannie learns that surging pauses the trip and calmer behavior makes the next part of the doorway routine happen.",steps:["Clip on the leash several feet from the door.","Approach the door. If Frannie surges, stop without jerking the leash.","Wait for leash slack or a check-in, mark it, and reward.","Touch the doorknob. Reward if she remains composed; step back if she erupts.","Open the door only an inch at first. Close it, reward recovery, and finish after three good repetitions."],tip:"Leadership here means controlling access to the environment and remaining consistent. Pulling does not move the trip forward; calmness does.",minutes:6,videoId:"aHYBkpFRAZM",videoTitle:"Tips To Manage Your Dog's Excitement When Going Outdoors",videoNote:"Optional official video about focus and overexcitement in outdoor environments."},
{title:"Walk without towing Mollie",sub:"Loose-leash practice in an easy location",intro:"The first walking lesson happens indoors, in a hallway, or in a quiet yard before Frannie is expected to succeed around major distractions.",steps:["Reward Frannie beside Mollie before taking the first step.","Take two or three steps and reward while the leash remains loose.","If the leash tightens, stop moving. Do not pull her backward.","When Frannie turns back or creates slack, mark, reward, and continue.","Change direction before she reaches full pulling speed.","End after several short successful passes rather than one long struggle."],tip:"Cesar frequently discusses leash handling and mastering the walk. This version teaches the practical goal through reinforcement and removal of forward movement when the leash tightens.",minutes:7,videoId:"-ECvl8iTp3k",videoTitle:"Quick & Easy Tips To Get Your Dog To Listen To You",videoNote:"Optional official demonstration involving posture, leash handling, attention and pulling."},
{title:"Attention before difficulty",sub:"Check-ins, name response and simple listening",intro:"Frannie practices turning toward her human, Mollie in a quiet setting before the same behavior is requested around distractions.",steps:["Say Frannie’s name once in a quiet room.","When she turns toward Mollie, mark and reward.","Pause, move one or two steps away, and repeat.","Add a small distraction only after she responds reliably.","If she cannot respond, increase distance from the distraction rather than repeating her name louder.","Finish with three easy successes."],tip:"The goal is not constant eye contact. It is a reliable moment of connection that can be reinforced before the environment becomes too difficult.",minutes:5,videoId:"-ECvl8iTp3k",videoTitle:"Quick & Easy Tips To Get Your Dog To Listen To You",videoNote:"This same official video also accompanies attention and handler-position lessons."},
{title:"Visitors without a coup attempt",sub:"Mat training, distance and controlled greetings",intro:"Frannie first learns where to go before any real visitor is used as part of training.",steps:["Choose a mat or bed away from the entrance.","Reward Frannie for stepping onto it, then for staying briefly.","Use a soft knock or low-volume door sound and immediately feed several treats on the mat.","Stop before barking escalates. Lower the sound or increase distance if needed.","During a real visit, use a gate, leash, separate room, or closed door instead of forcing a greeting.","Allow interaction only when both dog and visitor are comfortable."],tip:"Planning the environment is a form of leadership. Preventing rehearsal of doorway chaos is more useful than confronting Frannie after she is already overwhelmed.",warning:"Do not use an unsuspecting visitor as a training test if Frannie lunges, snaps, bites, or cannot recover.",minutes:8,videoId:"aJjF9hVOgkY",videoTitle:"How To Correctly Greet A Dog",videoNote:"Optional official demonstration emphasizing calm greetings and rewarding appropriate behavior."},
{title:"See the trigger, keep the brain",sub:"Distance-based reactivity foundation",intro:"Frannie practices noticing another dog or trigger from far enough away that she can still eat, turn, and respond.",steps:["Begin at a distance where Frannie notices the trigger but is not lunging or barking.","The moment she sees it, mark and feed several treats.","Move farther away if her body stiffens or she stops responding.","Keep the session very short and avoid head-on approaches.","End after a few successful observations, before she becomes exhausted or reactive.","Do not reduce distance until several sessions are consistently calm."],tip:"The written plan prioritizes distance and emotional regulation. The accompanying Cesar video is for observation only; do not copy high-risk handling with a reactive dog.",warning:"For lunging, snapping, biting, redirected aggression, or a dog too strong to control, use management and qualified professional help.",minutes:6,videoId:"XpDuNyyt0ko",videoTitle:"How To Stop Your Dog From Lunging At Other Dogs",videoNote:"Optional official Dog Nation episode. Watch as a visual reference; follow the app’s distance and safety rules for Frannie."}
];
const focusLessonMap={
  "Leash pulling":[1,2],
  "Door chaos":[1,4],
  "Jumping on people":[3,4],
  "Barking":[4,5],
  "Biting / nipping":[0,3,4],
  "Ignoring cues":[0,3],
  "Dog reactivity":[5],
  "Visitor behavior":[4],
  "Resource guarding":[0],
  "Separation distress":[0]
};


const STORAGE_KEY="franniesGoodGirlStableV1";
const STORAGE_VERSION=2;
const $=id=>document.getElementById(id);

function defaultState(){
  return {version:STORAGE_VERSION,profile:null,selected:[],completed:[],logs:[],treatments:[],allergies:[],weights:[],careNotes:[],feeding:null,feedingHistory:[]};
}
function normalizeState(raw){
  const base=defaultState();
  if(!raw||typeof raw!=="object")return base;
  return {
    ...base,
    ...raw,
    version:STORAGE_VERSION,
    profile:raw.profile&&typeof raw.profile==="object"?raw.profile:null,
    selected:Array.isArray(raw.selected)?raw.selected:[],
    completed:Array.isArray(raw.completed)?raw.completed:[],
    logs:Array.isArray(raw.logs)?raw.logs:[],
    treatments:Array.isArray(raw.treatments)?raw.treatments:[],
    allergies:Array.isArray(raw.allergies)?raw.allergies:[],
    weights:Array.isArray(raw.weights)?raw.weights:[],
    careNotes:Array.isArray(raw.careNotes)?raw.careNotes:[],
    feeding:raw.feeding&&typeof raw.feeding==="object"?raw.feeding:null,
    feedingHistory:Array.isArray(raw.feedingHistory)?raw.feedingHistory:[]
  };
}
const Store={
  load(){
    try{return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)||"null"));}
    catch(err){console.error("Could not load saved Frannie data",err);return defaultState();}
  },
  save(data){
    try{
      const normalized=normalizeState(data);
      const serialized=JSON.stringify(normalized);
      localStorage.setItem(STORAGE_KEY,serialized);
      const verified=localStorage.getItem(STORAGE_KEY);
      if(verified!==serialized)throw new Error("Saved data could not be verified");
      return true;
    }catch(err){
      console.error("Could not save Frannie data",err);
      alert("Frannie’s information could not be saved on this device. Check browser storage settings.");
      return false;
    }
  },
  clear(){localStorage.removeItem(STORAGE_KEY);}
};
let state=Store.load();
let current=0,rating="",seconds=300,ticker=null,timelineFilter="all",mainLogFilter="all";
let editing={treatment:null,allergy:null,weight:null,careNote:null};
function persist(){return Store.save(state)}
function uid(){return (crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function todayISO(){const d=new Date();const local=new Date(d.getTime()-d.getTimezoneOffset()*60000);return local.toISOString().slice(0,10)}
function prettyDate(v){if(!v)return"No date";const d=new Date(v+"T12:00:00");return Number.isNaN(d.getTime())?v:d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"})}
function setButtonEdit(buttonId,cancelId,isEditing,addText,editText){$(buttonId).textContent=isEditing?editText:addText;$(cancelId).classList.toggle("hidden",!isEditing)}
function confirmDelete(label){return confirm(`Delete this ${label}? This cannot be undone.`)}
function hasMeaningfulData(value=state){
  return Boolean(
    value.profile || value.feeding ||
    value.selected?.length || value.completed?.length || value.logs?.length ||
    value.treatments?.length || value.allergies?.length || value.weights?.length ||
    value.careNotes?.length || value.feedingHistory?.length
  );
}

function renderProblems(){
  const grid=$("problemGrid");grid.innerHTML="";
  problems.forEach(p=>{const b=document.createElement("button");b.className="problem"+(state.selected.includes(p)?" active":"");b.textContent=p;b.setAttribute("aria-pressed",state.selected.includes(p));b.onclick=()=>{state.selected=state.selected.includes(p)?state.selected.filter(x=>x!==p):[...state.selected,p];persist();renderProblems();renderModules()};grid.appendChild(b)});
  updateFocusSummary();
}
function updateFocusSummary(){const count=state.selected.length;$("focusSummary").textContent=count?"Selected focus: "+state.selected.join(", ")+". Matching lessons will be marked Recommended.":"No focus areas selected yet.";$("buildPlanBtn").disabled=!count}
function buildSelectedPlan(){renderModules();const banner=$("planFocusBanner");banner.classList.toggle("hidden",!state.selected.length);if(state.selected.length)banner.textContent="Frannie’s current focus: "+state.selected.join(", ")+". Start with the first available foundation lesson; matching lessons are marked Recommended.";showScreen("plan")}
function clearFocusAreas(){state.selected=[];persist();renderProblems();renderModules()}

function saveProfile(){state.profile={name:$("dogName").value.trim()||"Frannie",age:$("dogAge").value.trim(),size:$("dogSize").value,goal:$("mainGoal").value.trim()};if(persist()){loadProfile();$("heroStatus").textContent="Profile saved. Good girl operations may begin.";const msg=$("profileSaved");msg.classList.remove("hidden");clearTimeout(window.profileSavedTimer);window.profileSavedTimer=setTimeout(()=>msg.classList.add("hidden"),3200)}}
function loadProfile(){const p=state.profile||{name:"Frannie",age:"",size:"Medium",goal:""};$("dogName").value=p.name||"Frannie";$("dogAge").value=p.age||"";$("dogSize").value=p.size||"Medium";$("mainGoal").value=p.goal||""}
function clearProfile(){if(!confirmDelete("profile"))return;state.profile=null;persist();loadProfile();$("profileSaved").classList.add("hidden");$("heroStatus").textContent="Day 1: good girl status pending"}

function renderModules(){
  const list=$("moduleList");list.innerHTML="";const recommended=new Set();state.selected.forEach(f=>(focusLessonMap[f]||[]).forEach(i=>recommended.add(i)));
  lessons.forEach((l,i)=>{const done=state.completed.includes(i),locked=i>0&&!state.completed.includes(i-1);const d=document.createElement("div");d.className="module "+(done?"done ":"")+(locked?"locked":"");d.innerHTML=`<div class="num">${done?"✓":i+1}</div><div><div class="module-title">${esc(l.title)}</div><div class="module-sub">${esc(l.sub)}</div>${recommended.has(i)?'<span class="recommended">Recommended</span>':""}</div><button ${locked?"disabled":""}>${done?"Review":"Open"}</button>`;d.querySelector("button").onclick=()=>openLesson(i);list.appendChild(d)});updateProgress();
}
function updateProgress(){const n=state.completed.length;$("progressText").textContent=`${n} of ${lessons.length} lessons completed`;$("progressBar").style.width=(n/lessons.length*100)+"%";$("heroStatus").textContent=n===0?"Day 1: good girl status pending":n===lessons.length?"Program complete: certified good girl":"Progress detected: civilization is possible"}
function openLesson(i){current=i;const l=lessons[i];$("lessonTitle").textContent=l.title;$("lessonIntro").textContent=l.intro;$("lessonSteps").innerHTML=l.steps.map(s=>`<li class="step">${esc(s)}</li>`).join("");$("lessonTip").textContent=l.tip;if(l.warning){$("lessonWarning").textContent=l.warning;$("lessonWarning").classList.remove("hidden")}else $("lessonWarning").classList.add("hidden");$("videoTitle").textContent=l.videoTitle;$("videoNote").textContent=l.videoNote;$("videoThumb").src=`https://i.ytimg.com/vi/${l.videoId}/hqdefault.jpg`;seconds=l.minutes*60;renderTimer();rating="";$("sessionNotes").value="";document.querySelectorAll("#ratings button").forEach(b=>b.classList.remove("active"));showScreen("lesson")}
function rate(b,v){rating=v;document.querySelectorAll("#ratings button").forEach(x=>x.classList.remove("active"));b.classList.add("active")}
function completeLesson(){if(!state.completed.includes(current))state.completed.push(current);state.logs.unshift({id:uid(),date:new Date().toLocaleString(),lesson:lessons[current].title,rating:rating||"No rating",notes:$("sessionNotes").value.trim()});persist();renderModules();renderMainLog();showScreen("plan")}
function showScreen(id,btn){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
  document.querySelectorAll(".nav").forEach(n=>n.classList.remove("active"));
  if(btn)btn.classList.add("active");
  else{const map={home:0,plan:1,care:2,log:3,safety:4};if(map[id]!==undefined)document.querySelectorAll(".nav")[map[id]].classList.add("active")}
  const scroller=document.querySelector(".app");
  if(scroller){scroller.scrollTop=0;requestAnimationFrame(()=>{scroller.scrollTop=0})}
}
function renderTimer(){$("timer").textContent=String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0")}
function startTimer(){if(ticker)return;ticker=setInterval(()=>{if(seconds>0){seconds--;renderTimer()}else{pauseTimer();alert("Session complete. Finish with an easy success if possible.")}},1000)}
function pauseTimer(){clearInterval(ticker);ticker=null}
function resetTimer(){pauseTimer();seconds=lessons[current].minutes*60;renderTimer()}
function openVideo(){const l=lessons[current];$("modalTitle").textContent=l.videoTitle;$("youtubeFallback").href=`https://www.youtube.com/watch?v=${l.videoId}`;$("videoFrame").innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${l.videoId}?autoplay=1&rel=0&playsinline=1" title="${esc(l.videoTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;$("videoModal").classList.add("open");document.body.style.overflow="hidden"}
function closeVideo(){$("videoModal").classList.remove("open");$("videoFrame").innerHTML="";document.body.style.overflow=""}
function modalBackdrop(e){if(e.target===$("videoModal"))closeVideo()}
function resetApp(){if(confirm("Erase Frannie’s saved profile, progress and logs?")){Store.clear();location.reload()}}
function dismissSplash(){const splash=$("splashScreen");if(!splash)return;splash.classList.add("hide");splash.setAttribute("aria-hidden","true");sessionStorage.setItem("frannieSplashSeen","1")}
if(sessionStorage.getItem("frannieSplashSeen")==="1"){const splash=$("splashScreen");if(splash){splash.classList.add("hide");splash.setAttribute("aria-hidden","true")}}

function treatmentStatus(x){if(x.type==="Medication"&&!x.due)return["Ongoing","status-ongoing"];if(!x.due)return["Given","status-given"];const d=Math.ceil((new Date(x.due+"T12:00:00")-new Date(todayISO()+"T12:00:00"))/86400000);return d<0?["Overdue","status-overdue"]:d<=30?["Due soon","status-due"]:["Given","status-given"]}
function saveTreatment(){const name=$("treatmentName").value.trim();if(!name){alert("Add a treatment or vaccination name.");return}const item={id:editing.treatment||uid(),type:$("treatmentType").value,name,date:$("treatmentDate").value,due:$("treatmentDue").value,note:$("treatmentNote").value.trim()};if(editing.treatment)state.treatments=state.treatments.map(x=>x.id===editing.treatment?item:x);else state.treatments.unshift(item);persist();cancelTreatmentEdit();renderCare();renderMainLog()}
function editTreatment(id){const x=state.treatments.find(v=>v.id===id);if(!x)return;editing.treatment=id;$("treatmentType").value=x.type;$("treatmentName").value=x.name;$("treatmentDate").value=x.date||"";$("treatmentDue").value=x.due||"";$("treatmentNote").value=x.note||"";setButtonEdit("treatmentSaveBtn","treatmentCancelBtn",true,"Add treatment","Save changes");$("treatmentName").focus()}
function cancelTreatmentEdit(){editing.treatment=null;$("treatmentType").value="Vaccination";$("treatmentName").value="";$("treatmentDate").value=todayISO();$("treatmentDue").value="";$("treatmentNote").value="";setButtonEdit("treatmentSaveBtn","treatmentCancelBtn",false,"Add treatment","Save changes")}
function removeTreatment(id){if(!confirmDelete("treatment"))return;state.treatments=state.treatments.filter(x=>x.id!==id);if(editing.treatment===id)cancelTreatmentEdit();persist();renderCare();renderMainLog()}

function saveFeeding(){const feeding={brand:$("foodBrand").value.trim(),amount:$("foodAmount").value.trim(),schedule:$("foodSchedule").value.trim(),note:$("foodNote").value.trim(),updatedAt:todayISO()};if(![feeding.brand,feeding.amount,feeding.schedule,feeding.note].some(Boolean)){alert("Add feeding information before saving.");return}state.feeding=feeding;state.feedingHistory.unshift({id:uid(),date:todayISO(),...feeding});persist();renderFeeding();renderMainLog()}
function clearFeeding(){if(!state.feeding)return;if(!confirmDelete("feeding record"))return;state.feeding=null;persist();renderFeeding();renderMainLog()}
function renderFeeding(){const x=state.feeding||{};$("foodBrand").value=x.brand||"";$("foodAmount").value=x.amount||"";$("foodSchedule").value=x.schedule||"";$("foodNote").value=x.note||"";const has=Object.values(x).some(Boolean);$("feedingSaved").classList.toggle("hidden",!has);if(has)$("feedingSaved").textContent=`Current routine: ${x.brand||"Food not named"}${x.amount?" · "+x.amount:""}${x.schedule?" · "+x.schedule:""}`}

function saveAllergy(){const text=$("allergyText").value.trim();if(!text){alert("Add an allergy or caution.");return}const item={id:editing.allergy||uid(),date:editing.allergy?(state.allergies.find(x=>x.id===editing.allergy)?.date||todayISO()):todayISO(),text};if(editing.allergy)state.allergies=state.allergies.map(x=>x.id===editing.allergy?item:x);else state.allergies.unshift(item);persist();cancelAllergyEdit();renderCare();renderMainLog()}
function editAllergy(id){const x=state.allergies.find(v=>v.id===id);if(!x)return;editing.allergy=id;$("allergyText").value=x.text;setButtonEdit("allergySaveBtn","allergyCancelBtn",true,"Add caution","Save changes");$("allergyText").focus()}
function cancelAllergyEdit(){editing.allergy=null;$("allergyText").value="";setButtonEdit("allergySaveBtn","allergyCancelBtn",false,"Add caution","Save changes")}
function removeAllergy(id){if(!confirmDelete("allergy or caution"))return;state.allergies=state.allergies.filter(x=>x.id!==id);if(editing.allergy===id)cancelAllergyEdit();persist();renderCare();renderMainLog()}

function saveWeight(){const value=$("weightValue").value.trim();if(!value){alert("Add Frannie’s weight.");return}const item={id:editing.weight||uid(),date:$("weightDate").value||todayISO(),value,note:$("weightNote").value.trim()};if(editing.weight)state.weights=state.weights.map(x=>x.id===editing.weight?item:x);else state.weights.unshift(item);persist();cancelWeightEdit();renderCare();renderMainLog()}
function editWeight(id){const x=state.weights.find(v=>v.id===id);if(!x)return;editing.weight=id;$("weightDate").value=x.date||todayISO();$("weightValue").value=x.value;$("weightNote").value=x.note||"";setButtonEdit("weightSaveBtn","weightCancelBtn",true,"Add weight","Save changes");$("weightValue").focus()}
function cancelWeightEdit(){editing.weight=null;$("weightDate").value=todayISO();$("weightValue").value="";$("weightNote").value="";setButtonEdit("weightSaveBtn","weightCancelBtn",false,"Add weight","Save changes")}
function removeWeight(id){if(!confirmDelete("weight entry"))return;state.weights=state.weights.filter(x=>x.id!==id);if(editing.weight===id)cancelWeightEdit();persist();renderCare();renderMainLog()}

function saveCareNote(){const title=$("careNoteTitle").value.trim(),note=$("careNoteText").value.trim();if(!title&&!note){alert("Add a title or note.");return}const item={id:editing.careNote||uid(),date:$("careNoteDate").value||todayISO(),title:title||"Care note",note};if(editing.careNote)state.careNotes=state.careNotes.map(x=>x.id===editing.careNote?item:x);else state.careNotes.unshift(item);persist();cancelCareNoteEdit();renderCare();renderMainLog()}
function editCareNote(id){const x=state.careNotes.find(v=>v.id===id);if(!x)return;editing.careNote=id;$("careNoteDate").value=x.date||todayISO();$("careNoteTitle").value=x.title;$("careNoteText").value=x.note||"";setButtonEdit("careNoteSaveBtn","careNoteCancelBtn",true,"Add to timeline","Save changes");$("careNoteTitle").focus()}
function cancelCareNoteEdit(){editing.careNote=null;$("careNoteDate").value=todayISO();$("careNoteTitle").value="";$("careNoteText").value="";setButtonEdit("careNoteSaveBtn","careNoteCancelBtn",false,"Add to timeline","Save changes")}
function removeCareNote(id){if(!confirmDelete("care note"))return;state.careNotes=state.careNotes.filter(x=>x.id!==id);if(editing.careNote===id)cancelCareNoteEdit();persist();renderCare();renderMainLog()}

function renderTreatments(){$("treatmentList").innerHTML=state.treatments.length?state.treatments.map(x=>{const s=treatmentStatus(x);return`<div class="entry"><div class="entry-top"><div><strong>${esc(x.name)}</strong><small>${esc(x.type)}${x.date?" · Given "+prettyDate(x.date):""}${x.due?" · Next "+prettyDate(x.due):""}</small>${x.note?`<small>${esc(x.note)}</small>`:""}</div><div><span class="status-tag ${s[1]}">${s[0]}</span><br><button class="remove-btn" onclick="editTreatment('${x.id}')">Edit</button> <button class="remove-btn" onclick="removeTreatment('${x.id}')">Delete</button></div></div></div>`}).join(""):"<p>No treatments or vaccinations added yet.</p>"}
function renderAllergies(){$("allergyList").innerHTML=state.allergies.length?state.allergies.map(x=>`<div class="entry"><div class="entry-top"><strong>${esc(x.text)}</strong><div><button class="remove-btn" onclick="editAllergy('${x.id}')">Edit</button> <button class="remove-btn" onclick="removeAllergy('${x.id}')">Delete</button></div></div></div>`).join(""):"<p>No allergies or cautions added yet.</p>"}
function renderWeights(){$("weightList").innerHTML=state.weights.length?state.weights.map(x=>`<div class="entry"><div class="entry-top"><div><strong>${esc(x.value)}</strong><small>${prettyDate(x.date)}${x.note?" · "+esc(x.note):""}</small></div><div><button class="remove-btn" onclick="editWeight('${x.id}')">Edit</button> <button class="remove-btn" onclick="removeWeight('${x.id}')">Delete</button></div></div></div>`).join(""):"<p>No weight entries yet.</p>"}
function timelineItems(){const a=[];state.logs.forEach(x=>a.push({type:"training",dateRaw:new Date(x.date).getTime()||0,date:x.date,title:x.lesson,detail:x.rating+(x.notes?" · "+x.notes:"")}));state.treatments.forEach(x=>a.push({type:"treatment",dateRaw:new Date((x.date||"1970-01-01")+"T12:00:00").getTime(),date:prettyDate(x.date),title:x.name,detail:x.type+(x.note?" · "+x.note:"")}));state.weights.forEach(x=>a.push({type:"weight",dateRaw:new Date((x.date||"1970-01-01")+"T12:00:00").getTime(),date:prettyDate(x.date),title:"Weight: "+x.value,detail:x.note||""}));state.careNotes.forEach(x=>a.push({type:"note",dateRaw:new Date((x.date||"1970-01-01")+"T12:00:00").getTime(),date:prettyDate(x.date),title:x.title,detail:x.note||"",id:x.id}));return a.sort((x,y)=>y.dateRaw-x.dateRaw)}
function renderTimeline(){const a=timelineItems().filter(x=>timelineFilter==="all"||x.type===timelineFilter);$("timelineList").innerHTML=a.length?a.map(x=>`<div class="timeline-item"><div class="timeline-type">${esc(x.type)}</div><strong>${esc(x.title)}</strong><div class="timeline-date">${esc(x.date||"No date")}</div>${x.detail?`<small>${esc(x.detail)}</small>`:""}${x.type==="note"?`<div style="margin-top:7px"><button class="remove-btn" onclick="editCareNote('${x.id}')">Edit</button> <button class="remove-btn" onclick="removeCareNote('${x.id}')">Delete</button></div>`:""}</div>`).join(""):"<p>No timeline entries yet.</p>"}
function setTimelineFilter(t,b){timelineFilter=t;document.querySelectorAll(".timeline-filter button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTimeline()}
function renderCare(){renderTreatments();renderFeeding();renderAllergies();renderWeights();renderTimeline()}

function addQuickLogNote(){const title=$("quickLogTitle").value.trim(),note=$("quickLogText").value.trim();if(!title&&!note){alert("Add a title or note.");return}state.careNotes.unshift({id:uid(),date:$("quickLogDate").value||todayISO(),title:title||"General log note",note});$("quickLogTitle").value="";$("quickLogText").value="";$("quickLogDate").value=todayISO();persist();renderCare();renderMainLog();const msg=$("quickLogSaved");msg.classList.remove("hidden");setTimeout(()=>msg.classList.add("hidden"),2600)}
function allFrannieEntries(){const e=[];state.logs.forEach(x=>e.push({type:"training",dateRaw:new Date(x.date).getTime()||0,date:x.date,title:x.lesson,detail:x.rating+(x.notes?" · "+x.notes:"")}));state.treatments.forEach(x=>e.push({type:"treatment",dateRaw:new Date((x.date||"1970-01-01")+"T12:00:00").getTime(),date:prettyDate(x.date),title:x.name,detail:x.type+(x.due?" · Next due "+prettyDate(x.due):"")+(x.note?" · "+x.note:"")}));state.weights.forEach(x=>e.push({type:"weight",dateRaw:new Date((x.date||"1970-01-01")+"T12:00:00").getTime(),date:prettyDate(x.date),title:"Weight: "+x.value,detail:x.note||""}));state.feedingHistory.forEach(x=>e.push({type:"feeding",dateRaw:new Date((x.date||"1970-01-01")+"T12:00:00").getTime(),date:prettyDate(x.date),title:"Feeding information updated",detail:[x.brand,x.amount,x.schedule,x.note].filter(Boolean).join(" · ")}));state.allergies.forEach(x=>e.push({type:"allergy",dateRaw:new Date((x.date||todayISO())+"T12:00:00").getTime(),date:prettyDate(x.date||todayISO()),title:"Allergy or caution",detail:x.text}));state.careNotes.forEach(x=>e.push({type:"note",dateRaw:new Date((x.date||"1970-01-01")+"T12:00:00").getTime(),date:prettyDate(x.date),title:x.title,detail:x.note||""}));return e.sort((a,b)=>b.dateRaw-a.dateRaw)}
function renderMainLog(){const el=$("mainLogList");if(!el)return;const entries=allFrannieEntries().filter(x=>mainLogFilter==="all"||x.type===mainLogFilter);el.innerHTML=entries.length?entries.map(x=>`<div class="timeline-item"><div class="timeline-type">${esc(x.type)}</div><strong>${esc(x.title)}</strong><div class="timeline-date">${esc(x.date||"No date")}</div>${x.detail?`<small>${esc(x.detail)}</small>`:""}</div>`).join(""):"<p>No entries in this category yet.</p>"}
function setMainLogFilter(type,btn){mainLogFilter=type;document.querySelectorAll("#mainLogFilters button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderMainLog()}

function downloadBackup(){
  persist();
  const payload={appId:"frannies-a-good-girl",app:"Frannie’s a Good Girl",schemaVersion:STORAGE_VERSION,exportedAt:new Date().toISOString(),data:normalizeState(state)};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="frannie-good-girl-backup-"+todayISO()+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)
}
async function restoreBackup(event){
  const input=event.target;const file=input.files&&input.files[0];if(!file)return;
  try{
    let text=await file.text();text=text.replace(/^\uFEFF/,"").trim();
    if(!text)throw new Error("The selected file is empty.");
    const parsed=JSON.parse(text);
    if(!parsed||typeof parsed!=="object")throw new Error("The selected file does not contain backup data.");
    const candidate=parsed.data&&typeof parsed.data==="object"?parsed.data:parsed;
    const knownBackup=parsed.appId==="frannies-a-good-girl"||parsed.app==="Frannie’s a Good Girl"||["profile","selected","completed","logs","treatments","allergies","weights","careNotes","feeding","feedingHistory"].some(k=>Object.prototype.hasOwnProperty.call(candidate,k));
    if(!knownBackup)throw new Error("This JSON file was not created by Frannie’s a Good Girl.");
    const restored=normalizeState(candidate);
    if(!hasMeaningfulData(restored))throw new Error("The backup does not contain any Frannie information.");
    if(hasMeaningfulData()&&!confirm("Replace the Frannie information currently saved on this device with this backup?"))return;
    state=restored;if(!persist())throw new Error("The restored information could not be saved.");
    cancelTreatmentEdit();cancelAllergyEdit();cancelWeightEdit();cancelCareNoteEdit();initializeUI();showScreen("home");alert("Frannie’s backup has been restored.")
  }catch(err){console.error("Restore failed",err);alert(err&&err.message?err.message:"That file could not be restored. Choose a Frannie backup JSON file.")}
  finally{input.value=""}
}
function buildFrannieLogText(){
  const profile=state.profile||{};
  const entries=allFrannieEntries();
  const header=[
    "Frannie Log",
    `Frannie and her human, Mollie${profile.age?" · Age "+profile.age:""}${profile.size?" · "+profile.size:""}`
  ];
  const lines=entries.length
    ? entries.map(x=>`${String(x.type).toUpperCase()}\n${x.title}\n${x.date||"No date"}${x.detail?`\n${x.detail}`:""}`)
    : ["No entries yet."];
  return [...header, "", ...lines].join("\n\n");
}
async function shareFrannieLog(){
  const text=buildFrannieLogText();
  if(navigator.share){
    try{
      await navigator.share({title:"Frannie Log",text});
      return;
    }catch(err){
      if(err&&err.name==="AbortError")return;
      console.warn("Share failed",err);
    }
  }
  alert("This device does not support the share sheet here, so the app will open the phone-style PDF instead.");
  printFrannieLog("phone");
}
function printFrannieLog(mode="phone"){
  const entries=allFrannieEntries(),profile=state.profile||{};
  const rows=entries.length?entries.map(x=>`<article><div class="type">${esc(x.type)}</div><h3>${esc(x.title)}</h3><div class="date">${esc(x.date||"No date")}</div>${x.detail?`<p>${esc(x.detail)}</p>`:""}</article>`).join(""):"<p>No entries yet.</p>";
  $("printReport").innerHTML=`<section class="print-card"><h1>Frannie Log</h1><p class="print-profile">Frannie and her human, Mollie${profile.age?" · Age "+esc(profile.age):""}${profile.size?" · "+esc(profile.size):""}</p>${rows}</section>`;
  document.documentElement.dataset.printMode=mode;
  const cleanup=()=>{delete document.documentElement.dataset.printMode;window.removeEventListener("afterprint",cleanup)};window.addEventListener("afterprint",cleanup);setTimeout(()=>window.print(),100)
}
function initializeUI(){loadProfile();renderProblems();renderModules();renderCare();renderMainLog();if(!$("treatmentDate").value)$("treatmentDate").value=todayISO();if(!$("weightDate").value)$("weightDate").value=todayISO();if(!$("careNoteDate").value)$("careNoteDate").value=todayISO();if(!$("quickLogDate").value)$("quickLogDate").value=todayISO()}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeVideo()});
window.addEventListener("pageshow",()=>{state=Store.load();initializeUI()});
window.addEventListener("pagehide",()=>{persist()});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")persist()});
window.addEventListener("storage",e=>{if(e.key===STORAGE_KEY){state=Store.load();initializeUI()}});
initializeUI();

// Cache the app shell for installed-PWA/offline use.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}
