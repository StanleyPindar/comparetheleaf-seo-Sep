import{s as o}from"./index-BVrTOPYR.js";let s=null,c=0;const d=5*60*1e3,l=async()=>{try{const t=Date.now();if(s&&t-c<d)return s;const{data:n,error:a}=await o.from("articles").select("*").eq("published",!0).order("created_at",{ascending:!1});if(a)return console.error("Error fetching articles from Supabase:",a),r();if(!n||n.length===0)return console.warn("No published articles found in Supabase"),r();const e=n.map(i=>({id:i.id,slug:i.slug,title:i.title,date:i.created_at||i.updated_at||new Date().toISOString(),excerpt:i.excerpt||"",section:i.category||"Articles",category:i.category||"Education",content:i.content||"",author:i.author||"CompareTheLeaf Team",published:i.published,meta_title:i.meta_title,meta_description:i.meta_description,tags:Array.isArray(i.tags)?i.tags:[],view_count:i.view_count||0,created_at:i.created_at,updated_at:i.updated_at}));return s=e,c=t,e}catch(t){return console.error("Error loading articles:",t),r()}},m=async t=>{try{const a=(await l()).find(p=>p.slug===t);if(a)return a;const{data:e,error:i}=await o.from("articles").select("*").eq("slug",t).eq("published",!0).maybeSingle();return i?(console.error("Error fetching article by slug:",i),null):e?{id:e.id,slug:e.slug,title:e.title,date:e.created_at||e.updated_at||new Date().toISOString(),excerpt:e.excerpt||"",section:e.category||"Articles",category:e.category||"Education",content:e.content||"",author:e.author||"CompareTheLeaf Team",published:e.published,meta_title:e.meta_title,meta_description:e.meta_description,tags:Array.isArray(e.tags)?e.tags:[],view_count:e.view_count||0,created_at:e.created_at,updated_at:e.updated_at}:null}catch(n){return console.error("Error fetching article by slug:",n),null}},g=async t=>(await l()).filter(a=>a.section===t||a.category===t),y=async t=>{try{const{error:n}=await o.from("articles").update({view_count:o.sql`view_count + 1`,updated_at:new Date().toISOString()}).eq("id",t);n&&console.error("Error incrementing view count:",n)}catch(n){console.error("Error incrementing view count:",n)}},r=()=>[{slug:"how-to-choose-clinic",title:"How to Choose the Right Medical Cannabis Clinic in the UK",date:"2024-01-15",excerpt:"A comprehensive guide to selecting the perfect medical cannabis clinic for your specific needs, covering key factors like specialist expertise, pricing, and patient reviews.",section:"Guides",category:"Guides",content:`
        <h2>Introduction</h2>
        <p>Choosing the right medical cannabis clinic is a crucial decision that can significantly impact your treatment outcomes and overall experience. With over 20 licensed clinics operating across the UK, each offering different specialties, pricing structures, and approaches to care, making an informed choice requires careful consideration of multiple factors.</p>

        <h2>Key Factors to Consider</h2>
        
        <h3>1. Specialist Expertise</h3>
        <p>The most important factor when choosing a clinic is ensuring they have specialists who understand your specific condition. Look for:</p>
        <ul>
          <li>Doctors with relevant specialty training (e.g., pain medicine, neurology, psychiatry)</li>
          <li>Experience treating your specific condition with medical cannabis</li>
          <li>GMC registration and specialist register listing</li>
          <li>Published research or expertise in cannabis medicine</li>
        </ul>

        <h3>2. Treatment Approach</h3>
        <p>Different clinics have varying approaches to medical cannabis treatment:</p>
        <ul>
          <li><strong>Holistic approach:</strong> Considers lifestyle, diet, and complementary therapies</li>
          <li><strong>Medical model:</strong> Focuses primarily on symptom management and medication</li>
          <li><strong>Integrative care:</strong> Combines cannabis with other treatments and therapies</li>
        </ul>

        <h3>3. Product Range and Quality</h3>
        <p>Consider the range and quality of products available:</p>
        <ul>
          <li>Variety of strains and formulations</li>
          <li>Quality standards and testing protocols</li>
          <li>Availability of different delivery methods (oils, flowers, capsules)</li>
          <li>Consistent supply and stock availability</li>
        </ul>

        <h3>4. Pricing and Value</h3>
        <p>Medical cannabis treatment costs can vary significantly between clinics:</p>
        <ul>
          <li>Initial consultation fees (£50-£300)</li>
          <li>Follow-up appointment costs</li>
          <li>Prescription and dispensing fees</li>
          <li>Medication costs and delivery charges</li>
          <li>Annual membership or subscription fees</li>
        </ul>

        <h3>5. Accessibility and Convenience</h3>
        <p>Consider practical factors that affect your ongoing care:</p>
        <ul>
          <li>Location and travel requirements</li>
          <li>Telemedicine options for remote consultations</li>
          <li>Appointment availability and scheduling flexibility</li>
          <li>Prescription delivery options</li>
          <li>Patient support and communication channels</li>
        </ul>

        <h2>Red Flags to Avoid</h2>
        <p>Be cautious of clinics that:</p>
        <ul>
          <li>Make unrealistic promises about treatment outcomes</li>
          <li>Pressure you to commit to expensive long-term packages</li>
          <li>Lack proper licensing or regulatory compliance</li>
          <li>Have consistently poor patient reviews</li>
          <li>Don't provide clear pricing information upfront</li>
          <li>Rush through consultations without thorough assessment</li>
        </ul>

        <h2>Questions to Ask During Consultation</h2>
        <p>Prepare these questions for your initial consultation:</p>
        <ul>
          <li>What is your experience treating my specific condition?</li>
          <li>What products do you recommend and why?</li>
          <li>What are the potential side effects and how will you monitor them?</li>
          <li>How often will I need follow-up appointments?</li>
          <li>What support is available between appointments?</li>
          <li>What happens if the initial treatment doesn't work?</li>
          <li>Can you provide references or patient testimonials?</li>
        </ul>

        <h2>Making Your Decision</h2>
        <p>After researching and consulting with potential clinics:</p>
        <ul>
          <li>Compare all factors, not just price</li>
          <li>Trust your instincts about the doctor-patient relationship</li>
          <li>Consider starting with a clinic that offers good value and support</li>
          <li>Remember that you can change clinics if needed</li>
          <li>Ensure you feel comfortable and confident with your choice</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Choosing the right medical cannabis clinic requires balancing multiple factors including specialist expertise, treatment approach, cost, and convenience. Take time to research your options, ask the right questions, and select a clinic that aligns with your specific needs and circumstances. Remember that the cheapest option isn't always the best value, and the most expensive doesn't guarantee the best care.</p>
      `,author:"CompareTheLeaf Medical Team",published:!0},{slug:"medical-cannabis-faq",title:"Medical Cannabis FAQ - Common Questions Answered",date:"2024-01-10",excerpt:"Answers to the most frequently asked questions about medical cannabis treatment in the UK, covering legality, costs, conditions, and the prescription process.",section:"FAQs",category:"FAQs",content:`
        <h2>Frequently Asked Questions</h2>
        
        <h3>Is medical cannabis legal in the UK?</h3>
        <p>Yes, medical cannabis has been legal in the UK since November 2018. However, it can only be prescribed by specialist doctors on the General Medical Council's Specialist Register for specific medical conditions when conventional treatments have not provided adequate relief.</p>

        <h3>How much does medical cannabis treatment cost?</h3>
        <p>Costs vary by clinic and treatment plan. Typically, initial consultations range from £50-£300, follow-ups £50-£150, and monthly medication costs £150-£400. Medical cannabis is not currently available on the NHS except in very limited circumstances.</p>

        <h3>What conditions can be treated with medical cannabis?</h3>
        <p>Medical cannabis is commonly prescribed for chronic pain, epilepsy, multiple sclerosis spasticity, nausea from chemotherapy, anxiety, PTSD, and other conditions where conventional treatments have been inadequate.</p>

        <h3>How do I get a medical cannabis prescription?</h3>
        <p>You need to consult with a specialist doctor who can assess your condition and medical history. The process typically involves an initial consultation, medical assessment, and if appropriate, a prescription with ongoing monitoring.</p>

        <h3>Can I drive while using medical cannabis?</h3>
        <p>Driving under the influence of cannabis is illegal, even with a prescription. However, if you have a valid prescription and are not impaired, you may have a legal defense. Always consult with your doctor about driving safety.</p>
      `,author:"CompareTheLeaf Medical Team",published:!0}];export{m as a,g as b,l as g,y as i};
